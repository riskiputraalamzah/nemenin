/* ========================================
   NEMENIN — Landing Page JavaScript
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Navbar scroll effect ----------
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ---------- Mobile nav drawer ----------
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  const mobileLinks = mobileNav
    ? mobileNav.querySelectorAll(".mobile-nav-link")
    : [];

  function openMobileNav() {
    if (mobileNav) mobileNav.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (menuBtn) menuBtn.addEventListener("click", openMobileNav);
  if (closeBtn) closeBtn.addEventListener("click", closeMobileNav);
  if (backdrop) backdrop.addEventListener("click", closeMobileNav);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // ---------- Scroll reveal with Intersection Observer ----------
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ---------- Counter animation ----------
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-count"));
          let current = 0;
          const increment = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current.toLocaleString("id-ID");
          }, 25);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => counterObserver.observe(c));

  // ---------- Typewriter effect ----------
  const typewriterEl = document.getElementById("typewriter-text");
  if (typewriterEl) {
    const phrases = [
      "merasa ditemani",
      "didengarkan",
      "berbagi cerita",
      "tidak sendirian",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typewrite() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(typewrite, delay);
    }

    typewrite();
  }

  // ---------- Shield checklist scroll animation ----------
  const shieldList = document.getElementById("shield-list");
  if (shieldList) {
    const shieldObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = shieldList.querySelectorAll(".shield-item");
            items.forEach((item, index) => {
              const delay = parseInt(item.getAttribute("data-delay") || 0);
              setTimeout(() => item.classList.add("visible"), delay);
            });
            shieldObserver.unobserve(shieldList);
          }
        });
      },
      { threshold: 0.3 },
    );
    shieldObserver.observe(shieldList);
  }
  // ---------- Chat bubble animation on scroll ----------
  const chatDemo = document.getElementById("chat-demo");
  if (chatDemo) {
    const chatObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chatDemo
              .querySelectorAll(".chat-bubble, .typing-indicator")
              .forEach((el) => {
                el.classList.add("animate");
              });
            chatObserver.unobserve(chatDemo);
          }
        });
      },
      { threshold: 0.3 },
    );
    chatObserver.observe(chatDemo);
  }

  // ---------- Parallax on scroll ----------
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length) {
    let ticking = false;

    // Only enable parallax on desktop (width > 768px) to improve mobile performance
    if (window.innerWidth > 768) {
      window.addEventListener("scroll", () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            parallaxEls.forEach((el) => {
              const speed = parseFloat(el.dataset.parallax) || 0;
              el.style.transform = `translateY(${scrollY * speed}px)`;
            });
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  }

  // ---------- Step items sequential reveal ----------
  const stepsFlow = document.querySelector(".steps-flow");
  if (stepsFlow) {
    const stepsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = stepsFlow.querySelectorAll(".step-item");
            steps.forEach((step, i) => {
              setTimeout(() => step.classList.add("visible"), i * 250);
            });
            stepsObserver.unobserve(stepsFlow);
          }
        });
      },
      { threshold: 0.2 },
    );
    stepsObserver.observe(stepsFlow);
  }

  // ---------- Pricing card 3D tilt ----------
  document.querySelectorAll(".pricing-card-enhanced").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
  // ---------- Counter animation ----------
  const counterEls = document.querySelectorAll(".counter-number");
  if (counterEls.length) {
    const formatNumber = (num, suffix) => {
      if (num >= 1000000)
        return (num / 1000000).toFixed(2).replace(".", ",") + " jt" + suffix;
      return num.toLocaleString("id-ID") + suffix;
    };

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const duration = 2000;
      const start = performance.now();

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(ease * target);
        el.textContent = formatNumber(current, suffix);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counterEls.forEach((el) => counterObserver.observe(el));
  }
});

// ---------- FAQ Toggle (global) ----------
function toggleFaq(btn) {
  const faqItem = btn.closest(".faq-item");
  const wasActive = faqItem.classList.contains("active");

  // Close all siblings
  document.querySelectorAll(".faq-item.active").forEach((item) => {
    item.classList.remove("active");
  });

  // Toggle clicked
  if (!wasActive) {
    faqItem.classList.add("active");
  }
}

// ---------- Cursor Glow (desktop only) ----------
(function () {
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

  const glow = document.createElement("div");
  glow.id = "cursor-glow";
  glow.style.cssText = `
        position: fixed;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(224,122,95,0.07) 0%, rgba(224,122,95,0.03) 40%, transparent 70%);
        pointer-events: none;
        z-index: 1;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.4s ease;
    `;
  document.body.appendChild(glow);

  let mouseX = 0,
    mouseY = 0;
  let glowX = 0,
    glowY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });

  function updateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + "px";
    glow.style.top = glowY + "px";
    requestAnimationFrame(updateGlow);
  }
  requestAnimationFrame(updateGlow);
})();

// ---------- Magnetic Buttons ----------
document.querySelectorAll(".btn-primary, .nav-cta-btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    btn.style.transition = "transform 0.15s ease";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
    btn.style.transition = "transform 0.3s ease";
  });
});
