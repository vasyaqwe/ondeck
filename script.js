const mobileNav = document.querySelector('.nav--mobile')
const mobileNavToggle = document.querySelector('.toggle--nav')

mobileNavToggle.addEventListener('click', (e) => {
  mobileNavToggle.setAttribute('aria-expanded', !mobileNav.hasAttribute('data-visible'))
  mobileNav.toggleAttribute('data-visible')
})