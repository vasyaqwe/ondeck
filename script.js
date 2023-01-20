const mobileNav = document.querySelector('.nav--mobile')
const mobileNavToggle = document.querySelector('.toggle--nav')
const mobileNavBtns = document.querySelectorAll('.nav--mobile__btn')
const navPanelsContainer = document.querySelector('.nav-panels')

mobileNavToggle.addEventListener('click', (e) => {
  mobileNavToggle.setAttribute('aria-expanded', !mobileNav.hasAttribute('data-visible'))
  mobileNav.toggleAttribute('data-visible')
})
mobileNavBtns.forEach(btn => btn.addEventListener('click', (e) => {
  const targetPanel = document.querySelector(`#${e.target.getAttribute('aria-controls')}`)
  navPanelsContainer.setAttribute('data-visible', true)
  targetPanel.setAttribute('data-visible', true)
}))