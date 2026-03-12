const portfolioData = window.portfolioData || {};

const header = document.querySelector(".site-header");
const progressBar = document.querySelector(".progress-bar");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = siteNav ? [...siteNav.querySelectorAll('a[href^="#"]')] : [];
const revealItems = document.querySelectorAll("[data-reveal]");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const submitButton = contactForm ? contactForm.querySelector(".submit-button") : null;
const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const expandCards = [...document.querySelectorAll("[data-expand-card]")];

const bindFields = () => {
  document.querySelectorAll("[data-field]").forEach((node) => {
    const key = node.dataset.field;
    const value = portfolioData[key];

    if (typeof value === "string" && value.trim()) {
      node.textContent = value;
    }
  });
};

const resolveLink = (key) => {
  switch (key) {
    case "linkedin":
      return portfolioData.linkedin || "";
    case "github":
      return portfolioData.github || "";
    case "cv":
      return portfolioData.cv || "";
    case "whatsapp":
      return portfolioData.whatsapp ? `https://wa.me/${portfolioData.whatsapp}` : "";
    case "email":
      return portfolioData.email ? `mailto:${portfolioData.email}` : "";
    default:
      return portfolioData[key] || "";
  }
};

const bindLinks = () => {
  document.querySelectorAll("[data-link]").forEach((node) => {
    const key = node.dataset.link;
    const href = resolveLink(key);

    if (!href) {
      node.removeAttribute("href");
      node.setAttribute("aria-disabled", "true");
      node.classList.add("is-disabled");
      return;
    }

    node.setAttribute("href", href);
  });
};

const setFormStatus = (message, tone = "") => {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.classList.remove("is-error", "is-success", "is-loading");

  if (tone) {
    formStatus.classList.add(`is-${tone}`);
  }
};

const setFormPending = (isPending) => {
  if (!submitButton) {
    return;
  }

  submitButton.disabled = isPending;
  submitButton.textContent = isPending ? "Enviando..." : "Enviar consulta";
};

const getContactFormEndpoint = () => {
  return String(portfolioData.contactFormEndpoint || "").trim();
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

const updateActiveNav = (scrollTop) => {
  if (!navLinks.length || !trackedSections.length) {
    return;
  }

  let currentId = trackedSections[0].id;
  const offset = scrollTop + 180;

  trackedSections.forEach((section) => {
    if (offset >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const updateScrollUi = () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;

  if (header) {
    header.classList.toggle("is-scrolled", scrollTop > 24);
  }

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  updateActiveNav(scrollTop);
};

const setupNavigation = () => {
  if (!navToggle || !siteNav) {
    return;
  }

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open", !expanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
};

const setupContactForm = () => {
  if (!contactForm || !formStatus) {
    return;
  }

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    formData.append("source", window.location.href);

    const endpoint = getContactFormEndpoint();

    if (endpoint) {
      try {
        setFormPending(true);
        setFormStatus("Enviando consulta...", "loading");

        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          let errorMessage =
            "No pude enviar el formulario en este momento. Intenta de nuevo en un rato o escríbeme por WhatsApp.";

          try {
            const responseData = await response.json();

            if (Array.isArray(responseData.errors) && responseData.errors.length) {
              errorMessage = responseData.errors
                .map((entry) => entry.message)
                .filter(Boolean)
                .join(" ");
            }
          } catch {
            // If the response body is not JSON, keep the default message.
          }

          setFormStatus(errorMessage, "error");
          return;
        }

        contactForm.reset();
        setFormStatus("Gracias. Tu mensaje ya fue enviado y te responderé pronto.", "success");
        return;
      } catch {
        setFormStatus(
          "No pude conectar el formulario. Intenta de nuevo en un rato o escríbeme por WhatsApp.",
          "error"
        );
        return;
      } finally {
        setFormPending(false);
      }
    }

    const email = (portfolioData.email || "").trim();

    if (!email) {
      setFormStatus(
        "Por ahora puedes escribirme por WhatsApp o LinkedIn mientras termino de conectar el correo directo.";
      );
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const senderEmail = String(formData.get("email") || "").trim();
    const project = String(formData.get("project") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Consulta desde el portafolio: ${project}`);
    const body = encodeURIComponent(
      [
        `Nombre: ${name}`,
        `Correo: ${senderEmail}`,
        `Proyecto: ${project}`,
        "",
        "Mensaje:",
        message
      ].join("\n")
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setFormStatus("Se abrio tu cliente de correo con el mensaje listo para enviar.", "success");
    contactForm.reset();
  });
};

const setupExpandCards = () => {
  if (!expandCards.length) {
    return;
  }

  const openCard = (activeCard) => {
    expandCards.forEach((card) => {
      const isActive = card === activeCard;
      card.classList.toggle("is-open", isActive);
      card.setAttribute("aria-expanded", String(isActive));
    });
  };

  expandCards.forEach((card, index) => {
    if (index === 0) {
      openCard(card);
    }

    card.addEventListener("mouseenter", () => openCard(card));
    card.addEventListener("focus", () => openCard(card));
    card.addEventListener("click", () => openCard(card));
  });
};

bindFields();
bindLinks();
revealItems.forEach((item) => revealObserver.observe(item));
setupNavigation();
setupContactForm();
setupExpandCards();
updateScrollUi();

window.addEventListener("scroll", updateScrollUi, { passive: true });
