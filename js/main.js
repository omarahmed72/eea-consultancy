const spinnerWrapperEl = document.querySelector(".spinner-wrapper");

window.addEventListener("load", () => {
  // spinnerWrapperEl.style.opacity = "0";
  setTimeout(() => {
    spinnerWrapperEl.style.display = "none";
  }, 2000);
});

document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbar = link.closest(".navbar");
    const toggle = navbar.querySelector(".navbar-toggler");
    const collapse = navbar.querySelector(".offcanvas");

    if (toggle && collapse && collapse.classList.contains("show")) {
      toggle.click(); // This triggers Bootstrap's own collapse and updates aria-expanded
      // Or manually:
      // toggle.setAttribute('aria-expanded', 'false');
      // toggle.classList.add('collapsed');
      // collapse.classList.remove('show');
    }
  });
});

// main.js - Scroll-Activated Number Counter
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter-value");
  const counterSection = document.querySelector(".counters");
  let started = false; // To ensure animation runs only once

  // Options
  const duration = 2500; // Total animation time in ms
  const easeOut = (t) => 1 - Math.pow(1 - t, 3); // Smooth easing

  function startCounter(element) {
    const target = parseInt(element.getAttribute("data-target"));
    const display = element.querySelector("span")
      ? element.firstChild
      : element;
    let startTime = null;

    function updateCounter(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOut(progress);
      const currentNumber = Math.floor(easedProgress * target);

      // Update text (preserve the + sign)
      if (element.querySelector("span")) {
        element.firstChild.textContent = currentNumber + " ";
      } else {
        element.textContent = currentNumber;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Final value with +
        if (element.querySelector("span")) {
          element.firstChild.textContent = target + " ";
        } else {
          element.textContent = target;
        }
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Partial visibility (trigger when 50% visible)
  function isPartiallyVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

    return vertInView && horInView;
  }

  function runCounters() {
    if (started) return;
    if (isPartiallyVisible(counterSection)) {
      started = true;
      counters.forEach((counter) => {
        // Add visible class for fade-in effect
        counter.closest(".counter").classList.add("visible");
        startCounter(counter);
      });
    }
  }

  // Run on scroll and initial load
  window.addEventListener("scroll", runCounters);
  window.addEventListener("load", runCounters);

  // Run once on load in case already in view
  runCounters();
});

// Global variable to track current theme
var theme = "LIGHT"; // default fallback

function darkmode() {
  var SetTheme = document.body;
  SetTheme.classList.toggle("dark-theme");
  var logo = document.getElementById("logo");
  var logo2 = document.getElementById("logo_2");

  if (SetTheme.classList.contains("dark-theme")) {
    console.log("Dark Theme Activated");
    theme = "DARK";
    // SetTheme.style.backgroundImage = "url(../imgs/bg.png)";
    SetTheme.style.background = "#0c0b2c";
    // SetTheme.style.backgroundImage = "url('../imgs/eeaDback.png')";

    if (logo) logo.src = "imgs/png.png";
    if (logo2) logo2.src = "imgs/png.png";
  } else {
    console.log("Light Theme Activated");
    theme = "LIGHT";
    // SetTheme.style.backgroundImage = "url(../imgs/back.png)";
    //  SetTheme.style.backgroundColor = "#ffffff";
    SetTheme.style.background = "url('../imgs/eeaBack.png')";

    if (logo) logo.src = "imgs/logo-0١.png";
    if (logo2) logo2.src = "imgs/logo-0١.png";
  }

  // Save user's choice (this overrides system preference)
  try {
    localStorage.setItem("PageTheme", theme);
  } catch (e) {
    console.warn("Could not persist theme to localStorage:", e);
  }
}

// Apply theme on page load — with system preference support
document.addEventListener("DOMContentLoaded", function () {
  var SetTheme = document.body;
  var logo = document.getElementById("logo");
  var logo2 = document.getElementById("logo_2");

  function applyAssets(theme) {
    if (theme === "DARK") {
      // SetTheme.style.backgroundImage = "url(../imgs/bg.png)";
      SetTheme.style.background = "#0c0b2c";
      // SetTheme.style.backgroundImage = "url('../imgs/eeaDback.png')";

      if (logo) logo.src = "imgs/png.png";
      if (logo2) logo2.src = "imgs/png.png";
    } else {
      // SetTheme.style.backgroundImage = "url(../imgs/back.png)";
      //  SetTheme.style.backgroundColor = "#ffffff";
      SetTheme.style.background = "url('../imgs/eeaBack.png')";

      if (logo) logo.src = "imgs/logo-0١.png";
      if (logo2) logo2.src = "imgs/logo-0١.png";
    }
  }

  try {
    var saved = localStorage.getItem("PageTheme");

    if (saved === "DARK" || saved === "LIGHT") {
      // User has chosen before → respect their choice
      theme = saved;
      console.log("Saved Theme is: " + theme);

      if (theme === "DARK") {
        SetTheme.classList.add("dark-theme");
      } else {
        SetTheme.classList.remove("dark-theme");
      }
      applyAssets(theme);
    } else {
      // First time visit → follow system preference
      var systemPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (systemPrefersDark) {
        theme = "DARK";
        SetTheme.classList.add("dark-theme");
        console.log("System prefers DARK → Applied Dark Theme");
      } else {
        theme = "LIGHT";
        SetTheme.classList.remove("dark-theme");
        console.log("System prefers LIGHT → Applied Light Theme");
      }
      applyAssets(theme);

      // Optional: Save system choice so it doesn't flicker on next load
      localStorage.setItem("PageTheme", theme);
    }
  } catch (e) {
    console.warn("Error reading/applying theme:", e);
  }
});

// Optional: Live update if user changes system theme while on page
if (window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      try {
        var saved = localStorage.getItem("PageTheme");
        // Only auto-change if user never manually picked a theme
        if (!saved || (saved !== "DARK" && saved !== "LIGHT")) {
          if (e.matches) {
            document.body.classList.add("dark-theme");
            document.body.style.backgroundImage = "url(../imgs/bg.png)";
            if (document.getElementById("logo"))
              document.getElementById("logo").src = "imgs/png.png";
            console.log("System changed to Dark");
          } else {
            document.body.classList.remove("dark-theme");
            document.body.style.backgroundImage = "url(../imgs/back.png)";
            if (document.getElementById("logo"))
              document.getElementById("logo").src = "imgs/logo-0١.png";
            console.log("System changed to Light");
          }
        }
      } catch (e) {
        console.warn("Error on system theme change:", e);
      }
    });
}
