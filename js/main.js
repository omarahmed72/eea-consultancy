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
