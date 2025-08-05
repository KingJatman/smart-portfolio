// Contact form JavaScript

// DOM Elements
const contactForm = document.getElementById("contact-form")
const successModal = document.getElementById("success-modal")
const successModalClose = document.getElementById("success-modal-close")

// Form fields
const nameField = document.getElementById("name")
const emailField = document.getElementById("email")
const subjectField = document.getElementById("subject")
const messageField = document.getElementById("message")

// Utility functions
const portfolioUtils = {
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },
  showError: (field, errorMessage) => {
    const errorElement = document.createElement("div")
    errorElement.className = "error"
    errorElement.textContent = errorMessage
    field.parentNode.appendChild(errorElement)
  },
  clearError: (field) => {
    const errorElement = field.parentNode.querySelector(".error")
    if (errorElement) {
      field.parentNode.removeChild(errorElement)
    }
  },
  saveToLocalStorage: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
  },
  loadFromLocalStorage: (key) => JSON.parse(localStorage.getItem(key) || "{}"),
}

// Initialize contact page
document.addEventListener("DOMContentLoaded", () => {
  initializeContactForm()
  initializeSuccessModal()
  loadFormDraft()
})

// Initialize contact form
function initializeContactForm() {
  if (!contactForm) return

  contactForm.addEventListener("submit", handleFormSubmit)

  // Real-time validation
  const formFields = [nameField, emailField, messageField]
  formFields.forEach((field) => {
    if (field) {
      field.addEventListener("blur", () => validateField(field))
      field.addEventListener("input", () => {
        portfolioUtils.clearError(field)
        saveFormDraft()
      })
    }
  })

  // Save draft on subject field change
  if (subjectField) {
    subjectField.addEventListener("input", saveFormDraft)
  }
}

// Handle form submission
async function handleFormSubmit(e) {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  // Show loading state
  submitButton.disabled = true
  submitButton.innerHTML = '<span class="loading"></span> Sending...'

  try {
    // Simulate form submission (replace with actual API call)
    await simulateFormSubmission()

    // Show success modal
    showSuccessModal()

    // Clear form and draft
    contactForm.reset()
    clearFormDraft()
  } catch (error) {
    console.error("Form submission error:", error)
    alert("There was an error sending your message. Please try again.")
  } finally {
    // Reset button state
    submitButton.disabled = false
    submitButton.textContent = originalText
  }
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Save form data to localStorage for demo purposes
      const formData = {
        name: nameField.value,
        email: emailField.value,
        subject: subjectField.value,
        message: messageField.value,
        timestamp: new Date().toISOString(),
      }

      const submissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]")
      submissions.push(formData)
      localStorage.setItem("formSubmissions", JSON.stringify(submissions))

      resolve()
    }, 2000) // Simulate network delay
  })
}

// Validate entire form
function validateForm() {
  let isValid = true

  // Validate name
  if (!validateField(nameField)) {
    isValid = false
  }

  // Validate email
  if (!validateField(emailField)) {
    isValid = false
  }

  // Validate message
  if (!validateField(messageField)) {
    isValid = false
  }

  return isValid
}

// Validate individual field
function validateField(field) {
  if (!field) return true

  const value = field.value.trim()
  let isValid = true
  let errorMessage = ""

  switch (field.id) {
    case "name":
      if (!value) {
        errorMessage = "Name is required"
        isValid = false
      } else if (value.length < 2) {
        errorMessage = "Name must be at least 2 characters"
        isValid = false
      }
      break

    case "email":
      if (!value) {
        errorMessage = "Email is required"
        isValid = false
      } else if (!portfolioUtils.validateEmail(value)) {
        errorMessage = "Please enter a valid email address"
        isValid = false
      }
      break

    case "message":
      if (!value) {
        errorMessage = "Message is required"
        isValid = false
      } else if (value.length < 10) {
        errorMessage = "Message must be at least 10 characters"
        isValid = false
      }
      break
  }

  if (!isValid) {
    portfolioUtils.showError(field, errorMessage)
  } else {
    portfolioUtils.clearError(field)
  }

  return isValid
}

// Initialize success modal
function initializeSuccessModal() {
  if (successModalClose) {
    successModalClose.addEventListener("click", closeSuccessModal)
  }

  if (successModal) {
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) {
        closeSuccessModal()
      }
    })
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && successModal && successModal.classList.contains("show")) {
      closeSuccessModal()
    }
  })
}

// Show success modal
function showSuccessModal() {
  if (successModal) {
    successModal.classList.add("show")
    document.body.style.overflow = "hidden"
  }
}

// Close success modal
function closeSuccessModal() {
  if (successModal) {
    successModal.classList.remove("show")
    document.body.style.overflow = "auto"
  }
}

// Save form draft to localStorage
function saveFormDraft() {
  const formData = {
    name: nameField?.value || "",
    email: emailField?.value || "",
    subject: subjectField?.value || "",
    message: messageField?.value || "",
  }

  portfolioUtils.saveToLocalStorage("contactFormDraft", formData)
}

// Load form draft from localStorage
function loadFormDraft() {
  const draft = portfolioUtils.loadFromLocalStorage("contactFormDraft")

  if (draft) {
    if (nameField) nameField.value = draft.name || ""
    if (emailField) emailField.value = draft.email || ""
    if (subjectField) subjectField.value = draft.subject || ""
    if (messageField) messageField.value = draft.message || ""
  }
}

// Clear form draft from localStorage
function clearFormDraft() {
  localStorage.removeItem("contactFormDraft")
}

// Make functions globally available
window.showSuccessModal = showSuccessModal
window.closeSuccessModal = closeSuccessModal
