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
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale, .stagger-children').forEach(el => {
    observer.observe(el);
  });
});

// ─── Navbar Scroll Effect ────────────────────────────────────────────────────

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 64) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── Project Popup ──────────────────────────────────────────────────────────

const projects = {
  azzel: {
    image: 'assets/project/azzel_big.png',
    title: 'Azzel, Run & Bike',
    desc: 'Made for runners, by a runner. This app helps you track your runs and bike rides with ease.',
    tech: ['assets/flutter.png', 'assets/firebase.png']
  },
  dinney: {
    image: 'assets/project/dinney_big.png',
    title: 'Dinney — Food/Table Reservation Mobile Platform',
    desc: 'A complete dining platform consisting of two apps: a client-facing app for discovering restaurants and reserving tables, and a restaurant management app for handling orders, reservations, and table status in real-time. Powered by Supabase for live sync and authentication.',
    tech: ['assets/flutter.png', 'assets/supabase.svg']
  },
  sportify: {
    image: 'assets/project/sportify_big.png',
    title: 'Sportify',
    desc: 'Sport hobbiests like to read and to exchange info with medicals and experts. This app lets users connect and share their knowledge and experiences.',
    tech: ['assets/flutter.png', 'assets/firebase.png']
  },
  numidia: {
    image: 'assets/project/numidia_big.png',
    title: 'Numdia Pharma Food',
    desc: 'A corporate interface for a company specializing in industrial solutions for the pharmaceutical sector. Built with React and Supabase, with the full UI/UX designed in Figma.',
    tech: ['https://cdn.simpleicons.org/react', 'assets/supabase.svg', 'https://cdn.simpleicons.org/figma']
  }
};

function openProjectPopup(key) {
  const project = projects[key];
  if (!project) return;
  document.getElementById('projectPopupImage').src = project.image;
  document.getElementById('projectPopupTitle').textContent = project.title;
  document.getElementById('projectPopupDesc').textContent = project.desc;
  const techContainer = document.getElementById('projectPopupTech');
  techContainer.innerHTML = project.tech.map(src => `<img src="${src}" alt="Tech">`).join('');
  document.getElementById('projectModal').style.display = 'flex';
}

function closeProjectPopup() {
  document.getElementById('projectModal').style.display = 'none';
}

document.getElementById('projectModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('projectModal')) {
    closeProjectPopup();
  }
});
