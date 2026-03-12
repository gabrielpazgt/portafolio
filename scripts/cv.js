const portfolioData = window.portfolioData || {};

document.querySelectorAll("[data-field]").forEach((node) => {
  const key = node.dataset.field;
  const value = portfolioData[key];

  if (typeof value === "string" && value.trim()) {
    node.textContent = value;
  }
});

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
    default:
      return portfolioData[key] || "";
  }
};

document.querySelectorAll("[data-link]").forEach((node) => {
  const href = resolveLink(node.dataset.link);

  if (!href) {
    node.removeAttribute("href");
    node.setAttribute("aria-disabled", "true");
    node.classList.add("is-disabled");
    return;
  }

  node.setAttribute("href", href);
});
