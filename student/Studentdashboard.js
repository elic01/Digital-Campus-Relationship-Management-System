            // Dark Mode Toggle with persistent state
            const darkModeToggle = document.getElementById('darkModeToggle');
            const body = document.body;
            const icon = darkModeToggle.querySelector('i');

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'enabled') {
                body.classList.add('dark-mode');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }

            darkModeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
              
                // Update icon based on dark mode state
                if (body.classList.contains('dark-mode')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                    localStorage.setItem('darkMode', null);
                }
            });
          // Category Pills
          document.querySelectorAll('.category-pill').forEach(pill => {
              pill.addEventListener('click', () => {
                  document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
                  pill.classList.add('active');
              });
          });
// Notification System
const initializeNotifications = () => {
    const bell = document.getElementById('notificationBell');
    const dropdown = document.getElementById('notificationsDropdown');
    const markAllRead = document.getElementById('markAllRead');
    const notificationsList = document.getElementById('notificationsList');

    // Sample notifications data
    const notifications = [
        {
            id: 1,
            title: 'New Course Review',
            message: 'Your review for IIT2201 has been published',
            time: '2 minutes ago',
            unread: true
        },
        {
            id: 2,
            title: 'Task Deadline',
            message: 'Assignment submission due in 24 hours',
            time: '1 hour ago',
            unread: true
        },
        {
            id: 3,
            title: 'System Update',
            message: 'Platform maintenance scheduled for tonight',
            time: '3 hours ago',
            unread: false
        }
    ];

    // Render notifications
    const renderNotifications = () => {
        notificationsList.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.unread ? 'unread' : ''}" data-id="${notification.id}">
                <div class="flex items-center">
                    ${notification.unread ? '<div class="notification-dot"></div>' : ''}
                    <div class="flex-1">
                        <h4 class="font-semibold">${notification.title}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${notification.message}</p>
                        <span class="text-xs text-gray-500">${notification.time}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Update notification badge
        const unreadCount = notifications.filter(n => n.unread).length;
        const badge = document.querySelector('.notification-badge');
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    };

    // Toggle dropdown
    bell.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !bell.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Mark all as read
    markAllRead.addEventListener('click', () => {
        notifications.forEach(notification => notification.unread = false);
        renderNotifications();
    });

    // Initial render
    renderNotifications();
};
const initializeHeaderProfile = () => {
    const profileImage = document.getElementById('headerProfileImage');
    const dropdown = profileImage.nextElementSibling;

    profileImage.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !profileImage.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
};

document.addEventListener('DOMContentLoaded', initializeHeaderProfile);

// Initialize notifications on page load
document.addEventListener('DOMContentLoaded', initializeNotifications);

          // Form Submission Animation
          document.querySelector('.review-form').addEventListener('submit', (e) => {
              e.preventDefault();

              const submitBtn = e.target.querySelector('.submit-btn');
              submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Review Submitted';
              submitBtn.style.background = 'var(--success)';

              gsap.to(submitBtn, {
                  scale: 1.05,
                  duration: 0.2,
                  yoyo: true,
                  repeat: 1
              });

              setTimeout(() => {
                  submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Submit Review';
                  submitBtn.style.background = '';
                  e.target.reset();
              }, 2000);
          });

          // Animations
          gsap.from('.content-card', {
              y: 20,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: 'power3.out'
          });

          gsap.from('.category-pill', {
              scale: 0.9,
              opacity: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out'
          });

          // Review form content for different categories
          const formTemplates = {
              lecture: `
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label class="block mb-2">Select Course</label>
                        <select required>
                            <option value="">Choose a course...</option>
                            <option>Technopreneurship IV</option>
                            <option>Product Development Project</option>
                            <option>Mobile Application Development</option>
                            <option>Management Information Systems</option>
                            <option>E-Business</option>
                            <option>Systema Analysis and Design</option>
                            <option>Applied Statistics</option>
                      </div>
                      <div>
                          <label class="block mb-2">Lecturer</label>
                          <select required>
                                <option value="">Select lecturer...</option>
                                <option>Mr S.Mavuchi</option>
                                <option>Mr T.Butsa</option>
                                <option>Mr T.Mudawarima</option>
                                <option>Mr M.Mutandavari</option>
                                <option>Mr O.Gotora</option>
                                <option>Mr Sumbureru</option>
                          </select>
                      </div>
                  </div>
              `,
              canteen: `
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label class="block mb-2">Select Canteen</label>
                          <select required>
                              <option value="">Choose a canteen...</option>
                              <option>Main Cafeteria</option>
                              <option>TuckShop</option>
                              <option>Food Vendors Gate</option>
                          </select>
                      </div>
                      <div>
                          <label class="block mb-2">Food Category</label>
                          <select required>
                              <option value="">Select category...</option>
                              <option>Breakfast</option>
                              <option>Lunch</option>
                              <option>Snacks</option>
                              <option>Beverages</option>
                          </select>
                      </div>
                  </div>
              `,
              hostel: `
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label class="block mb-2">Hostel Building</label>
                          <select required>
                              <option value="">Select hostel...</option>
                              <option>Hostel 1/option>
                              <option>Hostel 2</option>
                              <option>Hostel 3</option>
                              <option>Hostel 4</option>
                          </select>
                      </div>
                      <div>
                          <label class="block mb-2">Room Side</label>
                          <select required>
                              <option value="">Select room side...</option>
                              <option>Left Side("Kitchen")</option>
                              <option>Right Side("Bedroom")</option>
                              <option>Both Sides</option>
                          </select>
                      </div>
                  </div>
              `,
              campus: `
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label class="block mb-2">Facility Type</label>
                          <select required>
                              <option value="">Select facility...</option>
                              <option>Library</option>
                              <option>Halls</option>
                              <option>Classes</option>
                              <option>Class Laboratories</option>
                              <option>Parking</option>
                          </select>
                      </div>
                      <div>
                          <label class="block mb-2">Location</label>
                          <select required>
                              <option value="">Select location...</option>
                              <option>North Campus</option>
                              <option>South Campus</option>
                              <option>Main Building</option>
                          </select>
                      </div>
                  </div>
              `
          };

          // Update form based on selected category
          document.querySelectorAll('.category-pill').forEach(pill => {
              pill.addEventListener('click', () => {
                  const category = pill.textContent.trim().toLowerCase();
                  const formContent = document.querySelector('.review-form .grid');
                
                  // Update form fields
                  if (formTemplates[category]) {
                      formContent.outerHTML = formTemplates[category];
                  }
                
                  // Update form title
                  const formTitle = document.querySelector('header h2');
                  formTitle.textContent = `Submit ${category.charAt(0).toUpperCase() + category.slice(1)} Review`;
              });
          });

          // Add functionality to navigation buttons
          document.querySelectorAll('nav a').forEach(link => {
              link.addEventListener('click', (e) => {
                  e.preventDefault();
                  // Remove active class from all nav items
                  document.querySelectorAll('nav a').forEach(item => {
                      item.classList.remove('bg-indigo-500', 'text-white');
                      item.classList.add('hover:bg-indigo-100', 'dark:hover:bg-gray-800');
                  });
                
                  // Add active class to clicked item
                  link.classList.add('bg-indigo-500', 'text-white');
                  link.classList.remove('hover:bg-indigo-100', 'dark:hover:bg-gray-800');
              });
          });
const resetForm = () => {
    const form = document.querySelector('.review-form');
    form.reset();
    clearStarRating();
    
    // Reset submit button style
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Submit Review';
    submitBtn.style.background = '';
};

// Clear star rating
const clearStarRating = () => {
    const stars = document.querySelectorAll('.star-rating input');
    stars.forEach(star => star.checked = false);
};

// Add click handler to cancel button
document.querySelector('.review-form button[type="button"]').addEventListener('click', resetForm);

// Add clear stars button to the rating section
document.querySelector('.star-rating').insertAdjacentHTML('afterend', `
    <button type="button" class="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mt-2" onclick="clearStarRating()">
        <i class="fas fa-times mr-1"></i>Clear rating
    </button>
`);

const initializeStarRating = () => {
    const starContainers = document.querySelectorAll('.star-rating');
    
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('label');
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => {
                for (let i = 0; i <= index; i++) {
                    stars[i].querySelector('.fas').style.display = 'inline-block';
                    stars[i].querySelector('.far').style.display = 'none';
                }
            });
            
            star.addEventListener('mouseout', () => {
                stars.forEach(s => {
                    if (!s.previousElementSibling.checked) {
                        s.querySelector('.fas').style.display = 'none';
                        s.querySelector('.far').style.display = 'inline-block';
                    }
                });
            });
        });
    });
};

// Initialize star rating system for all forms
initializeStarRating();

// Add this to the form template generation code
document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        // ... existing code ...
        initializeStarRating(); // Reinitialize stars after form template change
    });
});

// Button task functionality
const initializeTaskButtons = () => {
    const taskButton = document.querySelector('nav a:nth-child(2)');
    
    // Task counter
    let taskCount = 0;
    
    // Create task modal HTML
    const taskModal = `
        <div id="taskModal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center">
            <div class="content-card p-6 w-96">
                <h3 class="text-xl font-bold mb-4">Task Manager</h3>
                <div id="taskList" class="space-y-4 mb-4"></div>
                <form id="addTaskForm" class="space-y-4">
                    <input type="text" placeholder="Enter new task" class="w-full p-2 rounded" required>
                    <div class="flex justify-between">
                        <button type="submit" class="submit-btn">Add Task</button>
                        <button type="button" onclick="closeTaskModal()" class="text-gray-500 hover:text-gray-700">Close</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Insert modal into DOM
    document.body.insertAdjacentHTML('beforeend', taskModal);

    // Task button click handler
    taskButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('taskModal').classList.remove('hidden');
        loadTasks();
    });

    // Add task form handler
    document.getElementById('addTaskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const taskText = input.value.trim();
        
        if (taskText) {
            addTask(taskText);
            input.value = '';
            taskCount++;
            updateTaskCount();
        }
    });
};

// Task management functions
const addTask = (text) => {
    const taskList = document.getElementById('taskList');
    const taskHTML = `
        <div class="task-item flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded">
            <div class="flex items-center">
                <input type="checkbox" class="mr-3">
                <span>${text}</span>
            </div>
            <button onclick="deleteTask(this)" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    taskList.insertAdjacentHTML('beforeend', taskHTML);
};

const deleteTask = (button) => {
    button.closest('.task-item').remove();
    taskCount--;
    updateTaskCount();
};

const updateTaskCount = () => {
    const taskButton = document.querySelector('nav a:nth-child(2)');
    if (taskCount > 0) {
        taskButton.innerHTML = `
            <i class="fas fa-tasks"></i>
            <span>Tasks</span>
            <span class="notification-badge">${taskCount}</span>
        `;
    } else {
        taskButton.innerHTML = `
            <i class="fas fa-tasks"></i>
            <span>Tasks</span>
        `;
    }
};

const closeTaskModal = () => {
    document.getElementById('taskModal').classList.add('hidden');
};

// Initialize task functionality
document.addEventListener('DOMContentLoaded', initializeTaskButtons);
// Issues functionality
const initializeIssuesSystem = () => {
    const issuesButton = document.querySelector('nav a:nth-child(3)');
    
    const issuesModal = `
        <div id="issuesModal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center">
            <div class="content-card p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold">Campus Issues Tracker</h3>
                    <button onclick="closeIssuesModal()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Issues List -->
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <h4 class="font-bold">Active Issues</h4>
                            <button onclick="showNewIssueForm()" class="submit-btn">
                                <i class="fas fa-plus mr-2"></i>New Issue
                            </button>
                        </div>
                        <div id="issuesList" class="space-y-3"></div>
                    </div>
                    
                    <!-- New Issue Form -->
                    <div id="newIssueForm" class="content-card p-4 hidden">
                        <form id="issueSubmitForm" class="space-y-4">
                            <div>
                                <label class="block mb-2">Issue Type</label>
                                <select required class="w-full">
                                    <option value="">Select type...</option>
                                    <option>Technical Problem</option>
                                    <option>Facility Maintenance</option>
                                    <option>Academic Concern</option>
                                    <option>Safety Concern</option>
                                </select>
                            </div>
                            <div>
                                <label class="block mb-2">Location</label>
                                <input type="text" placeholder="Specify location" required>
                            </div>
                            <div>
                                <label class="block mb-2">Description</label>
                                <textarea rows="4" placeholder="Describe the issue..." required></textarea>
                            </div>
                            <div>
                                <label class="block mb-2">Priority</label>
                                <select required class="w-full">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                            <div class="flex space-x-4">
                                <button type="submit" class="submit-btn">Submit Issue</button>
                                <button type="button" onclick="hideNewIssueForm()" class="text-gray-500">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', issuesModal);

    // Sample issues data
    const sampleIssues = [
        {
            id: 1,
            type: 'Technical Problem',
            location: 'Computer Lab 2',
            description: 'Projector not working properly',
            priority: 'high',
            status: 'pending',
            date: '2024-01-15'
        },
        {
            id: 2,
            type: 'Facility Maintenance',
            location: 'Main Library',
            description: 'AC not functioning in study area',
            priority: 'medium',
            status: 'in-progress',
            date: '2024-01-14'
        },
        {
            id: 3,
            type: 'Safety Concern',
            location: 'Parking Lot B',
            description: 'Poor lighting in evening hours',
            priority: 'urgent',
            status: 'pending',
            date: '2024-01-13'
        }
    ];

    const renderIssues = () => {
        const issuesList = document.getElementById('issuesList');
        issuesList.innerHTML = sampleIssues.map(issue => `
            <div class="content-card p-4 ${getPriorityClass(issue.priority)}">
                <div class="flex justify-between items-start">
                    <div>
                        <span class="font-bold">${issue.type}</span>
                        <span class="text-sm ml-2 ${getStatusClass(issue.status)}">${issue.status}</span>
                    </div>
                    <div class="text-sm text-gray-500">${issue.date}</div>
                </div>
                <div class="text-sm mt-2"><i class="fas fa-map-marker-alt mr-2"></i>${issue.location}</div>
                <p class="mt-2">${issue.description}</p>
                <div class="flex justify-end mt-3 space-x-2">
                    <button onclick="updateIssueStatus(${issue.id})" class="text-indigo-500 hover:text-indigo-700">
                        <i class="fas fa-sync-alt mr-1"></i>Update
                    </button>
                    <button onclick="deleteIssue(${issue.id})" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-trash mr-1"></i>Delete
                    </button>
                </div>
            </div>
        `).join('');
    };

    // Event handlers
    issuesButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('issuesModal').classList.remove('hidden');
        renderIssues();
    });

    document.getElementById('issueSubmitForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Add new issue logic here
        hideNewIssueForm();
        renderIssues();
    });
};

// Utility functions
const getPriorityClass = (priority) => {
    const classes = {
        low: 'border-l-4 border-gray-400',
        medium: 'border-l-4 border-yellow-400',
        high: 'border-l-4 border-orange-500',
        urgent: 'border-l-4 border-red-500'
    };
    return classes[priority] || classes.low;
};

const getStatusClass = (status) => {
    const classes = {
        pending: 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded',
        'in-progress': 'bg-blue-100 text-blue-800 px-2 py-1 rounded',
        resolved: 'bg-green-100 text-green-800 px-2 py-1 rounded'
    };
    return classes[status] || classes.pending;
};

const showNewIssueForm = () => {
    document.getElementById('newIssueForm').classList.remove('hidden');
};

const hideNewIssueForm = () => {
    document.getElementById('newIssueForm').classList.add('hidden');
    document.getElementById('issueSubmitForm').reset();
};

const closeIssuesModal = () => {
    document.getElementById('issuesModal').classList.add('hidden');
};

// Initialize issues system
document.addEventListener('DOMContentLoaded', initializeIssuesSystem);
// Profile functionality
const initializeProfile = () => {
    const profileButton = document.querySelector('nav a:nth-child(4)');
    
    profileButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('profileModal').classList.remove('hidden');
    });

    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const submitBtn = e.target.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Saved!';
        
        gsap.to(submitBtn, {
            scale: 1.05,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-save mr-2"></i>Save Changes';
            closeProfileModal();
        }, 1500);
    });
};

const closeProfileModal = () => {
    document.getElementById('profileModal').classList.add('hidden');
};

const updateProfileImage = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
};

// Initialize profile system
document.addEventListener('DOMContentLoaded', initializeProfile);
const updateRecentReviews = (reviewData) => {
    // Select the Recent Reviews section specifically
    const recentReviewsSection = document.querySelector('.mt-8 .grid.grid-cols-1.md\\:grid-cols-2.gap-6');
    
    const reviewHTML = `
        <div class="content-card p-4">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-bold">${reviewData.course || reviewData.facility}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${reviewData.lecturer || reviewData.type}</p>
                </div>
                <div class="flex text-yellow-400">
                    ${generateStars(reviewData.rating)}
                </div>
            </div>
            <p class="mt-2">${reviewData.review}</p>
            <div class="mt-2 text-sm text-gray-500">Just now</div>
        </div>
    `;
    
    recentReviewsSection.insertAdjacentHTML('beforeend', reviewHTML);
    
    // Remove oldest review if more than 4 reviews
    const reviews = recentReviewsSection.children;
    if (reviews.length > 4) {
        reviews[0].remove();
    }
};



const generateStars = (rating) => {
    return Array(5).fill(0).map((_, index) => 
        `<i class="${index < rating ? 'fas' : 'far'} fa-star"></i>`
    ).join('');
};

// Update form submission handler
document.querySelector('.review-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const form = e.target;
    const reviewData = {
        course: form.querySelector('select:first-of-type').value,
        lecturer: form.querySelector('select:last-of-type').value,
        rating: form.querySelector('input[name="rating"]:checked').value,
        title: form.querySelector('input[type="text"]').value,
        review: form.querySelector('textarea').value
    };
    
    updateRecentReviews(reviewData);
    
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Review Submitted';
    submitBtn.style.background = 'var(--success)';
    
    gsap.to(submitBtn, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });

    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Submit Review';
        submitBtn.style.background = '';
        form.reset();
    }, 2000);
});
