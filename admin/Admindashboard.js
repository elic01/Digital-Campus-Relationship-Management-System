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

// User management state
let users = [
    {
        id: 1,
        name: 'Emmanuel L I Chinjekure',
        role: 'Student',
        status: 'active',
        email: 'emmanuel@example.com',
        joinDate: '2023-01-15'
    }
];

// Render users table
const renderUsers = () => {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = users.map(user => `
        <tr data-id="${user.id}">
            <td class="p-3">${user.name}</td>
            <td class="p-3">${user.role}</td>
            <td class="p-3">
                <span class="px-2 py-1 ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-full text-sm">
                    ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
            </td>
            <td class="p-3">
                <button onclick="editUser(${user.id})" class="text-blue-500 hover:text-blue-700">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="toggleUserStatus(${user.id})" class="text-yellow-500 hover:text-yellow-700 ml-2">
                    <i class="fas fa-power-off"></i>
                </button>
                <button onclick="deleteUser(${user.id})" class="text-red-500 hover:text-red-700 ml-2">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
};

// Add new user
const addUser = (userData) => {
    const newUser = {
        id: Date.now(),
        ...userData,
        status: 'active'
    };
    users.unshift(newUser);
    renderUsers();
    saveUsers();
};

// Edit user
const editUser = (userId) => {
    const user = users.find(u => u.id === userId);
    // Show edit modal/form
    showUserForm(user);
};

// Toggle user status
const toggleUserStatus = (userId) => {
    const user = users.find(u => u.id === userId);
    user.status = user.status === 'active' ? 'inactive' : 'active';
    renderUsers();
    saveUsers();
};

// Delete user
const deleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(u => u.id !== userId);
        renderUsers();
        saveUsers();
    }
};

// Show user form modal
const showUserForm = (user = null) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center';
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 class="text-xl font-bold mb-4">${user ? 'Edit' : 'Add'} User</h3>
            <form id="userForm" class="space-y-4">
                <div>
                    <label class="block mb-1">Name</label>
                    <input type="text" name="name" value="${user?.name || ''}" 
                           class="w-full p-2 border rounded" required>
                </div>
                <div>
                    <label class="block mb-1">Email</label>
                    <input type="email" name="email" value="${user?.email || ''}" 
                           class="w-full p-2 border rounded" required>
                </div>
                <div>
                    <label class="block mb-1">Role</label>
                    <select name="role" class="w-full p-2 border rounded" required>
                        <option value="Student" ${user?.role === 'Student' ? 'selected' : ''}>Student</option>
                        <option value="Lecturer" ${user?.role === 'Lecturer' ? 'selected' : ''}>Lecturer</option>
                        <option value="Admin" ${user?.role === 'Admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </div>
                <div class="flex justify-end space-x-2">
                    <button type="button" onclick="closeUserForm()" 
                            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button type="submit" 
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        ${user ? 'Update' : 'Add'} User
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('userForm').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData);
        
        if (user) {
            Object.assign(user, userData);
        } else {
            addUser(userData);
        }
        
        closeUserForm();
        renderUsers();
    };
};

// Close user form modal
const closeUserForm = () => {
    document.querySelector('.fixed').remove();
};

// Save users to localStorage
const saveUsers = () => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
};

// Load users from localStorage
const loadUsers = () => {
    const savedUsers = localStorage.getItem('adminUsers');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    renderUsers();
    
    // Add "Add User" button to the users section
    const usersSection = document.querySelector('.dashboard-card:last-child');
    const addButton = document.createElement('button');
    addButton.className = 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4';
    addButton.innerHTML = '<i class="fas fa-plus mr-2"></i>Add User';
    addButton.onclick = () => showUserForm();
    usersSection.insertBefore(addButton, usersSection.querySelector('table'));
});
