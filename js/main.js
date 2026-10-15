/* Zawiyah Studio: small shared script for every page. */
(function () {
  "use strict";

  /* ---------- Mobile menu toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.setAttribute("data-open", String(open));
    }

    setOpen(false);

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Escape closes the menu and returns focus to the button
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll animations ----------
     The inline script in <head> adds .motion only when the browser supports
     IntersectionObserver and the visitor has not asked for reduced motion. */
  var root = document.documentElement;
  var motion = root.classList.contains("motion");

  if (motion) {
    window.zwReveal = true; // tells the <head> failsafe that animations are running

    var revealEls = document.querySelectorAll("[data-reveal]");

    function reveal(el) {
      el.classList.add("is-visible");
      if (observer) observer.unobserve(el);
    }

    var observer = new IntersectionObserver(function (entries) {
      var n = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Stagger items that arrive together; nested items inherit their parent's delay
        if (!el.parentElement.closest("[data-reveal]")) {
          el.style.setProperty("--i", Math.min(n++, 5));
        }
        reveal(el);
      });
    }, { rootMargin: "0px 0px -10% 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });

    // Keyboard users: anything that receives focus appears at once
    document.addEventListener("focusin", function (e) {
      var el = e.target.closest ? e.target.closest("[data-reveal]") : null;
      while (el) {
        el.style.setProperty("--i", 0);
        reveal(el);
        el = el.parentElement.closest("[data-reveal]");
      }
    });

    // Thin progress bar along the top edge
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    var ticking = false;
    function updateBar() {
      var max = root.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(updateBar); }
    }, { passive: true });
    updateBar();
  }

  /* ---------- Gallery filters ---------- */
  var filterBar = document.querySelector(".filter-bar");

  if (filterBar) {
    var buttons = filterBar.querySelectorAll(".filter-btn");
    var items = document.querySelectorAll(".gallery-item");
    var status = filterBar.querySelector(".gallery-status");

    filterBar.hidden = false;

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;

      var filter = btn.getAttribute("data-filter");
      var shown = 0;

      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });

      items.forEach(function (item) {
        var match = filter === "all" || item.getAttribute("data-category") === filter;
        item.hidden = !match;
        if (!match) return;
        if (motion) {
          // show at once (no waiting for scroll) and replay a short pop-in
          item.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("is-visible"); });
          item.classList.add("is-visible");
          item.classList.remove("pop");
          void item.offsetWidth; // restart the animation
          item.style.setProperty("--i", Math.min(shown, 8));
          item.classList.add("pop");
        }
        shown++;
      });

      // Announce the result for screen reader users
      if (status) {
        status.textContent = "Showing " + shown + " " + (shown === 1 ? "piece" : "pieces") + ": " + btn.textContent;
      }
    });
  }

  /* ---------- Contact form (demo only: nothing is sent) ---------- */
  var form = document.getElementById("contact-form");

  if (form) {
    var result = document.getElementById("form-result");
    var checks = [
      { id: "name", message: "Please enter your name." },
      { id: "email", message: "Please enter an email address like name@example.com." },
      { id: "message", message: "Please write a short message." }
    ];

    // JS takes over validation so errors appear as readable text next to each field
    form.setAttribute("novalidate", "");

    function validate(field, check) {
      var ok = field.checkValidity() && field.value.trim() !== "";
      var error = document.getElementById(check.id + "-error");
      field.setAttribute("aria-invalid", String(!ok));
      error.textContent = ok ? "" : check.message;
      return ok;
    }

    // Clear an error as soon as the person fixes it
    checks.forEach(function (check) {
      var field = document.getElementById(check.id);
      field.addEventListener("input", function () {
        if (field.getAttribute("aria-invalid") === "true") validate(field, check);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;

      checks.forEach(function (check) {
        var field = document.getElementById(check.id);
        if (!validate(field, check) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        result.textContent = "";
        firstInvalid.focus();
        return;
      }

      var name = document.getElementById("name").value.trim();
      result.innerHTML = "";
      var box = document.createElement("p");
      box.className = "notice notice--success";
      box.textContent = "Thank you, " + name + "! This is a demo, so your message was not sent anywhere.";
      result.appendChild(box);
      form.reset();
      checks.forEach(function (check) {
        document.getElementById(check.id).removeAttribute("aria-invalid");
      });
      result.focus();
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
