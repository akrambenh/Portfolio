const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

function updateIcons(isDark) {
  if (isDark) {
    sunIcon.style.display = "inline";
    moonIcon.style.display = "none";
  } else {
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline";
  }
}

function switchTheme(e) {
  const isDark = e.target.checked;
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateIcons(isDark);
}

toggleSwitch.addEventListener("change", switchTheme, false);

// Save user preference on load
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  const isDark = currentTheme === "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleSwitch.checked = isDark;
  updateIcons(isDark);
}

// ─── Scroll Animations (Intersection Observer) ───────────────────────────────

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Observe all animation elements
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale, .stagger-children').forEach(el => {
    observer.observe(el);
  });
});

// ─── Navbar Scroll Effect ────────────────────────────────────────────────────

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── Smooth hover tilt for project cards (optional) ─────────────────────────
// ─── Parallax effect on hero section ─────────────────────────────────────────

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.header-container');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.15}px)`;
    hero.style.opacity = Math.max(1 - scrolled / 500, 0.5);
  }
});
