const hamburgerMenu = document.getElementById("hamburger-menu")
const navbarLinks = document.getElementById("navbar-links")

// Klik hamburger menu untuk menampilkan/menghilangkan navigation
hamburgerMenu.addEventListener("click", () => {
  navbarLinks.classList.toggle("hidden")
})

// Klik diluar navigation untuk menghilangkan navigation hamburger
document.addEventListener("click", function(e) {
  if(!hamburgerMenu.contains(e.target) && !navbarLinks.contains(e.target)) {
    navbarLinks.classList.add("hidden")
  }
})

// Scroll untuk menghilangkan navigation hamburger
document.addEventListener("scroll", function() {
  navbarLinks.classList.add("hidden")
})