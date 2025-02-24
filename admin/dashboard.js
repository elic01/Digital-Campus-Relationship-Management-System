// Add drag-and-drop functionality to Kanban board
const draggables = document.querySelectorAll('.task-card');
const containers = document.querySelectorAll('.kanban-column');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

// Initialize Particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#4f46e5" },
        shape: { type: "circle" },
        opacity: {
            value: 0.5,
            random: false,
            animation: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            animation: { enable: true, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#4f46e5",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        }
    },
    retina_detect: true
});

// Enhanced Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Active State
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    // Kanban Board Drag & Drop
    const draggables = document.querySelectorAll('.task-card');
    const containers = document.querySelectorAll('.kanban-column');

    draggables.forEach(draggable => {
        draggable.setAttribute('draggable', true);
        
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            updateTaskCount();
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            container.appendChild(draggable);
        });
    });

    // Real-time Search
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const taskCards = document.querySelectorAll('.task-card');
        
        taskCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Update Task Counts
    function updateTaskCount() {
        const columns = document.querySelectorAll('.kanban-column');
        columns.forEach(column => {
            const count = column.querySelectorAll('.task-card').length;
            const title = column.querySelector('h3');
            title.textContent = `${title.textContent.split('(')[0]} (${count})`;
        });
    }

    // Initialize Charts with Animation
    initializeCharts();
});

function initializeCharts() {
    // Initialize Charts
    const ctx = document.getElementById('usersChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'User Growth',
                data: [1500, 1700, 1900, 2200, 2547],
                borderColor: '#4f46e5',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}