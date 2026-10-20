// EnRoute site behaviour, shared by every page.
// Each block checks that its elements exist, so pages only run what they need.

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Swap the icon drawn inside an <svg><use href="#i-..."></svg>
function setIcon(svg, name) {
  svg.querySelector("use").setAttribute("href", "#i-" + name);
}

/* ----- Mobile menu (the ☰ button under 1050px wide) ----- */
const menuButton = $("#menuButton");
const navLinks = $("#navLinks");
if (menuButton && navLinks) {
  const setMenu = (open) => {
    navLinks.classList.toggle("open", open);
    setIcon($("svg", menuButton), open ? "close" : "menu");
  };
  menuButton.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  $$("a", navLinks).forEach((link) => link.addEventListener("click", () => setMenu(false)));
}

/* ----- Booking panel: tabs, round trip / one way, submit ----- */
const bookingPanel = $("#booking");
let selectService = () => {};
if (bookingPanel) {
  const tabs = $$('[role="tab"]', bookingPanel);
  const forms = $$(".booking-form", bookingPanel);
  const success = $("#requestSuccess");

  selectService = (id) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.service === id;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active);
    });
    forms.forEach((form) => { form.hidden = form.dataset.service !== id; });
    success.hidden = true;
  };
  tabs.forEach((tab) => tab.addEventListener("click", () => selectService(tab.dataset.service)));

  // One way trips don't need a return date
  const tripButtons = $$("#tripType button");
  const returnDate = $("#returnDate");
  tripButtons.forEach((button) => button.addEventListener("click", () => {
    tripButtons.forEach((b) => b.classList.toggle("active", b === button));
    const oneWay = button.textContent === "One way";
    returnDate.disabled = oneWay;
    returnDate.required = !oneWay;
  }));

  forms.forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    forms.forEach((f) => { f.hidden = true; });
    success.hidden = false;
  }));

  $("#editRequest").addEventListener("click", () => {
    selectService($('[role="tab"].active', bookingPanel).dataset.service);
  });
}

// Any button with data-book="flight|hotel|car|transfer" jumps to the booking panel
function scrollToBooking(service) {
  if (!bookingPanel) {
    window.location.href = "index.html#booking";
    return;
  }
  bookingPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => selectService(service), 400);
}
$$("[data-book]").forEach((button) => button.addEventListener("click", () => scrollToBooking(button.dataset.book)));

/* ----- FAQs: one answer open at a time ----- */
const faqItems = $$(".faq-item");
function setFaq(item, open) {
  item.classList.toggle("open", open);
  $("p", item).hidden = !open;
  $("i", item).textContent = open ? "−" : "+";
}
faqItems.forEach((item) => $("button", item).addEventListener("click", () => {
  const wasOpen = item.classList.contains("open");
  faqItems.forEach((other) => setFaq(other, false));
  if (!wasOpen) setFaq(item, true);
}));

/* ----- Popups (login, terms, policies) ----- */
const openModal = (modal) => { if (modal) modal.hidden = false; };
const closeModal = (modal) => { modal.hidden = true; };

$$(".modal-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("mousedown", (event) => {
    if (event.target === backdrop) closeModal(backdrop);
  });
  $$("[data-close-modal]", backdrop).forEach((button) => button.addEventListener("click", () => closeModal(backdrop)));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") $$(".modal-backdrop:not([hidden])").forEach(closeModal);
});

$$("[data-open-login]").forEach((button) => button.addEventListener("click", () => openModal($("#loginModal"))));

// "Create an account" → terms popup → sign up page once the box is ticked
$$("[data-open-terms]").forEach((button) => button.addEventListener("click", () => {
  $$(".modal-backdrop").forEach(closeModal);
  openModal($("#termsModal"));
}));
const agreeCheckbox = $("#agreeCheckbox");
const continueBtn = $("#continueBtn");
if (agreeCheckbox && continueBtn) {
  agreeCheckbox.addEventListener("change", () => { continueBtn.disabled = !agreeCheckbox.checked; });
  continueBtn.addEventListener("click", () => { window.location.href = "sign.html"; });
}

const policies = {
  privacy: {
    title: "Privacy policy",
    heading: "Your information",
    text: "EnRoute may collect names, contact details, account information and travel details to process requests, provide support and maintain booking history. Payment credentials should be handled by approved payment providers and never stored in frontend code.",
  },
  terms: {
    title: "Terms & conditions",
    heading: "Using our services",
    text: "Bookings remain subject to availability, price confirmation and the terms of airlines, hotels and other travel suppliers. Customers are responsible for accurate traveller information, documents and timely payment.",
  },
  refund: {
    title: "Refund & cancellation",
    heading: "Changes, cancellations and refunds",
    text: "Eligibility, timelines and fees depend on the fare or supplier terms attached to each booking. EnRoute will explain known conditions before confirmation and support customers when a supplier changes or cancels a service.",
  },
};
$$("[data-policy]").forEach((button) => button.addEventListener("click", () => {
  const policy = policies[button.dataset.policy];
  $("#policyTitle").textContent = policy.title;
  $("#policyHeading").textContent = policy.heading;
  $("#policyText").textContent = policy.text;
  openModal($("#policyModal"));
}));

/* ----- Floating "Ask EnRoute" assistant ----- */
const launcher = $("#assistantLauncher");
const assistantPanel = $("#assistantPanel");
if (launcher && assistantPanel) {
  const setAssistant = (open) => {
    assistantPanel.hidden = !open;
    setIcon($("svg", launcher), open ? "close" : "sparkle");
    $("span", launcher).hidden = open;
  };
  launcher.addEventListener("click", () => setAssistant(assistantPanel.hidden));
  $("#assistantClose").addEventListener("click", () => setAssistant(false));

  const actions = {
    chat: () => window.open("https://poe.com/EnRoute", "_blank", "noopener"),
    faq: () => { setAssistant(false); window.location.hash = "faq"; },
    support: () => window.open("https://wa.me/2348135458426", "_blank", "noopener"),
  };
  $$("[data-assistant]").forEach((button) => button.addEventListener("click", actions[button.dataset.assistant]));

  // Old ai.html links land on index.html#assistant
  if (window.location.hash === "#assistant") setAssistant(true);
}

/* ----- Contact form: show the thank-you message ----- */
const contactForm = $("#contactForm");
if (contactForm) {
  const contactSuccess = $(".contact-success", contactForm);
  const showSuccess = (sent) => {
    // The design shows the message as the form's first child (that is what
    // gives its text the small green capitals), and keeps it out of the way otherwise
    if (sent) contactForm.prepend(contactSuccess);
    else contactForm.append(contactSuccess);
    [...contactForm.children].forEach((child) => { child.hidden = sent ? child !== contactSuccess : child === contactSuccess; });
  };
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showSuccess(true);
  });
  $("#sendAnother").addEventListener("click", () => {
    contactForm.reset();
    showSuccess(false);
  });
}

/* ----- "Confirm password" boxes must match (sign up + reset pages) ----- */
$$("[data-match]").forEach((confirm) => {
  const original = $(confirm.dataset.match);
  const check = () => confirm.setCustomValidity(confirm.value === original.value ? "" : "Passwords do not match.");
  confirm.addEventListener("input", check);
  original.addEventListener("input", check);
});

/* ----- Footer year ----- */
$$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
