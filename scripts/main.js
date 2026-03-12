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
const aboutCarousels = [...document.querySelectorAll("[data-about-carousel]")];
const processFlows = [...document.querySelectorAll("[data-process-flow]")];
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
  if (!contactForm) {
    return;
  }

  contactForm.classList.toggle("is-pending", isPending);

  contactForm.querySelectorAll("input, select, textarea, button").forEach((control) => {
    control.disabled = isPending;
  });

  if (submitButton) {
    submitButton.textContent = isPending ? "Enviando..." : "Enviar mensaje";
  }
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

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phonePattern = /^\+?[0-9\s().-]{7,20}$/;
  const touchedFields = new Set();
  const fields = {
    name: {
      control: contactForm.elements.namedItem("name"),
      wrapper: contactForm.querySelector('[data-form-field="name"]'),
      errorNode: contactForm.querySelector("#contact-error-name"),
      validate(value) {
        if (!value || value.length < 2) {
          return "Por favor escribe tu nombre.";
        }

        return "";
      }
    },
    email: {
      control: contactForm.elements.namedItem("email"),
      wrapper: contactForm.querySelector('[data-form-field="email"]'),
      errorNode: contactForm.querySelector("#contact-error-email"),
      validate(value) {
        if (!value) {
          return "Por favor escribe tu correo.";
        }

        if (!emailPattern.test(value)) {
          return "Escribe un correo v\u00e1lido.";
        }

        return "";
      }
    },
    phone: {
      control: contactForm.elements.namedItem("phone"),
      wrapper: contactForm.querySelector('[data-form-field="phone"]'),
      errorNode: contactForm.querySelector("#contact-error-phone"),
      validate(value) {
        if (!value) {
          return "";
        }

        const digits = value.replace(/\D/g, "");

        if (!phonePattern.test(value) || digits.length < 7) {
          return "Revisa este n\u00famero de contacto.";
        }

        return "";
      }
    },
    project: {
      control: contactForm.elements.namedItem("project"),
      wrapper: contactForm.querySelector('[data-form-field="project"]'),
      errorNode: contactForm.querySelector("#contact-error-project"),
      validate(value) {
        if (!value) {
          return "Selecciona el tipo de proyecto.";
        }

        return "";
      }
    },
    message: {
      control: contactForm.elements.namedItem("message"),
      wrapper: contactForm.querySelector('[data-form-field="message"]'),
      errorNode: contactForm.querySelector("#contact-error-message"),
      validate(value) {
        if (!value || value.length < 20) {
          return "Cu\u00e9ntame un poco m\u00e1s sobre lo que necesitas.";
        }

        return "";
      }
    }
  };

  const getFieldValue = (key) => String(fields[key].control?.value || "").trim();

  const setFieldState = (key, error = "", showError = touchedFields.has(key)) => {
    const field = fields[key];

    if (!field || !field.control || !field.wrapper || !field.errorNode) {
      return;
    }

    const value = getFieldValue(key);
    const isFilled = value.length > 0;
    const showValid = !error && isFilled && touchedFields.has(key);

    field.wrapper.classList.toggle("is-error", Boolean(error) && showError);
    field.wrapper.classList.toggle("is-valid", showValid);
    field.control.setAttribute("aria-invalid", String(Boolean(error) && showError));
    field.errorNode.textContent = showError ? error : "";
  };

  const validateField = (key, showError = touchedFields.has(key)) => {
    const field = fields[key];

    if (!field || typeof field.validate !== "function") {
      return true;
    }

    const error = field.validate(getFieldValue(key));
    setFieldState(key, error, showError);
    return !error;
  };

  const clearFieldStates = () => {
    Object.keys(fields).forEach((key) => {
      setFieldState(key, "", false);
    });
  };

  const focusFirstInvalidField = () => {
    const invalidKey = Object.keys(fields).find((key) => !validateField(key, true));

    if (invalidKey && fields[invalidKey].control) {
      fields[invalidKey].control.focus();
    }
  };

  Object.entries(fields).forEach(([key, field]) => {
    if (!field.control) {
      return;
    }

    const clearStatusIfNeeded = () => {
      if (formStatus.textContent && !contactForm.classList.contains("is-pending")) {
        setFormStatus("");
      }
    };

    field.control.addEventListener("blur", () => {
      touchedFields.add(key);
      validateField(key, true);
    });

    field.control.addEventListener("input", () => {
      clearStatusIfNeeded();

      if (touchedFields.has(key)) {
        validateField(key, true);
      }
    });

    field.control.addEventListener("change", () => {
      clearStatusIfNeeded();

      if (touchedFields.has(key) || field.control.tagName === "SELECT") {
        touchedFields.add(key);
        validateField(key, true);
      }
    });
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    Object.keys(fields).forEach((key) => touchedFields.add(key));

    const isFormValid = Object.keys(fields).every((key) => validateField(key, true));

    if (!isFormValid) {
      setFormStatus("Revisa los campos marcados y vuelve a intentarlo.", "error");
      focusFirstInvalidField();
      return;
    }

    const formData = new FormData(contactForm);
    formData.append("source", window.location.href);

    const endpoint = getContactFormEndpoint();

    if (endpoint) {
      try {
        setFormPending(true);
        setFormStatus("Enviando...", "loading");

        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          let errorMessage =
            "No pude enviar el mensaje en este momento. Intenta de nuevo en un rato o escr\u00edbeme por WhatsApp.";

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
        touchedFields.clear();
        clearFieldStates();
        setFormStatus("Gracias por escribirme. Te responder\u00e9 pronto.", "success");
        return;
      } catch {
        setFormStatus(
          "No pude conectar el formulario. Intenta de nuevo en un rato o escr\u00edbeme por WhatsApp.",
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
        "Por ahora puedes escribirme por WhatsApp o LinkedIn mientras termino de conectar el correo directo.",
        "error"
      );
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const senderEmail = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const project = String(formData.get("project") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Consulta desde el portafolio: ${project}`);
    const body = encodeURIComponent(
      [
        `Nombre: ${name}`,
        `Correo: ${senderEmail}`,
        `Tel\u00e9fono: ${phone}`,
        `Proyecto: ${project}`,
        "",
        "Mensaje:",
        message
      ].join("\n")
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    contactForm.reset();
    touchedFields.clear();
    clearFieldStates();
    setFormStatus("Se abri\u00f3 tu cliente de correo con el mensaje listo para enviar.", "success");
  });

  clearFieldStates();
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

const setupAboutCarousels = () => {
  if (!aboutCarousels.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  aboutCarousels.forEach((carousel) => {
    const viewport = carousel.querySelector(".about-carousel-viewport");
    const track = carousel.querySelector(".about-track");
    const slides = [...carousel.querySelectorAll("[data-about-slide]")];
    const dots = [...carousel.querySelectorAll("[data-about-dot]")];

    if (!viewport || !track || slides.length < 2) {
      return;
    }

    let activeIndex = 0;
    let timerId = 0;
    let isInteracting = false;

    const syncCarousel = () => {
      const offset = viewport.clientWidth * activeIndex;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
      });
    };

    const setSlide = (nextIndex) => {
      activeIndex = (nextIndex + slides.length) % slides.length;
      syncCarousel();
    };

    const stopAutoplay = () => {
      if (!timerId) {
        return;
      }

      window.clearInterval(timerId);
      timerId = 0;
    };

    const startAutoplay = () => {
      if (prefersReducedMotion.matches || isInteracting) {
        return;
      }

      stopAutoplay();
      timerId = window.setInterval(() => {
        setSlide(activeIndex + 1);
      }, 5000);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        setSlide(index);

        if (!isInteracting) {
          startAutoplay();
        }
      });
    });

    carousel.addEventListener("mouseenter", () => {
      isInteracting = true;
      stopAutoplay();
    });
    carousel.addEventListener("mouseleave", () => {
      isInteracting = false;
      startAutoplay();
    });
    carousel.addEventListener("focusin", () => {
      isInteracting = true;
      stopAutoplay();
    });
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) {
        isInteracting = false;
        startAutoplay();
      }
    });

    window.addEventListener("resize", syncCarousel);

    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener("change", () => {
        syncCarousel();

        if (prefersReducedMotion.matches) {
          stopAutoplay();
        } else {
          startAutoplay();
        }
      });
    }

    setSlide(0);
    startAutoplay();
  });
};

const setupProcessFlows = () => {
  if (!processFlows.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  processFlows.forEach((flow) => {
    const viewport = flow.querySelector(".process-stage-window");
    const track = flow.querySelector(".process-stage-track");
    const stepGrid = flow.querySelector(".process-step-grid");
    const steps = [...flow.querySelectorAll("[data-process-trigger]")];
    const panels = [...flow.querySelectorAll("[data-process-panel]")];
    const dots = [...flow.querySelectorAll("[data-process-dot]")];
    const previousButton = flow.querySelector("[data-process-prev]");
    const nextButton = flow.querySelector("[data-process-next]");
    const progressFill = flow.querySelector(".process-progress-fill");
    const currentNode = flow.querySelector("[data-process-current]");

    if (!viewport || !track || !stepGrid || !steps.length || steps.length !== panels.length) {
      return;
    }

    let activeIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchDeltaX = 0;
    let touchDeltaY = 0;

    const alignActiveStep = (behavior = "auto") => {
      if (window.innerWidth > 860) {
        return;
      }

      const activeStep = steps[activeIndex];

      if (!activeStep) {
        return;
      }

      const maxScrollLeft = stepGrid.scrollWidth - stepGrid.clientWidth;

      if (maxScrollLeft <= 0) {
        return;
      }

      const targetLeft = activeStep.offsetLeft - (stepGrid.clientWidth - activeStep.offsetWidth) / 2;
      const nextScrollLeft = Math.max(0, Math.min(targetLeft, maxScrollLeft));
      const scrollBehavior = prefersReducedMotion.matches ? "auto" : behavior;

      if (typeof stepGrid.scrollTo === "function") {
        stepGrid.scrollTo({
          left: nextScrollLeft,
          behavior: scrollBehavior
        });
        return;
      }

      stepGrid.scrollLeft = nextScrollLeft;
    };

    const syncFlow = ({ shouldFocus = false, stepScrollBehavior = "" } = {}) => {
      const offset = viewport.clientWidth * activeIndex;
      const progress = steps.length > 1 ? (activeIndex / (steps.length - 1)) * 100 : 100;

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      if (progressFill) {
        progressFill.style.width = `${progress}%`;
      }

      if (currentNode) {
        currentNode.textContent = String(activeIndex + 1).padStart(2, "0");
      }

      steps.forEach((step, index) => {
        const isActive = index === activeIndex;

        step.classList.toggle("is-active", isActive);
        step.setAttribute("aria-selected", String(isActive));
        step.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      panels.forEach((panel, index) => {
        const isActive = index === activeIndex;
        panel.classList.toggle("is-active", isActive);
        panel.setAttribute("aria-hidden", String(!isActive));
      });

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
      });

      const activeStep = steps[activeIndex];

      if (stepScrollBehavior) {
        alignActiveStep(stepScrollBehavior);
      }

      if (shouldFocus && activeStep) {
        activeStep.focus();
      }
    };

    const setStep = (nextIndex, options = {}) => {
      activeIndex = (nextIndex + steps.length) % steps.length;
      syncFlow(options);
    };

    steps.forEach((step, index) => {
      step.addEventListener("click", () => {
        setStep(index, { stepScrollBehavior: "smooth" });
      });

      step.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          setStep(index + 1, { shouldFocus: true, stepScrollBehavior: "smooth" });
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          setStep(index - 1, { shouldFocus: true, stepScrollBehavior: "smooth" });
        }

        if (event.key === "Home") {
          event.preventDefault();
          setStep(0, { shouldFocus: true, stepScrollBehavior: "smooth" });
        }

        if (event.key === "End") {
          event.preventDefault();
          setStep(steps.length - 1, { shouldFocus: true, stepScrollBehavior: "smooth" });
        }
      });
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        setStep(index, { stepScrollBehavior: "smooth" });
      });
    });

    if (previousButton) {
      previousButton.addEventListener("click", () => {
        setStep(activeIndex - 1, { stepScrollBehavior: "smooth" });
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        setStep(activeIndex + 1, { stepScrollBehavior: "smooth" });
      });
    }

    viewport.addEventListener(
      "touchstart",
      (event) => {
        if (window.innerWidth > 720 || !event.touches.length) {
          return;
        }

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        touchDeltaX = 0;
        touchDeltaY = 0;
      },
      { passive: true }
    );

    viewport.addEventListener(
      "touchmove",
      (event) => {
        if (window.innerWidth > 720 || !event.touches.length) {
          return;
        }

        touchDeltaX = event.touches[0].clientX - touchStartX;
        touchDeltaY = event.touches[0].clientY - touchStartY;
      },
      { passive: true }
    );

    viewport.addEventListener(
      "touchend",
      () => {
        if (window.innerWidth > 720) {
          return;
        }

        const isHorizontalSwipe = Math.abs(touchDeltaX) > 44 && Math.abs(touchDeltaX) > Math.abs(touchDeltaY);

        if (!isHorizontalSwipe) {
          return;
        }

        if (touchDeltaX < 0) {
          setStep(activeIndex + 1, { stepScrollBehavior: "smooth" });
        } else {
          setStep(activeIndex - 1, { stepScrollBehavior: "smooth" });
        }

        touchDeltaX = 0;
        touchDeltaY = 0;
      },
      { passive: true }
    );

    window.addEventListener("resize", syncFlow);

    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener("change", () => {
        syncFlow();
      });
    }

    setStep(0);
  });
};

bindFields();
bindLinks();
revealItems.forEach((item) => revealObserver.observe(item));
setupNavigation();
setupContactForm();
setupExpandCards();
setupAboutCarousels();
setupProcessFlows();
updateScrollUi();

window.addEventListener("scroll", updateScrollUi, { passive: true });
