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
  updateIcons(isDark); // Set icons correctly on load
}
