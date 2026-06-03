const internalLinks = document.querySelectorAll('a[href^="#"]');
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function smoothScrollTo(targetY, duration = 820) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    const target = id && document.querySelector(id);

    if (!target || reducedMotion.matches) {
      return;
    }

    event.preventDefault();
    smoothScrollTo(target.getBoundingClientRect().top + window.scrollY);
    history.pushState(null, "", id);
  });
});
