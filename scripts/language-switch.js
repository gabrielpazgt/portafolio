(() => {
  const STORAGE_KEY = "portfolio-lang";

  const normalizePath = () => {
    let path = window.location.pathname.replace(/\\/g, "/");

    if (!path || path === "/") {
      return "index.html";
    }

    if (path.endsWith("/")) {
      path += "index.html";
    }

    path = path.replace(/^\/+/, "");

    const projectRoot = "Gabriel/Portafolio/";
    const projectIndex = path.toLowerCase().indexOf(projectRoot.toLowerCase());

    if (projectIndex >= 0) {
      path = path.slice(projectIndex + projectRoot.length);
    }

    return path || "index.html";
  };

  const pagePath = normalizePath();
  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const setText = (selector, value, scope = document) => {
    const node = q(selector, scope);

    if (node && typeof value === "string") {
      node.textContent = value;
    }
  };

  const setHtml = (selector, value, scope = document) => {
    const node = q(selector, scope);

    if (node && typeof value === "string") {
      node.innerHTML = value;
    }
  };

  const setAttr = (selector, attribute, value, scope = document) => {
    const node = q(selector, scope);

    if (node && typeof value === "string") {
      node.setAttribute(attribute, value);
    }
  };

  const setAllText = (selector, values, scope = document) => {
    qa(selector, scope).forEach((node, index) => {
      if (typeof values[index] === "string") {
        node.textContent = values[index];
      }
    });
  };

  const setAllAttr = (selector, attribute, values, scope = document) => {
    qa(selector, scope).forEach((node, index) => {
      if (typeof values[index] === "string") {
        node.setAttribute(attribute, values[index]);
      }
    });
  };

  const setMetaDescription = (value) => {
    const meta = q('meta[name="description"]');

    if (meta && typeof value === "string") {
      meta.setAttribute("content", value);
    }
  };

  const setSelectOptions = (selector, options) => {
    const select = q(selector);

    if (!select) {
      return;
    }

    select.innerHTML = "";

    options.forEach((option) => {
      const optionNode = document.createElement("option");
      optionNode.value = option.value;
      optionNode.textContent = option.label;
      select.append(optionNode);
    });
  };

  const translatePortfolio = () => {
    document.title = "Gabo Developer | Websites with personality";
    setMetaDescription(
      "Gabriel Paz portfolio. Frontend development with visual judgment, clear structure and focus on real web products."
    );

    setAllText('[data-field="role"]', ["Web design and development", "Web design and development"]);
    setAttr(".nav-toggle", "aria-label", "Open menu");
    setAllText(".site-nav a", ["Work", "About", "Skills", "Process", "Contact"]);
    setText(".header-cta", "Get a quote");

    setHtml(".hero-copy h1", 'Hi, I am <span>Gabo.</span>');
    setText(
      ".hero-text",
      "I design and build clear, polished websites that are easy to share for businesses, personal brands and real projects."
    );
    setAllText(".hero-actions a", ["View projects", "Get a quote"]);

    const heroNotes = qa(".hero-note-card");
    const heroNoteCopy = [
      {
        tag: "What I care about",
        title: "If it feels generic, it is not ready",
        body: "I want your website to have order, style and a vibe that actually feels like yours."
      },
      {
        tag: "How I work",
        title: "I speak clearly and explain simply",
        body: "I do not like hiding behind strange words. I would rather you understand everything from the start."
      },
      {
        tag: "A bit about me",
        title: "Counter-Strike, anime, the beach and boots",
        body: "If you want a quick picture of me outside work, that is pretty much my style and energy."
      }
    ];

    heroNotes.forEach((note, index) => {
      const copy = heroNoteCopy[index];

      if (!copy) {
        return;
      }

      setText(".panel-tag", copy.tag, note);
      setText("strong", copy.title, note);
      setText("p", copy.body, note);
    });

    setText(".hero-contact-label", "Let us talk on WhatsApp");
    setAllText(".hero-social-bar a", ["LinkedIn", "Resume"]);

    setText(".works .eyebrow", "Work");
    setText(
      ".works .section-heading h2",
      "Examples of the kind of website I can build for a brand, business or personal project."
    );
    setText(
      ".works .section-heading p",
      "These are not fake clients made to look bigger than reality. They are intentional demos so you can see the style, structure and presence I can build."
    );
    setText(".works-intro-card .panel-tag", "Real style references");
    setText(
      ".works-intro-card h3",
      "I wanted each demo to feel different, because not every business should look the same."
    );
    setText(
      ".works-intro-card p",
      "This is how I think about a website: say what matters quickly, look good and invite the next step without feeling heavy or improvised."
    );

    const projectCards = qa(".project-card");
    const projectCopy = [
      {
        category: "Visual concept / commercial landing page",
        label: "Premium coffee shop",
        description:
          "Art direction for a hospitality business: editorial hierarchy, curated atmosphere and a clear commercial structure to communicate product, space and reservations.",
        focus: "Focus: brand, visual narrative and conversion"
      },
      {
        category: "Visual concept / retail and interiors",
        label: "Showroom and online store",
        description:
          "A proposal for an interior design brand with a more editorial look: clean product cards, a sense of luxury and an experience built to highlight both product and brand.",
        focus: "Focus: brand presence and catalog presentation"
      },
      {
        category: "Visual concept / technical service",
        label: "Detailing and performance",
        description:
          "A concept for a premium service with a more technical, aggressive tone. The goal is to show how I adapt visual identity, rhythm and calls to action to each kind of business.",
        focus: "Focus: visual impact, clear offer and contact"
      },
      {
        category: "Visual concept / legal firm",
        label: "Firm and services",
        description:
          "A restrained site for professional services with a serious tone, clear hierarchy and a close designed for consultation or booking.",
        focus: "Focus: trust, clarity and visual authority"
      },
      {
        category: "Visual concept / wellness",
        label: "Clinic and bookings",
        description:
          "A concept for a wellness brand with a soft atmosphere, calm rhythm and focus on treatments, bookings and a premium experience.",
        focus: "Focus: atmosphere, bookings and service presentation"
      },
      {
        category: "Visual concept / real estate",
        label: "Real estate",
        description:
          "A landing page for properties and lead capture with a clean presentation, visual cards and a focus on trust while exploring.",
        focus: "Focus: listings, trust and guided contact"
      },
      {
        category: "Visual concept / fintech",
        label: "Finance and advisory",
        description:
          "An interface with a more analytical and reliable tone for a financial brand that needs visual clarity, data and conversion without noise.",
        focus: "Focus: clarity, data and a sense of control"
      },
      {
        category: "Visual concept / architecture",
        label: "Architecture and interiors",
        description:
          "An editorial proposal for a creative studio with a more architectural composition, strong typography and sections designed to showcase work.",
        focus: "Focus: visual storytelling and portfolio presentation"
      },
      {
        category: "Visual concept / gym",
        label: "Gym and memberships",
        description:
          "An energetic site for a fitness club with strong rhythm, schedules, plans and a more dynamic visual experience built for conversion.",
        focus: "Focus: energy, memberships and bookings"
      }
    ];

    projectCards.forEach((card, index) => {
      const copy = projectCopy[index];

      if (!copy) {
        return;
      }

      setText(".preview-copy span", copy.category, card);
      const labelRow = q(".project-label-row", card);

      if (labelRow?.children[0]) {
        labelRow.children[0].textContent = copy.label;
      }

      setText(".project-meta p", copy.description, card);
      setText(".project-focus > span:not(.project-cta)", copy.focus, card);
      setText(".project-cta", "VIEW DEMO", card);
    });

    setText(".about .eyebrow", "About");
    setText(".about-copy h2", "If you can imagine it, I can build it.");
    setAllText(".about-copy p", [
      "I am Gabo. I work in software development, but I am also someone who enjoys life outside work a lot. I am hooked on Counter-Strike, I love anime, I enjoy a good series and I will never say no to a pizza Sunday.",
      "I also like plans with a bit of adventure. If they include boots and a hat, I will probably be there. I like that balance between technology, quiet moments and experiences that turn into memories.",
      "I value the people in my life a lot. I have great friends and a wonderful family that loves me, takes care of me and pushes me to keep growing. In the end, that also defines who I am: someone who dreams, builds, enjoys and stays grateful."
    ]);
    setAllText(".about-links a", ["LinkedIn", "Download PDF resume"]);
    setAllText(".about-point-card strong", ["What I aim for", "How I work", "What I value"]);
    setAllText(".about-point-card span:last-child", [
      "I want your website to feel like it truly speaks about you, your brand and what you want to communicate.",
      "You tell me your idea, we shape it together and turn it into a clear, modern and functional website.",
      "Designs with personality, clear messaging and websites made with intention, not just to get something out the door."
    ]);
    setText(".about-carousel-label", "Key points");
    setAllAttr(".about-carousel-dot", "aria-label", [
      "View what I aim for",
      "View how I work",
      "View what I value"
    ]);

    setText(".skills .eyebrow", "What I bring");
    setText(".skills-heading h2", "Technical foundation, visual judgment and a clear way of working.");
    setText(
      ".skills-heading p",
      "I do more than build interfaces. I also help shape ideas into functional, modern sites that are pleasant to work on from start to finish."
    );
    setText(".skills-intro-card .panel-tag", "In short");
    setText(
      ".skills-intro-card strong",
      "Technical foundation to build. Visual judgment to present. Closeness to work without drama."
    );
    setText(
      ".skills-intro-card p",
      "I care about the outcome looking good, and I care just as much about the process feeling clear from start to finish."
    );
    setAllText(".skills-card .panel-tag", ["Technical skills", "Human skills"]);
    setAllText(".skills-card-copy h3", [
      "Modern frontend for sites that look good, are easy to understand and can scale.",
      "The technical side matters, but how the process feels matters a lot too."
    ]);
    setAllText(".skills-card-copy p", [
      "I work with Angular, React and modern web technologies to build clean, responsive and well-structured interfaces, taking care of both functionality and visual experience.",
      "I like working clearly, solving problems without drama and keeping communication close so the project can move forward with confidence."
    ]);
    setAllText(".skills-cluster-label", [
      "Frontend",
      "UI",
      "Integration",
      "Communication",
      "Mindset",
      "Work style"
    ]);
    setAllText(".skills-card-tech .skills-pills span", [
      "Angular",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "SCSS",
      "Tailwind",
      "Responsive design",
      "UI development",
      "APIs",
      "Version control",
      "Reusable components",
      "Basic backend"
    ]);
    setAllText(".skills-card-human .skills-pills span", [
      "Clear communication",
      "Empathy",
      "Teamwork",
      "Creativity",
      "Problem solving",
      "Adaptability",
      "Organization",
      "Attention to detail",
      "Constant learning",
      "Commitment to every project"
    ]);
    setText(".skills-value .panel-tag", "My value");
    setText(
      ".skills-value-body h3",
      "I am not only trying to build a website that works well, but also make the process clear, close and enjoyable."
    );
    setAllText(".skills-value-body p", [
      "I can help you turn an idea into a functional, attractive website with personality, taking care of both the technical side and the experience of working together.",
      "I build digital solutions, but I also want building something with you to feel simple, clear and human."
    ]);
    setText(".skills-quote-text", "And yes, I can probably make you smile while we build something good.");
    setAllText(".skills-value-points span", ["Modern interfaces", "Clear process", "Strong first impression"]);

    setText(".process .eyebrow", "Process");
    setText(".process-heading h2", "This is how I shape your ideas: simple, clear and without making you feel lost.");
    setText(
      ".process-heading p",
      "You do not need to arrive with everything figured out. Part of my job is helping you organize what you have in mind and turn it into a website with meaning, structure and strong presence."
    );
    setText(".process-flow-copy .panel-tag", "Work route");
    setText(
      ".process-flow-copy p",
      "Four steps to move from a loose idea to a clear, functional website that is ready to be shown."
    );
    setText(".process-mobile-hint", "Tap a step or swipe the panel");
    setAllText(".process-step strong", ["You tell me your idea", "We shape it", "I build it", "We get it ready"]);
    setAllText(".process-step-description", [
      "We start from what you already have in mind, without overcomplicating it.",
      "We organize the content, visual focus and direction of the page.",
      "I develop it, connect what is needed and validate the experience.",
      "We test, polish the details and I hand it over ready to show."
    ]);
    setAllText(".process-panel-state", ["Initial idea", "Visual direction", "Build", "Final delivery"]);
    setAllText(".process-aside-label", [
      "What we focus on here",
      "What we focus on here",
      "What we focus on here",
      "What we focus on here"
    ]);
    setAllText(".process-panel-copy h3", ["You tell me your idea", "We shape it", "I build it", "We get it ready"]);
    setAllText(".process-panel-copy p", [
      "You do not need to arrive with everything perfect. You share what you have in mind and we start from there.",
      "We organize the content, define the visual approach and sketch a clear direction for the website.",
      "I develop the site, connect what is needed and make sure the experience works well everywhere.",
      "We test, adjust details and I deliver a polished, functional result that is ready to go live."
    ]);
    const processPointGroups = qa(".process-panel-points");
    const processPointCopy = [
      ["Context", "Goal", "References"],
      ["Structure", "Hierarchy", "Style"],
      ["Development", "Responsive", "Integrations"],
      ["Review", "Adjustments", "Delivery"]
    ];

    processPointGroups.forEach((group, index) => {
      setAllText("span", processPointCopy[index], group);
    });

    setAllText(".process-control", ["Previous", "Next"]);
    setAllAttr(".process-control", "aria-label", ["View previous step", "View next step"]);
    setAllAttr(".process-dot", "aria-label", ["View step 1", "View step 2", "View step 3", "View step 4"]);

    setText(".contact-copy .eyebrow", "Contact");
    setText(".contact-copy-top h2", "If you have an idea in mind, even if it still feels a bit messy, message me anyway.");
    setText(
      ".contact-copy-top p:not(.contact-trust)",
      "You do not need to know how to ask for it or use technical words. Tell me what you want to achieve and we can figure out together how to turn it into a clear, polished website that is easy to show."
    );
    setText(".contact-trust", "If you prefer, we can start on WhatsApp and you can tell me the idea exactly as it is in your head.");
    setAttr(".contact-signals", "aria-label", "What you can expect");
    setAllText(".contact-signals span", ["Straight answers", "Clear process", "WhatsApp or email"]);
    setAllText(".contact-shortcut-copy strong", ["WhatsApp", "LinkedIn", "PDF resume"]);
    setAllText(".contact-shortcut-copy span", [
      "The fastest way to get a quote, clear doubts or start an idea.",
      "If you want to review my professional profile and stay in touch there.",
      "If you prefer a quick view of my experience, you can download it in a single file."
    ]);
    setAllText(".contact-shortcut-action", ["Open chat", "View profile", "Download"]);

    setText(".form-header .panel-tag", "Tell me about your idea");
    setText(".form-header h3", "Tell me briefly what you need");
    setText(".form-header p", "If you already have a clear idea, perfect. If not, give me some context and I will help you shape it.");
    setAllText(".field-head span:first-child", ["Name", "Email", "Phone or WhatsApp", "Project type", "Message"]);
    setAllText(".field-state", ["Required", "Required", "Optional", "Required", "Required"]);
    setAttr('input[name="name"]', "placeholder", "Your name");
    setAttr('input[name="email"]', "placeholder", "you@company.com");
    setAttr('input[name="phone"]', "placeholder", "Your contact number");
    setSelectOptions('select[name="project"]', [
      { value: "", label: "Select an option" },
      { value: "Landing page", label: "Landing page" },
      { value: "Corporate website", label: "Corporate website" },
      { value: "Portfolio", label: "Portfolio" },
      { value: "Online store", label: "Online store" },
      { value: "Dashboard / system", label: "Dashboard / system" },
      { value: "Website redesign", label: "Website redesign" },
      { value: "I am not sure yet", label: "I am not sure yet" }
    ]);
    setAttr(
      'textarea[name="message"]',
      "placeholder",
      "Tell me what you want to build, what stage you are in and what you want this website to help you achieve."
    );
    setText(".form-note", "Your message reaches me directly. We can also continue on WhatsApp if that feels easier for you.");
    setText(".submit-button", "Send message");

    setText(".site-footer p", "Clear websites with personality, built to connect with real people.");
    setAllText(".footer-links a", ["LinkedIn", "Download resume", "Back to top"]);
  };

  const translateNativo = () => {
    document.title = "Nativo Cafe | Specialty coffee and brunch";
    setMetaDescription(
      "Nativo Cafe is a conceptual portfolio demo: a specialty coffee shop with brunch, in-house roasting and an editorial feel."
    );
    setText(".brand", "Nativo Cafe");
    setAttr(".nav-toggle", "aria-label", "Open menu");
    setAllText(".site-nav a", ["Story", "Menu", "Space", "Booking"]);
    setText(".header-inner > .button", "Book a table");
    setText(".hero-copy .eyebrow", "Specialty coffee and slow brunch");
    setText(".hero-copy h1", "A cafe that blends honest beans, light cooking and an atmosphere that makes you want to stay.");
    setText(
      ".hero-copy p",
      "Nativo Cafe roasts small batches, works with local producers and serves a seasonal brunch in a space that feels as good as it tastes."
    );
    setAllText(".hero-actions a", ["View menu", "Our story"]);
    setAllText(".hero-panel span", ["Weekly roast", "Seasonal brunch"]);
    setAllText(".hero-panel strong", ["House Blend", "08:00 - 15:00"]);
    setAllText(".hero-panel p", [
      "Dark chocolate, toasted caramel and a citrus finish.",
      "Artisan bread, soft eggs and plates made to order."
    ]);
    setAllText(".stats-grid span", [
      "years refining the experience",
      "signature drinks and dishes",
      "origins available each season"
    ]);
    setText(".story-copy .eyebrow", "Our story");
    setText(".story-copy h2", "Specialty coffee with a human rhythm.");
    setAllText(".story-copy p", [
      "We started as a small bar focused on pulling coffee well. Over time we added kitchen service, artisan baking and a space designed for quiet meetings, light work and long breakfasts.",
      "The result is a brand with curated aesthetics, friendly service and an operation that feels consistent from the first cup to the last plate."
    ]);
    setText(".menu-section .eyebrow", "House menu");
    setText(".menu-section h2", "Dishes and drinks built to bring people back.");

    const menuCards = qa(".menu-card");
    const menuCopy = [
      ["Drink", "Flat White Nativo", "Espresso from the house blend, textured milk and a panela finish."],
      ["Drink", "Cold Brew Citrus", "Long infusion with dried orange and cocoa notes."],
      ["Brunch", "Ricotta toast", "Sourdough, whipped ricotta, warm honey and hazelnuts."],
      ["Brunch", "House eggs", "Soft eggs, herb butter and crisp golden potatoes."],
      ["Pastry", "Cardamom roll", "Flaky dough with browned butter and a light glaze."],
      ["Retail coffee", "Bags to go", "Selected microlots, ground to order and brewing guidance."]
    ];

    menuCards.forEach((card, index) => {
      const [tag, title, body] = menuCopy[index];
      setText("span", tag, card);
      setText("h3", title, card);
      setText("p", body, card);
    });

    setText(".experience .eyebrow", "The space");
    setText(".experience h2", "Designed for slow mornings, small meetings and long afternoons.");

    const experienceCards = qa(".experience-card");
    const experienceCopy = [
      ["Open bar", "Service happens right in front of you: grinding, extraction and real conversation."],
      ["Shared tables", "Ideal for light work, short meetings or guests who arrive with a laptop."],
      ["Private events", "Cuppings, branded brunches and small gatherings with a curated menu."]
    ];

    experienceCards.forEach((card, index) => {
      const [title, body] = experienceCopy[index];
      setText("strong", title, card);
      setText("p", body, card);
    });

    setText(".reservation .eyebrow", "Booking");
    setText(".reservation h2", "Open Monday through Sunday.");
    setText(
      ".reservation p",
      "Book for brunch, cuppings or small meetings. This demo shows what a clear call to action could look like for a real business."
    );
    setText(".reservation-meta .button", "Request booking");
    setText(".site-footer p", "Conceptual portfolio demo. Fictional business created to showcase professional web design.");
    setText(".site-footer a", "Back to portfolio");
  };

  const translateAtelier = () => {
    document.title = "Atelier Lumen | Objects and interiors";
    setMetaDescription(
      "Atelier Lumen is a conceptual portfolio demo for retail and interiors: furniture, design objects and a private showroom."
    );
    setAttr(".nav-toggle", "aria-label", "Open menu");
    setAllText(".site-nav a", ["Collections", "Pieces", "Showroom", "Contact"]);
    setText(".header-inner > .button", "Book visit");
    setText(".hero-copy .eyebrow", "Objects, lighting and quiet luxury");
    setText(".hero-copy h1", "Pieces for interiors that feel edited, not crowded.");
    setText(
      ".hero-copy p",
      "Atelier Lumen curates furniture, lighting and objects for homes, hospitality projects and boutique spaces looking for a serene, timeless aesthetic."
    );
    setAllText(".hero-actions a", ["Explore pieces", "View showroom"]);

    const visualCards = qa(".hero-visual .visual-card");

    if (visualCards[0]) {
      setText(".card-copy span", "Featured piece", visualCards[0]);
      setText(".card-copy strong", "Sol chair", visualCards[0]);
      setText(".card-copy p", "Solid wood, sand linen upholstery and sculptural proportion.", visualCards[0]);
    }

    if (visualCards[1]) {
      setText("span", "Halo lamp", visualCards[1]);
    }

    if (visualCards[2]) {
      setText("span", "Curated for", visualCards[2]);
      setText("strong", "Residential, hospitality and premium retail", visualCards[2]);
    }

    setAllText(".marquee-track span", [
      "Private showroom",
      "Limited edition",
      "Interior styling",
      "Lighting objects",
      "Designer furniture",
      "Private showroom",
      "Limited edition",
      "Interior styling"
    ]);
    setText(".collections .eyebrow", "Collections");
    setText(".collections h2", "A selection focused on volume, texture and permanence.");

    const collectionCards = qa(".collection-card");
    const collectionCopy = [
      ["Lighting", "Halo Series", "Ambient lighting pieces with soft lines, satin metal and controlled warmth."],
      ["Seating", "Sol Collection", "Armchairs and chairs that balance visual presence, comfort and noble materials."],
      ["Objects", "Quiet Forms", "Sculptural objects, ceramics and decorative pieces for spaces with intention."]
    ];

    collectionCards.forEach((card, index) => {
      const [tag, title, body] = collectionCopy[index];
      setText("span", tag, card);
      setText("h3", title, card);
      setText("p", body, card);
    });

    setText(".pieces .eyebrow", "Featured selection");
    setText(".pieces h2", "Pieces presented like a real brand.");
    setAllText(".piece-meta strong", ["Arco armchair", "Totem lamp", "Stone console"]);
    setText(".showroom .eyebrow", "Showroom appointment");
    setText(".showroom h2", "A private experience for architects, brands and end clients.");
    setText(
      ".showroom-copy p",
      "Atelier Lumen runs its showroom by appointment. The session includes curation, finish selection, order coordination and an aesthetic proposal for each space."
    );

    const showroomArticles = qa(".showroom-panel article");
    const showroomCopy = [
      ["Curation session", "60 minutes with guided selection based on space, use and visual language."],
      ["Editorial styling", "Support for stores, boutique hotels and premium property staging."]
    ];

    showroomArticles.forEach((article, index) => {
      const [title, body] = showroomCopy[index];
      setText("strong", title, article);
      setText("p", body, article);
    });

    setText(".showroom-panel .button", "Request appointment");
    setText(".contact .eyebrow", "Concierge");
    setText(".contact h2", "Personalized attention for projects with intention.");
    setAllText(".contact-actions a", ["Contact", "View portfolio"]);
    setText(".site-footer p", "Conceptual portfolio demo. Fictional brand created to show visual versatility.");
    setText(".site-footer a", "Back to portfolio");
  };

  const translateBlackline = () => {
    document.title = "Blackline Auto | Detailing and performance";
    setMetaDescription(
      "Blackline Auto is a conceptual portfolio demo: premium detailing, ceramic protection and performance tuning with an aggressive visual identity."
    );
    setAttr(".nav-toggle", "aria-label", "Open menu");
    setAllText(".site-nav a", ["Services", "Process", "Packages", "Booking"]);
    setText(".header-inner > .button", "Get a quote");
    setText(".hero-copy .eyebrow", "Premium detailing, ceramic and performance");
    setText(".hero-copy h1", "Aesthetic and mechanical precision for cars that never go unnoticed.");
    setText(
      ".hero-copy p",
      "Blackline Auto combines high-end detailing, ceramic protection, paint correction and visual upgrades for clients who care about every detail of their vehicle."
    );
    setAllText(".hero-actions a", ["View packages", "How we work"]);
    setText(".dashboard-card span", "Workshop monitor");
    setText(".dashboard-card strong", "Live status");
    setAllText(".dashboard-card .meter-grid span", ["Paint", "Gloss", "Shield"]);
    setText(".spec-card span", "Popular setup");
    setText(".spec-card strong", "Correction + ceramic + interior reset");
    setText("#servicios .eyebrow", "Services");
    setText("#servicios h2", "Treatments designed to protect, correct and elevate presence.");

    const serviceCards = qa(".service-card");
    const serviceCopy = [
      ["01", "Paint correction", "Controlled removal of marks, micro-scratches and defects to recover depth."],
      ["02", "Ceramic coating", "Hydrophobic protective layer with lasting shine and easier maintenance."],
      ["03", "Interior reset", "Technical cleaning, leather treatment and showroom-level interior finishes."],
      ["04", "Visual upgrades", "Exterior details, trim finishing, calipers, lights and a full-presence aesthetic."]
    ];

    serviceCards.forEach((card, index) => {
      const [tag, title, body] = serviceCopy[index];
      setText("span", tag, card);
      setText("h3", title, card);
      setText("p", body, card);
    });

    setText(".process .eyebrow", "Process");
    setText(".process h2", "Clear diagnosis, technical work and a flawless delivery.");

    const processItems = qa(".process-item");
    const processCopy = [
      ["Initial scan", "Inspection of paint, interior and client goals before any intervention."],
      ["Correction", "Layered work focused on shine, consistency and reducing imperfections."],
      ["Protection", "Final sealing and maintenance recommendations to preserve the result."]
    ];

    processItems.forEach((item, index) => {
      const [title, body] = processCopy[index];
      setText("strong", title, item);
      setText("p", body, item);
    });

    setText(".packages .eyebrow", "Packages");
    setText(".packages h2", "Options ready to sell like a real business.");

    const packageCards = qa(".package-card");
    const packageCopy = [
      ["Essential", "Exterior Reset", "Technical wash, decontamination, gloss finish and wheels.", "From USD 120"],
      ["Most requested", "Blackline Signature", "Correction, ceramic coating, interior work and full delivery detailing.", "From USD 480"],
      ["Performance", "Track Ready", "Premium aesthetics, protection and visual prep for high-profile cars.", "From USD 760"]
    ];

    packageCards.forEach((card, index) => {
      const [tag, title, body, price] = packageCopy[index];
      setText("span", tag, card);
      setText("strong", title, card);
      setText("p", body, card);
      setText("em", price, card);
    });

    setAllText(".metrics-grid span", [
      "vehicles serviced in the last year",
      "returning or referred clients",
      "hours dedicated to full premium treatments"
    ]);
    setText(".schedule .eyebrow", "Booking");
    setText(".schedule h2", "Book your evaluation and receive a proposal the same day.");
    setText(".schedule p", "This demo uses a strong visual close with a direct call to action, ideal for premium services.");
    setAllText(".schedule-actions a", ["Book inspection", "Back to portfolio"]);
    setText(".site-footer p", "Conceptual portfolio demo. Fictional business created to showcase high-contrast visual execution.");
    setText(".site-footer a", "Back to portfolio");
  };
  const translateSolara = () => {
    document.title = "Solara Wellness | Rituals and facial studio";
    setMetaDescription(
      "Solara Wellness is a conceptual portfolio demo: a wellness brand with treatments and booking in a serene visual experience."
    );
    setAttr(".nav-toggle", "aria-label", "Open menu");
    setAllText(".site-nav a", ["Rituals", "Space", "Booking"]);
    setText(".header-inner > .button", "Book");
    setText(".hero-copy .eyebrow", "Skin rituals, breathwork and quiet care");
    setText(".hero-copy h1", "A wellness experience that feels soft, curated and easy to book.");
    setText(
      ".hero-copy p",
      "Solara Wellness is a conceptual demo for a brand focused on treatments, facial rituals and spaces for pause. The goal is to show a calm, premium and commercial UX at the same time."
    );
    setAllText(".hero-actions a", ["View rituals", "Book session"]);
    setAllText(".visual-card span", ["Signature ritual", "Booking flow"]);
    setAllText(".visual-card strong", ["Solar Reset", "Simple, short and clear"]);
    setText(".main-card p", "Deep cleansing, facial massage and an atmosphere built from calm.");
    setText("#rituales .eyebrow", "Rituals");
    setText("#rituales h2", "Treatments presented with a much more refined feeling than a common catalog.");

    const ritualCards = qa(".ritual-card");
    const ritualCopy = [
      ["Solar Reset", "Restorative facial for texture, hydration and mental pause."],
      ["Calm Layer", "Barrier ritual, massage and guided breathing."],
      ["Golden Lift", "Session focused on glow, tone and a premium care experience."]
    ];

    ritualCards.forEach((card, index) => {
      const [title, body] = ritualCopy[index];
      setText("strong", title, card);
      setText("p", body, card);
    });

    setText(".space-copy .eyebrow", "The space");
    setText(".space-copy h2", "A brand that communicates calm from the very first screen.");
    setText(
      ".space-copy p",
      "This demo uses a softer composition, rounded blocks, breathing room and shorter copy so the site feels as carefully made as the service it sells."
    );
    setText(".booking .eyebrow", "Booking");
    setText(".booking h2", "Book a session in minutes.");
    setText(".booking .button", "Book ritual");
    setText(".site-footer p", "Conceptual portfolio demo. Fictional brand built to show visual direction, bookings and tone of voice.");
    setText(".site-footer a", "Back to portfolio");
  };

  const translateMoss = () => {
    document.title = "Moss Studio | Architecture and interiors";
    setMetaDescription(
      "Moss Studio is a conceptual portfolio demo: an architecture studio with editorial storytelling, featured work and a restrained identity."
    );
    setAttr(".nav-toggle", "aria-label", "Open menu");
    setAllText(".site-nav a", ["Work", "Studio", "Consultation"]);
    setText(".header-inner > .button", "View availability");
    setText(".hero-copy .eyebrow", "Architecture, interiors and spatial direction");
    setText(".hero-copy h1", "An editorial identity for presenting work, space and studio judgment.");
    setText(
      ".hero-copy p",
      "Moss Studio is a conceptual demo for an architecture and interior design studio. The proposal aims for the site to feel restrained, contemporary and strongly focused on showing work with a strong visual rhythm."
    );
    setAllText(".hero-actions a", ["View projects", "Book call"]);
    setText(".composition-note .eyebrow", "Selected spaces");
    setText(".composition-note strong", "Residential, hospitality and boutique retail");
    setText("#obra .eyebrow", "Work");
    setText("#obra h2", "A portfolio presentation that lets projects breathe.");
    setText(
      "#obra .section-heading p",
      "The idea in this demo is to replace the classic crowded grid with a more editorial composition, where every block feels chosen and navigation has a better rhythm."
    );

    const workCards = qa(".work-card");
    const workCopy = [
      ["Casa Ladera", "Residential project with neutral materials, soft lighting and clean interior transitions."],
      ["Hotel Arco", "Hospitality concept with a restrained lobby, earth tones and a refined atmosphere."],
      ["Monolith Store", "Commercial space designed for display, a short path and a more architectural presence."]
    ];

    workCards.forEach((card, index) => {
      const [title, body] = workCopy[index];
      setText(".work-copy strong", title, card);
      setText(".work-copy p", body, card);
    });

    setText(".studio-copy .eyebrow", "Studio");
    setText(".studio-copy h2", "Less decorative noise, more attention to space and form.");
    setText(
      ".studio-copy p",
      "The demo carefully uses typography, negative space, proportions and soft contrast so the studio identity feels more mature and coherent."
    );

    const studioPoints = qa(".studio-points article");
    const studioCopy = [
      ["Visual storytelling", "Airy blocks, large images and a tone that does not compete with the work."],
      ["Editorial hierarchy", "Strong headlines, short descriptions and spaces built for a serious portfolio."],
      ["Elegant close", "The final consultation feels natural and does not break the atmosphere built through the rest of the site."]
    ];

    studioPoints.forEach((point, index) => {
      const [title, body] = studioCopy[index];
      setText("strong", title, point);
      setText("p", body, point);
    });

    setText(".consult-section .eyebrow", "Consultation");
    setText(".consult-section h2", "A visual direction ready to speak to high-judgment clients.");
    setText(
      ".consult-section p",
      "This concept is designed to present the portfolio, the studio tone and a clear path into contact."
    );
    setText(".consult-section .button", "Start conversation");
    setText(".site-footer p", "Conceptual portfolio demo. Fictional studio created to show editorial direction and work presentation.");
    setText(".site-footer a", "Back to portfolio");
  };

  const translateOrbit = () => {
    document.title = "Orbit Finance | Finance interface";
    setMetaDescription(
      "Orbit Finance is a conceptual portfolio demo: a fintech brand with clear dashboards, visual trust and a conversion close."
    );
    setAttr(".nav-toggle", "aria-label", "Open menu");
    setAllText(".site-nav a", ["Solutions", "Platform", "Access"]);
    setText(".header-inner > .button", "Request demo");
    setText(".hero-copy .eyebrow", "Planning, reporting and advisory");
    setText(".hero-copy h1", "A financial interface with clear data, a trustworthy tone and better product readability.");
    setText(
      ".hero-copy p",
      "Orbit Finance is a conceptual demo for an advisory and financial control platform. The proposal blends a more technological presence with a UX focused on clarity, control and conversion."
    );
    setAllText(".hero-actions a", ["Explore platform", "Talk to an advisor"]);
    setText(".dashboard-top .chip", "Account overview");
    setAllText(".dashboard-bottom span", ["Cash flow", "Risk score"]);
    setAllText(".dashboard-bottom strong", ["Stable", "Controlled"]);
    setText(".side-stat .chip", "Client view");
    setText(".side-stat strong", "Reports that are easier to understand");
    setText(".side-stat p", "The structure prioritizes concise summaries, clean visuals and useful calls to action.");
    setText("#soluciones .eyebrow", "Solutions");
    setText("#soluciones h2", "Product blocks designed to explain value without overwhelming.");
    setText(
      "#soluciones .section-heading p",
      "This demo translates a financial brand into a more modern visual language without losing the sense of control or clarity that a data-heavy product requires."
    );

    const solutionCards = qa(".solution-card");
    const solutionCopy = [
      ["Executive dashboard", "A visual summary to understand performance, liquidity and decision points in seconds."],
      ["Reports and tracking", "Clear history, key indicators and an experience that feels less rigid than a traditional dashboard."],
      ["Guided advisory", "CTAs focused on consultation, demo or diagnosis depending on the user moment."]
    ];

    solutionCards.forEach((card, index) => {
      const [title, body] = solutionCopy[index];
      setText("strong", title, card);
      setText("p", body, card);
    });

    setText(".platform-copy .eyebrow", "Platform");
    setText(".platform-copy h2", "Data, visual storytelling and trust on the same screen.");
    setText(
      ".platform-copy p",
      "The experience mixes dashboard-style components with commercial sections, so the brand can sell service, product and judgment at the same time."
    );

    const platformArticles = qa(".platform-panels article");
    const platformCopy = [
      ["Restrained visual language", "High contrast, clean rhythm and blocks that help scan complex information."],
      ["Strong hierarchy", "Highlighted indicators, support modules and calls to action placed with intention."],
      ["Ready to scale", "The composition can grow into panels, tabs, reports and more technical views."]
    ];

    platformArticles.forEach((article, index) => {
      const [title, body] = platformCopy[index];
      setText("strong", title, article);
      setText("p", body, article);
    });

    setText(".access-section .eyebrow", "Access");
    setText(".access-section h2", "A fintech demo with a clear close and professional tone.");
    setText(".access-section p", "The close leaves the next step ready: demo, commercial contact or a product presentation.");
    setText(".access-section .button", "Request demo");
    setText(".site-footer p", "Conceptual portfolio demo. Fictional brand created to show visual direction, dashboards and conversion.");
    setText(".site-footer a", "Back to portfolio");
  };
  const translateNorthpeak = () => {
    document.title = "Northpeak Realty | Curated properties";
    setMetaDescription(
      "Northpeak Realty is a conceptual portfolio demo: a premium real estate brand with featured properties, visual trust and guided contact."
    );
    setAttr(".nav-toggle", "aria-label", "Open menu");
    setAllText(".site-nav a", ["Properties", "Method", "Contact"]);
    setText(".header-inner > .button", "Book visit");
    setText(".hero-copy .eyebrow", "Residential advisory and premium properties");
    setText(".hero-copy h1", "A real estate experience that feels clear, curated and easy to explore.");
    setText(
      ".hero-copy p",
      "Northpeak Realty is a visual concept for a premium real estate brand. The goal is to present properties, buying criteria and an elegant contact path without making the site feel heavy or cold."
    );
    setAllText(".hero-actions a", ["View properties", "Request advisory"]);
    setAllText(".hero-highlights span", ["Curated homes", "Clean visuals", "Guided contact"]);
    setText(".main-estate .card-label", "Featured property");
    setText(".main-estate p", "Five bedrooms, rooftop lounge and a layout designed for natural light and family life.");
    setText(".floating-estate .card-label", "Initial consultation");
    setText(".floating-estate strong", "Selection and visit in one flow");
    setText(".floating-estate p", "The site prioritizes clear property cards, useful filters and direct paths toward advisory.");
    setText("#propiedades .eyebrow", "Featured properties");
    setText("#propiedades h2", "Property cards built to sell a home without losing clarity.");
    setText(
      "#propiedades .section-heading p",
      "This demo imagines a real estate brand with a more editorial presentation: strong simulated photography, concrete details and a reading flow that helps people decide."
    );

    const listingCards = qa(".listing-card");
    const listingCopy = [
      ["Skyline Terrace", "Urban apartment with a private terrace, open kitchen and contemporary finishes.", "2 bedrooms / 2 baths / USD 340K"],
      ["Elm Garden House", "Family home with a large garden, private office and well-resolved interior circulation.", "4 bedrooms / garden / USD 610K"],
      ["Northpoint Lofts", "Project for investors looking for location, profitability and a restrained presentation.", "Investment / amenities / USD 245K"]
    ];

    listingCards.forEach((card, index) => {
      const [title, body, meta] = listingCopy[index];
      setText(".listing-copy strong", title, card);
      setText(".listing-copy p", body, card);
      setText(".listing-copy span", meta, card);
    });

    setText(".method-copy .eyebrow", "Method");
    setText(".method-copy h2", "A site that helps people understand the offer before speaking with an advisor.");
    setText(
      ".method-copy p",
      "The structure combines visual trust, simple filters, short blocks and a narrative focused on location, lifestyle and property value."
    );

    const methodArticles = qa(".method-panel article");
    const methodCopy = [
      ["Clearer search", "The important information appears quickly and avoids the feeling of a messy catalog."],
      ["Contact placed well", "The user finds natural exits to request information or book a visit."],
      ["Premium tone", "The look communicates value without slipping into a rigid or overly classic experience."]
    ];

    methodArticles.forEach((article, index) => {
      const [title, body] = methodCopy[index];
      setText("strong", title, article);
      setText("p", body, article);
    });

    setText(".inquiry-section .eyebrow", "Contact");
    setText(".inquiry-section h2", "Ready for a visit or a more grounded conversation.");
    setText(".inquiry-section p", "This close is built to turn calm browsing into a direct conversation.");
    setText(".inquiry-section .button", "Request information");
    setText(".site-footer p", "Conceptual portfolio demo. Fictional real estate brand created to show visual direction and commercial experience.");
    setText(".site-footer a", "Back to portfolio");
  };

  const translatePulse = () => {
    document.title = "Pulse Fit Club | Performance gym";
    setMetaDescription(
      "Pulse Fit Club is a conceptual portfolio demo: a gym with an intense tone, clear memberships and an experience focused on conversion."
    );
    setAttr(".nav-toggle", "aria-label", "Open menu");
    setAllText(".site-nav a", ["Classes", "Memberships", "Contact"]);
    setText(".header-inner > .button", "Join");
    setText(".hero-copy .eyebrow", "Strength, conditioning and coaching");
    setText(".hero-copy h1", "A fitness site with more visual energy, better structure and calls to action ready to convert.");
    setText(
      ".hero-copy p",
      "Pulse Fit Club is a conceptual demo for a gym or training center. It aims to communicate power, order and a much more direct experience for plans, schedules and lead generation."
    );
    setAllText(".hero-actions a", ["View plans", "Book tour"]);

    const pulseCards = qa(".hero-card");

    if (pulseCards[0]) {
      setText(".card-tag", "Performance week", pulseCards[0]);
      setText("strong", "Hybrid strength program", pulseCards[0]);
      setText("p", "Guided training, clear blocks and a more energetic visual language.", pulseCards[0]);
    }

    if (pulseCards[1]) {
      setText(".card-tag", "Hours", pulseCards[1]);
      setText("strong", "5:30 AM - 10:00 PM", pulseCards[1]);
    }

    if (pulseCards[2]) {
      setText(".card-tag", "Membership", pulseCards[2]);
      setText("strong", "Monthly plans and single classes", pulseCards[2]);
    }

    setText("#clases .eyebrow", "Classes");
    setText("#clases h2", "A section that sells rhythm, schedules and variety without losing order.");
    setText(
      "#clases .section-heading p",
      "This demo leans on strong contrast, heavy typography and clear cards so the class offer is easy to understand and the user naturally moves toward a membership or a visit."
    );

    const classCards = qa(".class-card");
    const classCopy = [
      ["Strength Lab", "Sessions focused on strength, technique and weekly progression.", "Mon / Wed / Fri"],
      ["Conditioning", "Resistance and power blocks for a more dynamic workout.", "Tue / Thu"],
      ["Coach Session", "One-on-one support for technique, goals and follow-up.", "By appointment"]
    ];

    classCards.forEach((card, index) => {
      const [title, body, meta] = classCopy[index];
      setText("strong", title, card);
      setText("p", body, card);
      setText("span", meta, card);
    });

    setText(".membership-copy .eyebrow", "Memberships");
    setText(".membership-copy h2", "Plans presented clearly so choosing feels frictionless.");
    setText(
      ".membership-copy p",
      "The site proposes direct, comparable packages with visual support so the user can move from initial motivation to concrete action."
    );

    const priceCards = qa(".price-card");
    const priceCopy = [
      ["Starter", "USD 39 / month", "Base access, open schedule and selected classes."],
      ["Performance", "USD 69 / month", "Full classes, follow-up and priority scheduling."],
      ["Drop-In", "USD 12 / session", "Single entry to try the space or complement your routine."]
    ];

    priceCards.forEach((card, index) => {
      const [title, price, body] = priceCopy[index];
      setText("strong", title, card);
      setText("span", price, card);
      setText("p", body, card);
    });

    setText(".contact-section .eyebrow", "Contact");
    setText(".contact-section h2", "A fitness brand with a strong close and a clear conversion path.");
    setText(".contact-section p", "This concept is built to move users toward a visit, a call or plan activation.");
    setText(".contact-section .button", "Request information");
    setText(".site-footer p", "Conceptual portfolio demo. Fictional fitness brand created to show visual energy and commercial structure.");
    setText(".site-footer a", "Back to portfolio");
  };

  const translateVertex = () => {
    document.title = "Vertex Legal | Advisory and litigation";
    setMetaDescription(
      "Vertex Legal is a conceptual portfolio demo: a legal firm with restrained presence, clear structure and a consultation-focused close."
    );
    setAttr(".nav-toggle", "aria-label", "Open menu");
    setAllText(".site-nav a", ["Services", "Approach", "Consultation"]);
    setText(".header-inner > .button", "Request consultation");
    setText(".hero-copy .eyebrow", "Corporate advisory and dispute resolution");
    setText(".hero-copy h1", "A legal firm presented with clarity, restraint and an immediate sense of trust.");
    setText(
      ".hero-copy p",
      "Vertex Legal is a site concept for high-level legal services. The goal is to demonstrate a serious structure, clear reading and a close oriented to consultation without looking old or rigid."
    );
    setAllText(".hero-actions a", ["View services", "Book meeting"]);

    const vertexCards = qa(".hero-card");

    if (vertexCards[0]) {
      setText("span", "Main practice", vertexCards[0]);
      setText("strong", "Corporate and regulatory", vertexCards[0]);
      setText("p", "Structured advisory for companies that need order, judgment and direct communication.", vertexCards[0]);
    }

    if (vertexCards[1]) {
      setText("span", "How we work", vertexCards[1]);
      setText("strong", "Clear analysis and strategy presented well", vertexCards[1]);
    }

    setText("#servicios .eyebrow", "Services");
    setText("#servicios h2", "Practice areas presented with order and a professional tone.");

    const serviceCards = qa(".service-card");
    const serviceCopy = [
      ["Corporate", "Corporate structures, key contracts, legal support and decisions backed by judgment."],
      ["Regulatory", "Compliance review, internal processes and a clear reading of operational risk."],
      ["Disputes", "Strategy, response and follow-up in controversies with restrained, precise communication."]
    ];

    serviceCards.forEach((card, index) => {
      const [title, body] = serviceCopy[index];
      setText("strong", title, card);
      setText("p", body, card);
    });

    setText(".focus-copy .eyebrow", "Approach");
    setText(".focus-copy h2", "Less visual noise, more sense of judgment.");
    setText(
      ".focus-copy p",
      "This demo uses a controlled visual tone, generous spacing, typography with weight and discreet calls to action to communicate authority without leaning on a cold or overly corporate site."
    );

    const focusArticles = qa(".focus-panel article");
    const focusCopy = [
      ["Immediate reading", "Short blocks, clear hierarchy and organized content for people who need to decide quickly."],
      ["Restrained presence", "Contained color, elegant rhythm and a visual language that feels truly professional."]
    ];

    focusArticles.forEach((article, index) => {
      const [title, body] = focusCopy[index];
      setText("strong", title, article);
      setText("p", body, article);
    });

    setText(".consultation .eyebrow", "Initial consultation");
    setText(".consultation h2", "Ready for a short call and a clear proposal.");
    setText(".consultation .button", "Request consultation");
    setText(".site-footer p", "Conceptual portfolio demo. Fictional firm created to show visual direction and service structure.");
    setText(".site-footer a", "Back to portfolio");
  };

  const translators = {
    "index.html": translatePortfolio,
    "demos/nativo-cafe/index.html": translateNativo,
    "demos/atelier-lumen/index.html": translateAtelier,
    "demos/blackline-auto/index.html": translateBlackline,
    "demos/solara-wellness/index.html": translateSolara,
    "demos/moss-studio/index.html": translateMoss,
    "demos/orbit-finance/index.html": translateOrbit,
    "demos/northpeak-realty/index.html": translateNorthpeak,
    "demos/pulse-fit/index.html": translatePulse,
    "demos/vertex-legal/index.html": translateVertex
  };

  const setToggleCopy = (toggle, language) => {
    const kicker = q(".language-toggle-kicker", toggle);
    const label = q(".language-toggle-label", toggle);

    if (language === "en") {
      if (kicker) {
        kicker.textContent = "Prefer Spanish?";
      }

      if (label) {
        label.textContent = "Click here.";
      }

      toggle.setAttribute("aria-label", "Switch site copy to Spanish");
      return;
    }

    if (kicker) {
      kicker.textContent = "You speak English?";
    }

    if (label) {
      label.textContent = "Don't worry, click here.";
    }

    toggle.setAttribute("aria-label", "Switch site copy to English");
  };

  const injectStyles = () => {
    if (q("#language-toggle-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "language-toggle-styles";
    style.textContent = `
      .language-toggle {
        position: fixed;
        right: max(1rem, env(safe-area-inset-right));
        bottom: calc(max(1rem, env(safe-area-inset-bottom)) + 0.35rem);
        z-index: 140;
        display: grid;
        gap: 0.1rem;
        max-width: min(320px, calc(100vw - 1.5rem));
        padding: 0.82rem 0.95rem;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 20px;
        background: rgba(6, 12, 21, 0.92);
        color: #f4f7fb;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
        backdrop-filter: blur(14px);
        cursor: pointer;
        text-align: left;
      }

      .language-toggle-kicker {
        color: #8eece4;
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .language-toggle-label {
        font-size: 0.92rem;
        font-weight: 700;
        line-height: 1.2;
      }

      @media (max-width: 720px) {
        .language-toggle {
          left: 0.75rem;
          right: 0.75rem;
          bottom: calc(max(0.75rem, env(safe-area-inset-bottom)) + 0.15rem);
          max-width: none;
          padding: 0.78rem 0.9rem;
        }
      }
    `;
    document.head.append(style);
  };

  const mountToggle = (language) => {
    let toggle = q(".language-toggle");

    if (!toggle) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "language-toggle";
      toggle.innerHTML = '<span class="language-toggle-kicker"></span><span class="language-toggle-label"></span>';
      toggle.addEventListener("click", () => {
        const current = window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "es";
        const next = current === "en" ? "es" : "en";
        window.localStorage.setItem(STORAGE_KEY, next);
        window.location.reload();
      });
      document.body.append(toggle);
    }

    setToggleCopy(toggle, language);
  };

  const init = () => {
    injectStyles();

    const language = window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "es";

    if (language === "en") {
      document.documentElement.lang = "en";
      translators[pagePath]?.();
    } else {
      document.documentElement.lang = "es";
    }

    mountToggle(language);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
