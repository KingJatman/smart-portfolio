// Projects page JavaScript

// Project data
const projectsData = [
  {
    id: 1,
    title: "Responsive Landing Page",
    description:
      "A modern, responsive landing page built with HTML5, CSS3, and vanilla JavaScript. Features smooth animations and mobile-first design.",
    image: "/placeholder.svg?height=200&width=350",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    category: ["html-css", "responsive"],
    technologies: ["HTML5", "CSS3", "JavaScript ES6", "Flexbox", "CSS Grid"],
    features: [
      "Fully responsive design",
      "Smooth scroll animations",
      "Mobile-first approach",
      "Cross-browser compatibility",
      "Optimized performance",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Interactive Todo App",
    description:
      "A fully functional todo application with local storage, drag & drop functionality, and theme switching capabilities.",
    image: "/placeholder.svg?height=200&width=350",
    tags: ["JavaScript", "Local Storage", "DOM"],
    category: ["javascript"],
    technologies: ["JavaScript ES6", "HTML5", "CSS3", "Local Storage API", "Drag & Drop API"],
    features: [
      "Add, edit, and delete tasks",
      "Drag and drop reordering",
      "Local storage persistence",
      "Filter by status",
      "Dark/light theme toggle",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing projects and skills with responsive design and smooth animations.",
    image: "/placeholder.svg?height=200&width=350",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    category: ["html-css", "javascript", "responsive"],
    technologies: ["HTML5", "CSS3", "JavaScript", "CSS Grid", "Flexbox", "CSS Animations"],
    features: [
      "Multi-page navigation",
      "Responsive grid layouts",
      "Contact form validation",
      "Smooth scroll effects",
      "Mobile-optimized design",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "A weather application that fetches real-time weather data and displays it with beautiful UI components.",
    image: "/placeholder.svg?height=200&width=350",
    tags: ["JavaScript", "API", "Responsive"],
    category: ["javascript", "responsive"],
    technologies: ["JavaScript ES6", "Fetch API", "CSS3", "HTML5", "Weather API"],
    features: [
      "Real-time weather data",
      "5-day forecast",
      "Location search",
      "Responsive design",
      "Weather icons and animations",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "CSS Grid Gallery",
    description: "An image gallery built with CSS Grid featuring lightbox functionality and responsive masonry layout.",
    image: "/placeholder.svg?height=200&width=350",
    tags: ["HTML", "CSS", "JavaScript"],
    category: ["html-css", "javascript"],
    technologies: ["HTML5", "CSS Grid", "JavaScript", "CSS Transitions"],
    features: [
      "Masonry grid layout",
      "Lightbox modal",
      "Image lazy loading",
      "Keyboard navigation",
      "Touch gesture support",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Calculator App",
    description:
      "A functional calculator application with keyboard support and memory functions built with vanilla JavaScript.",
    image: "/placeholder.svg?height=200&width=350",
    tags: ["JavaScript", "DOM"],
    category: ["javascript"],
    technologies: ["JavaScript ES6", "HTML5", "CSS3", "Event Handling"],
    features: [
      "Basic arithmetic operations",
      "Keyboard input support",
      "Memory functions",
      "Error handling",
      "Responsive button layout",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
]

// DOM Elements
const projectsContainer = document.getElementById("projects-container")
const filterButtons = document.querySelectorAll(".filter-btn")
const modal = document.getElementById("project-modal")
const modalClose = document.getElementById("modal-close")
const modalBody = document.getElementById("modal-body")

// Initialize projects page
document.addEventListener("DOMContentLoaded", () => {
  renderProjects(projectsData)
  initializeFilters()
  initializeModal()
})

// Render projects
function renderProjects(projects) {
  if (!projectsContainer) return

  projectsContainer.innerHTML = ""

  projects.forEach((project, index) => {
    const projectCard = createProjectCard(project)
    projectsContainer.appendChild(projectCard)

    // Add staggered animation delay
    setTimeout(() => {
      projectCard.classList.add("fade-in")
    }, index * 100)
  })
}

// Create project card element
function createProjectCard(project) {
  const card = document.createElement("div")
  card.className = "project-card"
  card.setAttribute("data-category", project.category.join(" "))

  card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-card__image" loading="lazy">
        <div class="project-card__content">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            <div class="project-card__tags">
                ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
            </div>
            <div class="project-card__buttons">
                <button class="btn btn--primary btn--small" onclick="openProjectModal(${project.id})">
                    View Details
                </button>
                <a href="${project.liveUrl}" class="btn btn--secondary btn--small" target="_blank" rel="noopener">
                    Live Demo
                </a>
                <a href="${project.githubUrl}" class="btn btn--secondary btn--small" target="_blank" rel="noopener">
                    GitHub
                </a>
            </div>
        </div>
    `

  return card
}

// Initialize filter functionality
function initializeFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("filter-btn--active"))
      this.classList.add("filter-btn--active")

      // Filter projects
      filterProjects(filter)
    })
  })
}

// Filter projects based on category
function filterProjects(filter) {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    const categories = card.getAttribute("data-category")

    if (filter === "all" || categories.includes(filter)) {
      card.classList.remove("hidden")
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "scale(1)"
      }, 50)
    } else {
      card.classList.add("hidden")
      card.style.opacity = "0"
      card.style.transform = "scale(0.8)"
    }
  })
}

// Initialize modal functionality
function initializeModal() {
  if (modalClose) {
    modalClose.addEventListener("click", closeProjectModal)
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProjectModal()
      }
    })
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeProjectModal()
    }
  })
}

// Open project modal
function openProjectModal(projectId) {
  const project = projectsData.find((p) => p.id === projectId)
  if (!project || !modal || !modalBody) return

  modalBody.innerHTML = `
        <h2 style="margin-bottom: var(--spacing-lg); color: var(--text-primary);">${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--border-radius); margin-bottom: var(--spacing-lg);">
        
        <div style="margin-bottom: var(--spacing-lg);">
            <h3 style="margin-bottom: var(--spacing-sm); color: var(--text-primary);">Description</h3>
            <p style="color: var(--text-secondary); line-height: 1.6;">${project.description}</p>
        </div>
        
        <div style="margin-bottom: var(--spacing-lg);">
            <h3 style="margin-bottom: var(--spacing-sm); color: var(--text-primary);">Technologies Used</h3>
            <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-xs);">
                ${project.technologies.map((tech) => `<span class="project-tag">${tech}</span>`).join("")}
            </div>
        </div>
        
        <div style="margin-bottom: var(--spacing-lg);">
            <h3 style="margin-bottom: var(--spacing-sm); color: var(--text-primary);">Key Features</h3>
            <ul style="color: var(--text-secondary); padding-left: var(--spacing-lg);">
                ${project.features.map((feature) => `<li style="margin-bottom: var(--spacing-xs);">${feature}</li>`).join("")}
            </ul>
        </div>
        
        <div style="display: flex; gap: var(--spacing-sm); justify-content: center; margin-top: var(--spacing-xl);">
            <a href="${project.liveUrl}" class="btn btn--primary" target="_blank" rel="noopener">View Live Demo</a>
            <a href="${project.githubUrl}" class="btn btn--secondary" target="_blank" rel="noopener">View Code</a>
        </div>
    `

  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

// Close project modal
function closeProjectModal() {
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"
  }
}

// Make functions globally available
window.openProjectModal = openProjectModal
window.closeProjectModal = closeProjectModal
