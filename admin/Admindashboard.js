// Initialize drag and drop for issue tracking
function initializeDragAndDrop() {
    const draggables = document.querySelectorAll('.task-card');
    const containers = document.querySelectorAll('.kanban-column');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            saveIssueState();
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            container.appendChild(draggable);
        });
    });
}
// Initialize particles for background effect
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        opacity: { value: 0.1 },
        size: { value: 3 },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.1,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    }
});


// AI Task Management System
class TaskManager {
    static async organizeTasksWithAI(tasks) {
        const response = await fetch('/api/ai/organize-tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tasks })
        });
        return await response.json();
    }

    static addTask(title, description, priority) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-card p-4 mb-3 bg-white rounded-lg shadow';
        taskElement.innerHTML = `
            <h4 class="font-bold">${title}</h4>
            <p class="text-sm text-gray-600">${description}</p>
            <span class="priority-badge ${priority}">${priority}</span>
            <div class="task-actions mt-2">
                <button onclick="TaskManager.editTask(this)" class="text-blue-500"><i class="fas fa-edit"></i></button>
                <button onclick="TaskManager.deleteTask(this)" class="text-red-500"><i class="fas fa-trash"></i></button>
            </div>
        `;
        document.querySelector('.tasks-container').appendChild(taskElement);
    }
}

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
const showNewIssueForm = () => {
    document.getElementById('newIssueForm').classList.remove('hidden');
}

const hideNewIssueForm = () => {
    document.getElementById('newIssueForm').classList.add('hidden');
    document.getElementById('issueSubmitForm').reset();
}

const addNewIssue = (type, priority, description) => {
    const kanbanColumn = document.querySelector('.kanban-column:first-child');
    const priorityClass = getPriorityClass(priority);
    
    const issueHTML = `
        <div class="task-card ${priorityClass} mb-3">
            <div class="font-bold">${type}</div>
            <div class="text-sm text-gray-600">${description}</div>
            <div class="mt-2 flex justify-between items-center">
                <span class="text-xs px-2 py-1 bg-gray-200 rounded">${priority}</span>
                <button class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    kanbanColumn.insertAdjacentHTML('beforeend', issueHTML);
}

const submitAndUpdateIssue = () => {
    const form = document.getElementById('issueSubmitForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const issueData = {
            type: form.querySelector('select').value,
            priority: form.querySelector('select[name="priority"]').value,
            description: form.querySelector('textarea').value,
            status: 'pending',
            timestamp: new Date().toLocaleString()
        };

        const issueCard = `
            <div class="task-card ${getPriorityClass(issueData.priority)} transition-all duration-300">
                <div class="flex justify-between items-start mb-2">
                    <span class="font-bold text-lg">${issueData.type}</span>
                    <span class="px-2 py-1 rounded-full text-xs ${getPriorityClass(issueData.priority)}">${issueData.priority}</span>
                </div>
                <p class="text-gray-600 mb-3">${issueData.description}</p>
                <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-500">${issueData.timestamp}</span>
                    <div class="flex space-x-2">
                        <button onclick="moveToInProgress(this)" class="text-blue-500 hover:text-blue-700">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                        <button onclick="deleteIssue(this)" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        const pendingColumn = document.querySelector('.kanban-column:first-child');
        pendingColumn.insertAdjacentHTML('afterbegin', issueCard);

        form.reset();
        hideNewIssueForm();
        updateIssueCount();
    });
};

// Initialize the functionality
submitAndUpdateIssue();

const getPriorityBadgeColor = (priority) => {
    const colors = {
        low: 'bg-gray-200 text-gray-800',
        medium: 'bg-yellow-200 text-yellow-800',
        high: 'bg-orange-200 text-orange-800',
        urgent: 'bg-red-200 text-red-800'
    };
    return colors[priority] || colors.low;
};

// Initialize submit functionality
submitIssue();
document.getElementById('issueSubmitForm').addEventListener('submit', submitIssue);