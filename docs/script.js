// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

function goBack() {
  window.history.back();
}
// ===========================
// MOBILE MENU
// ===========================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

mobileMenuBtn?.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeMenuBtn?.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

mobileNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    mobileMenu.classList.contains("active") &&
    !mobileMenu.contains(e.target) &&
    !mobileMenuBtn.contains(e.target)
  ) {
    mobileMenu.classList.remove("active");
  }
});

// ===========================
// SIDEBAR TOGGLE (MOBILE)
// ===========================
const sidebar = document.getElementById("sidebar");
const hamburger = document.querySelector(".mobile-menu-btn");

hamburger?.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.toggle("active");
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 900 &&
    sidebar.classList.contains("active") &&
    !sidebar.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    sidebar.classList.remove("active");
  }
});

// ===========================
// SMOOTH SCROLLING
// ===========================
const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const href = item.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Close sidebar on mobile
        if (window.innerWidth <= 900) {
          sidebar.classList.remove("active");
        }
      }
    }
  });
});

// ===========================
// ACTIVE SECTION HIGHLIGHTING
// ===========================
const sections = document.querySelectorAll("section[id]");
const sidebarNavItems = document.querySelectorAll(".nav-item");

function highlightActiveSection() {
  let current = "";
  const scrollPos = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });
  sidebarNavItems.forEach((item) => {
    item.classList.remove("active");
    const href = item.getAttribute("href");
    if (href === `#${current}`) {
      item.classList.add("active");
    }
  });
}
window.addEventListener("scroll", highlightActiveSection);
highlightActiveSection(); // Initial call
// ===========================
// BACK TO TOP BUTTON
// ===========================
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});
backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// ===========================
// COPY TO CLIPBOARD
// ===========================
const copyButtons = document.querySelectorAll("[data-copy]");
copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const textToCopy = button.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(textToCopy);

      // Visual feedback
      const originalHTML = button.innerHTML;
      button.innerHTML = '<i data-lucide="check"></i>';
      lucide.createIcons();

      setTimeout(() => {
        button.innerHTML = originalHTML;
        lucide.createIcons();
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  });
});
// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);
// Observe elements for animation
const animatedElements = document.querySelectorAll(
  ".feature-card, .command-section, .integration-card, .workflow-card"
);
animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});
// ===========================
// INITIALIZE LUCIDE ICONS ON DYNAMIC CONTENT
// ===========================
const initIcons = () => {
  lucide.createIcons();
};
// Call after DOM updates
setTimeout(initIcons, 100);
