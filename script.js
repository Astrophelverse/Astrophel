document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.2,
  };

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-up");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, options);
  sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
  });
});
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
});

// Animate elements on scroll
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero h2", {
  y: -100,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out",
});

gsap.from(".hero p", {
  y: 100,
  opacity: 0,
  delay: 0.3,
  duration: 1.2,
  ease: "power4.out",
});

gsap.from(".about", {
  scrollTrigger: ".about",
  y: 100,
  opacity: 0,
  duration: 1.5,
  ease: "power3.out"
});

gsap.from(".skills", {
  scrollTrigger: ".skills",
  y: 100,
  opacity: 0,
  duration: 1.5,
  ease: "power3.out"
});
gsap.from(".project-card", {
  scrollTrigger: ".projects",
  y: 100,
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
  ease: "power3.out"
});
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});
