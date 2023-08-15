const navLinks = document.getElementById("menu-container");
const body = document.querySelector("body");
const buttonMenu = () => {
  navLinks.classList.toggle("active");
  body.classList.toggle("no-scroll");
};
