const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.textContent = "☾";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeToggle.textContent = isLight ? "☾" : "☀";
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const typingTarget = document.getElementById("typing-text");
const phrases = [
  "cybersecurity",
  "cloud computing",
  "network security",
  "IoT systems",
  "secure software",
  "continuous learning"
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  typingTarget.textContent = deleting
    ? phrase.slice(0, charIndex--)
    : phrase.slice(0, charIndex++);

  if (!deleting && charIndex > phrase.length) {
    deleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }

  if (deleting && charIndex < 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
  }

  setTimeout(typeLoop, deleting ? 45 : 80);
}
typeLoop();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const modal = document.getElementById("certificate-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");

document.querySelectorAll(".certificate-card").forEach(card => {
  card.addEventListener("click", () => {
    modalImage.src = card.dataset.image;
    modalImage.alt = `${card.dataset.title} certificate`;
    modalTitle.textContent = card.dataset.title;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  modalImage.src = "";
}

document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});

document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const bodyText = `Hello Mahrcus,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
  window.location.href = `mailto:mldusisa@gmail.com?subject=${encodeURIComponent(subject)}&body=${bodyText}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
