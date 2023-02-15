const mobileNav = document.querySelector('.nav--mobile')
const mobileNavList = document.querySelector('.nav--mobile__list')
const mobileNavOpenBtn = document.querySelector('.toggle--nav-open')
const mobileNavCloseBtn = document.querySelector('.toggle--nav-close')
const mobileNavBtns = document.querySelectorAll('.nav--mobile__btn')
const mobileNavBackBtn = document.querySelector('.toggle--back')
const desktopNav = document.querySelector('.nav--desktop')
const dropdownBg = document.querySelector('.dropdown-bg')
const desktopNavItems = document.querySelectorAll('.dropdown-trigger')
const mobileNavLogo = document.querySelector('.header--primary__logo--nav')
const navPanels = document.querySelectorAll('.nav-panel')

let initialMobileNavHeight = mobileNav.getBoundingClientRect().height

document.addEventListener('mousemove', (e) => {
  const bounds = dropdownBg.getBoundingClientRect()
  if (dropdownBg.getAttribute('data-visible') !== "true") {
    dropdownBg.style.setProperty('transform', `translate(${e.clientX - bounds.width}px, ${e.clientY}px)`)
  }
})
mobileNav.style.height = `${415.12}px`
mobileNavOpenBtn.addEventListener('click', () => {
  mobileNav.style.transition = 'max-height .4s ease-in-out, opacity .2s ease-in-out, visibility .2s, height .3s ease-in-out'
  mobileNav.setAttribute('data-visible', true)
  setTimeout(() => initialMobileNavHeight = mobileNav.getBoundingClientRect().height, 400)
})
mobileNavCloseBtn.addEventListener('click', () => {
  mobileNav.style.transition = 'max-height .2s ease-in-out, opacity .5s ease-in-out, visibility .2s, height .3s ease-in-out'
  mobileNav.style.setProperty('height', `${initialMobileNavHeight}px`)
  mobileNav.setAttribute('data-visible', false)
  document.querySelectorAll('.nav-panel').forEach(el => {
    setTimeout(() => {
      mobileNavList.setAttribute('data-visible', true)
      el.setAttribute('data-visible', false)
    }, 400)
  })
})

mobileNavBtns.forEach(btn => btn.addEventListener('click', (e) => {
  const targetPanel = document.querySelector(`#${e.currentTarget.getAttribute('aria-controls')}`)
  const newHeight = targetPanel.querySelector('.nav-panel__list').getBoundingClientRect().height
  mobileNavLogo.setAttribute('data-visible', false)
  targetPanel.setAttribute('data-visible', true)
  mobileNavBackBtn.setAttribute('data-visible', true)
  mobileNavList.setAttribute('data-visible', false)
  mobileNav.style.height = `${newHeight + 180}px`
}))

mobileNavBackBtn.addEventListener('click', (e) => {
  const targetPanel = [...navPanels].find(panel => panel.getAttribute('data-visible') === 'true')
  targetPanel.setAttribute('data-visible', false)
  e.currentTarget.setAttribute('data-visible', false)
  mobileNavLogo.setAttribute('data-visible', true)
  mobileNavList.setAttribute('data-visible', true)
  mobileNav.style.setProperty('height', `${initialMobileNavHeight}px`)
})

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
  e.target.setAttribute('aria-expanded', false)
  dropdownBg.setAttribute('data-visible', false)
}

desktopNavItems.forEach(el => el.addEventListener('mouseenter', handleEnter))
desktopNavItems.forEach(el => el.addEventListener('mouseleave', handleLeave))