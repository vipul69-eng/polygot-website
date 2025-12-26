// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

// ===========================
// LANGUAGE DETECTION FROM URL
// ===========================
function getLanguageFromURL() {
  const path = window.location.pathname;
  const match = path.match(/^\/(en|es|fr|de)(\/|$)/);
  return match ? match[1] : 'en';
}

// Initialize language from URL when page loads
document.addEventListener("DOMContentLoaded", () => {
  const urlLang = getLanguageFromURL();
  console.log('URL Language detected:', urlLang);
  
  const translator = document.getElementById("polygot") || document.querySelector("polygot-translator");
  const languageSelect = document.getElementById("languageSelect");
  const mobileLanguageSelect = document.getElementById("mobileLanguageSelect");
  
  // Set language on component
  function initLanguage() {
    if (translator && typeof translator.changeLanguage === 'function') {
      translator.changeLanguage(urlLang);
      if (languageSelect) languageSelect.value = urlLang;
      if (mobileLanguageSelect) mobileLanguageSelect.value = urlLang;
      console.log('Language initialized to:', urlLang);
    } else {
      // Retry if component not ready
      setTimeout(initLanguage, 100);
    }
  }
  
  initLanguage();
});

// ===========================
// CHANGE LANGUAGE WITH URL UPDATE
// ===========================
function changeLanguage(lang) {
  const translator = document.getElementById("polygot") || document.querySelector("polygot-translator");
  
  // Update URL
  const currentPath = window.location.pathname;
  const hasLangInPath = /^\/(en|es|fr|de)(\/|$)/.test(currentPath);
  
  let newPath;
  if (hasLangInPath) {
    newPath = currentPath.replace(/^\/(en|es|fr|de)/, `/${lang}`);
  } else {
    newPath = `/${lang}${currentPath}`;
  }
  
  window.history.pushState({}, '', newPath);
  
  // Update component
  console.log("Changing language to:", lang);
  if (translator && typeof translator.changeLanguage === "function") {
    translator.changeLanguage(lang);
  } else {
    console.warn("polygot-translator not ready or changeLanguage not found");
  }
  
  // Update dropdowns
  const languageSelect = document.getElementById("languageSelect");
  const mobileLanguageSelect = document.getElementById("mobileLanguageSelect");
  if (languageSelect) languageSelect.value = lang;
  if (mobileLanguageSelect) mobileLanguageSelect.value = lang;
}

// Language selector event listeners
document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("languageSelect");
  const mobileLanguageSelect = document.getElementById("mobileLanguageSelect");

  if (languageSelect) {
    languageSelect.addEventListener("change", function (event) {
      const lang = event.target.value;
      changeLanguage(lang);
    });
  }
  
  if (mobileLanguageSelect) {
    mobileLanguageSelect.addEventListener("change", function (event) {
      const lang = event.target.value;
      changeLanguage(lang);
    });
  }
});

// ===========================
// MOBILE MENU
// ===========================
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a");

mobileMenuToggle?.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

mobileMenuClose?.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    mobileMenu.classList.contains("active") &&
    !mobileMenu.contains(e.target) &&
    !mobileMenuToggle.contains(e.target)
  ) {
    mobileMenu.classList.remove("active");
  }
});

// ===========================
// SMOOTH SCROLLING
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.length > 1) {
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
      }
    }
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
  rootMargin: "0px 0px -100px 0px",
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
  ".feature-card, .use-case-card, .step"
);
animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ===========================
// NAVBAR BACKGROUND ON SCROLL
// ===========================
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.background = "rgba(255, 255, 255, 0.95)";
    nav.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  } else {
    nav.style.background = "rgba(255, 255, 255, 0.8)";
    nav.style.boxShadow = "none";
  }
});

// ===========================
// INITIALIZE LUCIDE ICONS ON DYNAMIC CONTENT
// ===========================
const initIcons = () => {
  lucide.createIcons();
};

setTimeout(initIcons, 100);
