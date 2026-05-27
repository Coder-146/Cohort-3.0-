const searchInput = document.querySelector("#tea-search");
const clearButton = document.querySelector("#clear-search");
const chips = document.querySelectorAll("#chips button");
const header = document.querySelector(".site-header");
const heroImage = document.querySelector(".hero-image");
const originsImage = document.querySelector(".origins > img");

const revealTargets = document.querySelectorAll(
  ".intro h2, .section-heading, .product-card, .search-panel, .origins-content > *, .review-grid article, .wholesale img, .wholesale div > *, .latte-grid article, .journal-grid article, .site-footer > div"
);

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -70px 0px",
  }
);

revealTargets.forEach((element) => revealObserver.observe(element));

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    searchInput.value = chip.textContent.trim();
    searchInput.focus();
  });
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  chips.forEach((item) => item.classList.remove("active"));
  searchInput.focus();
});

function updateScrollAnimations() {
  const scrollY = window.scrollY;

  header.classList.toggle("scrolled", scrollY > 12);

  if (heroImage) {
    heroImage.style.setProperty("--hero-y", `${Math.min(scrollY * 0.08, 42)}px`);
  }

  if (originsImage) {
    const bounds = originsImage.parentElement.getBoundingClientRect();
    const offset = bounds.top * -0.05;
    originsImage.style.setProperty("--origin-y", `${Math.max(Math.min(offset, 38), -38)}px`);
  }
}

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollAnimations();
      ticking = false;
    });
    ticking = true;
  }
});

updateScrollAnimations();
