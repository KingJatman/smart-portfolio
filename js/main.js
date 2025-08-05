// Main JavaScript file for portfolio website

// DOM Elements
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const themeToggle = document.getElementById("theme-toggle")
const scrollTopBtn = document.getElementById("scroll-top")

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  initializeNavigation()
  initializeScrollEffects()
  initializeAnimations()
  highlightActiveNavLink()
})

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  const themeIcon = document.querySelector(".theme-toggle__icon")

  document.documentElement.setAttribute("data-theme", savedTheme)
  themeIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙"

  themeToggle.addEventListener("click", toggleTheme)
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"
  const themeIcon = document.querySelector(".theme-toggle__icon")

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙"
}

// Navigation Management
function initializeNavigation() {
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleMobileMenu)

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav__link")
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu)
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeMobileMenu()
      }
    })
  }
}

function toggleMobileMenu() {
  navMenu.classList.toggle("show")
  navToggle.classList.toggle("active")
}

function closeMobileMenu() {
  navMenu.classList.remove("show")
  navToggle.classList.remove("active")
}

// Scroll Effects
function initializeScrollEffects() {
  // Scroll to top button
  window.addEventListener("scroll", handleScroll)

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", scrollToTop)
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Show/hide scroll to top button
  if (scrollTopBtn) {
    if (scrollTop > 300) {
      scrollTopBtn.classList.add("show")
    } else {
      scrollTopBtn.classList.remove("show")
    }
  }

  // Add shadow to header on scroll
  const header = document.querySelector(".header")
  if (scrollTop > 0) {
    header.style.boxShadow = "var(--shadow)"
  } else {
    header.style.boxShadow = "none"
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Animation Management
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".skill-card, .project-card, .timeline__item, .contact-item")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })
}

// Navigation Link Highlighting
function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav__link")

  navLinks.forEach((link) => {
    link.classList.remove("nav__link--active")
    const linkHref = link.getAttribute("href")

    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "index.html") ||
      (currentPage === "index.html" && linkHref === "index.html")
    ) {
      link.classList.add("nav__link--active")
    }
  })
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Form Utilities (used across multiple pages)
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showError(inputElement, message) {
  const errorElement = document.getElementById(inputElement.id + "-error")
  if (errorElement) {
    errorElement.textContent = message
    inputElement.classList.add("error")
  }
}

function clearError(inputElement) {
  const errorElement = document.getElementById(inputElement.id + "-error")
  if (errorElement) {
    errorElement.textContent = ""
    inputElement.classList.remove("error")
  }
}

// Local Storage Utilities
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return false
  }
}

function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return null
  }
}

// Export functions for use in other files
window.portfolioUtils = {
  validateEmail,
  showError,
  clearError,
  saveToLocalStorage,
  loadFromLocalStorage,
  debounce,
  throttle,
}
