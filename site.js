/* Sun Rise by Abeeha's — site behaviour. No dependencies. ~2 KB.
   Everything here is progressive: the site works with JavaScript disabled. */
(function () {
  "use strict";

  var WHATSAPP = "923056745624"; // EDIT: international format, no + or spaces

  /* --- Mobile navigation -------------------------------------------------- */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      nav.setAttribute("data-open", String(!open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        burger.setAttribute("aria-expanded", "false");
        nav.setAttribute("data-open", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        burger.setAttribute("aria-expanded", "false");
        nav.setAttribute("data-open", "false");
        burger.focus();
      }
    });
  }

  /* --- Reveal on scroll --------------------------------------------------- */
  var reveals = document.querySelectorAll(".rise");
  if (reveals.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* --- Gallery filter ----------------------------------------------------- */
  var filters = document.querySelector(".filters");
  if (filters) {
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      var want = btn.dataset.filter;
      filters.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      document.querySelectorAll(".shot").forEach(function (shot) {
        shot.hidden = !(want === "all" || shot.dataset.cat === want);
      });
    });
  }

  /* --- Gallery lightbox --------------------------------------------------- */
  var box = document.getElementById("lightbox");
  if (box && typeof box.showModal === "function") {
    var boxImg = box.querySelector(".lightbox__body > *:first-child");
    var boxCap = box.querySelector("[data-caption]");
    document.querySelectorAll(".shot").forEach(function (shot) {
      shot.addEventListener("click", function () {
        var src = shot.querySelector(".ph, img");
        if (src) { boxImg.className = src.className; boxImg.textContent = src.textContent || ""; }
        boxCap.textContent = shot.dataset.caption || "";
        box.showModal();
      });
    });
    box.querySelector("[data-close]").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  }

  /* --- Booking forms open a pre-filled WhatsApp message -------------------
     No server needed. The salon receives the enquiry as a normal chat.
     ----------------------------------------------------------------------- */
  document.querySelectorAll("form[data-whatsapp]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var lines = ["Assalam-o-Alaikum! I would like to book an appointment."];
      var labels = { name: "Name", phone: "Phone", service: "Service", date: "Preferred date", time: "Preferred time", notes: "Notes" };
      Object.keys(labels).forEach(function (k) {
        var v = (d.get(k) || "").toString().trim();
        if (v) lines.push(labels[k] + ": " + v);
      });
      window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
      var note = form.querySelector("[data-sent]");
      if (note) note.textContent = "Opening WhatsApp — press send to finish your booking.";
    });
  });

  /* --- Current year ------------------------------------------------------- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
