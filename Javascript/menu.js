const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

console.log("menu connected");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});