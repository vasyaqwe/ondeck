const mobileNav = document.querySelector('.nav--mobile')
const mobileNavOpenBtn = document.querySelector('.toggle--nav-open')
const mobileNavCloseBtn = document.querySelector('.toggle--nav-close')
const mobileNavBtns = document.querySelectorAll('.nav--mobile__btn')
const mobileNavBackBtns = document.querySelectorAll('.toggle--back')
const desktopNav = document.querySelector('.nav--desktop')
const dropdownBg = document.querySelector('.dropdown-bg')
const desktopNavItems = document.querySelectorAll('.dropdown-trigger')

mobileNavOpenBtn.addEventListener('click', () => {
  mobileNav.setAttribute('data-visible', true)
  mobileNav.style.transition = 'max-height .3s ease-in-out, opacity .2s ease-in-out'
})
mobileNavCloseBtn.addEventListener('click', () => {
  mobileNav.setAttribute('data-visible', false)
  mobileNav.style.transition = 'max-height .2s ease-in-out, opacity .4s ease-in-out'
  document.querySelectorAll('.nav-panel').forEach(el => {
    setTimeout(() => el.setAttribute('data-visible', false), 400)
  })
})

mobileNavBtns.forEach(btn => btn.addEventListener('click', (e) => {
  const targetPanel = document.querySelector(`#${e.currentTarget.getAttribute('aria-controls')}`)
  targetPanel.setAttribute('data-visible', true)
}))
mobileNavBackBtns.forEach(btn => btn.addEventListener('click', (e) => {
  const targetPanel = document.querySelector(`#${e.currentTarget.getAttribute('aria-controls')}`)
  targetPanel.setAttribute('data-visible', false)
}))

function handleEnter(e) {
  const dropdown = e.target.querySelector('.nav__dropdown')
  const dropdownCoords = dropdown.getBoundingClientRect()
  const desktopNavCoords = desktopNav.getBoundingClientRect()
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - desktopNavCoords.top,
    left: dropdownCoords.left - desktopNavCoords.left
  }
  dropdownBg.style.setProperty('height', `${coords.height}px`)
  dropdownBg.style.setProperty('width', `${coords.width}px`)
  dropdownBg.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`)
  dropdownBg.style.setProperty('width', `${coords.width}px`)
  e.target.setAttribute('aria-expanded', true)
  dropdownBg.setAttribute('data-visible', true)
}

function handleLeave(e) {
  dropdownBg.setAttribute('data-visible', false)
  e.target.setAttribute('aria-expanded', false)
}

desktopNavItems.forEach(el => el.addEventListener('mouseenter', handleEnter))
desktopNavItems.forEach(el => el.addEventListener('mouseleave', handleLeave))