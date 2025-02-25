// Initialize engagement chart
const engagementCtx = document.getElementById('engagementChart').getContext('2d');
new Chart(engagementCtx, {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [{
            label: 'Student Engagement',
            data: [65, 70, 80, 75, 85],
            borderColor: '#4f46e5',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Initialize feedback chart
const feedbackCtx = document.getElementById('feedbackChart').getContext('2d');
new Chart(feedbackCtx, {
    type: 'doughnut',
    data: {
        labels: ['Positive', 'Neutral', 'Needs Improvement'],
        datasets: [{
            data: [70, 20, 10],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

// 1. Announcement Modal
const announcementModal = `
<div id="announcementModal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center">
<div class="content-card p-6 w-full max-w-2xl">
<div class="flex justify-between items-center mb-6">
    <h3 class="text-xl font-bold">Create Announcement</h3>
    <button onclick="closeAnnouncementModal()" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
    </button>
</div>
<form id="announcementForm" class="space-y-4">
    <div>
        <label class="block mb-2">Title</label>
        <input type="text" placeholder="Announcement title" required>
    </div>
    <div>
        <label class="block mb-2">Target Course</label>
        <select required>
            <option value="">Select course...</option>
            <option>System Analysis and Design 2204</option>
            <option>Software Testing 2106</option>
            <option>Product Development Project HIT0200</option>
        </select>
    </div>
    <div>
        <label class="block mb-2">Message</label>
        <textarea rows="4" placeholder="Type your announcement..." required></textarea>
    </div>
    <div>
        <label class="block mb-2">Priority</label>
        <select required>
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
        </select>
    </div>
    <div class="flex justify-end space-x-4">
        <button type="submit" class="submit-btn">
            <i class="fas fa-paper-plane mr-2"></i>Send Announcement
        </button>
        <button type="button" onclick="closeAnnouncementModal()" class="text-gray-500">Cancel</button>
    </div>
</form>
</div>
</div>`;

// 2. Course Material Upload Modal
const materialUploadModal = `
<div id="materialUploadModal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center">
<div class="content-card p-6 w-full max-w-2xl">
<div class="flex justify-between items-center mb-6">
    <h3 class="text-xl font-bold">Upload Course Material</h3>
    <button onclick="closeMaterialModal()" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
    </button>
</div>
<form id="materialUploadForm" class="space-y-4">
    <div>
        <label class="block mb-2">Title</label>
        <input type="text" placeholder="Material title" required>
    </div>
    <div>
        <label class="block mb-2">Course</label>
        <select required>
            <option value="">Select course...</option>
            <option>System Analysis and Design 2204</option>
            <option>Software Testing 2106</option>
            <option>Product Development Project HIT0200</option>
        </select>
    </div>
    <div>
        <label class="block mb-2">Material Type</label>
        <select required>
            <option value="lecture">Lecture Notes</option>
            <option value="assignment">Assignment</option>
            <option value="resource">Additional Resource</option>
        </select>
    </div>
    <div>
        <label class="block mb-2">File Upload</label>
        <input type="file" class="w-full" required>
    </div>
    <div>
        <label class="block mb-2">Description</label>
        <textarea rows="3" placeholder="Describe the material..." required></textarea>
    </div>
    <div class="flex justify-end space-x-4">
        <button type="submit" class="submit-btn">
            <i class="fas fa-upload mr-2"></i>Upload Material
        </button>
        <button type="button" onclick="closeMaterialModal()" class="text-gray-500">Cancel</button>
    </div>
</form>
</div>
</div>`;

// 3. Feedback Response System
const feedbackResponseModal = `
<div id="feedbackResponseModal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center">
<div class="content-card p-6 w-full max-w-2xl">
<div class="flex justify-between items-center mb-6">
    <h3 class="text-xl font-bold">Respond to Feedback</h3>
    <button onclick="closeFeedbackModal()" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
    </button>
</div>
<div id="originalFeedback" class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
    <!-- Original feedback content will be inserted here -->
</div>
<form id="feedbackResponseForm" class="space-y-4">
    <div>
        <label class="block mb-2">Your Response</label>
        <textarea rows="4" placeholder="Type your response..." required></textarea>
    </div>
    <div class="flex justify-end space-x-4">
        <button type="submit" class="submit-btn">
            <i class="fas fa-reply mr-2"></i>Send Response
        </button>
        <button type="button" onclick="closeFeedbackModal()" class="text-gray-500">Cancel</button>
    </div>
</form>
</div>
</div>`;

// Add modal initialization
document.body.insertAdjacentHTML('beforeend', announcementModal);
document.body.insertAdjacentHTML('beforeend', materialUploadModal);
document.body.insertAdjacentHTML('beforeend', feedbackResponseModal);

// Modal control functions
const openAnnouncementModal = () => document.getElementById('announcementModal').classList.remove('hidden');
const closeAnnouncementModal = () => document.getElementById('announcementModal').classList.add('hidden');
const openMaterialModal = () => document.getElementById('materialUploadModal').classList.remove('hidden');
const closeMaterialModal = () => document.getElementById('materialUploadModal').classList.add('hidden');
const openFeedbackModal = (feedbackId) => {
const modal = document.getElementById('feedbackResponseModal');
// Populate original feedback content
document.getElementById('originalFeedback').innerHTML = getFeedbackContent(feedbackId);
modal.classList.remove('hidden');
};
const closeFeedbackModal = () => document.getElementById('feedbackResponseModal').classList.add('hidden');

// Real-time notifications system
const initializeNotifications = () => {
const notifications = [];
const notificationsList = document.getElementById('notificationsList');

const addNotification = (notification) => {
notifications.unshift(notification);
updateNotificationsBadge();
renderNotifications();
};

const renderNotifications = () => {
notificationsList.innerHTML = notifications.map(notification => `
    <div class="notification-item ${notification.unread ? 'unread' : ''}">
        <div class="flex items-center">
            ${notification.unread ? '<div class="notification-dot"></div>' : ''}
            <div class="flex-1">
                <h4 class="font-semibold">${notification.title}</h4>
                <p class="text-sm">${notification.message}</p>
                <span class="text-xs text-gray-500">${notification.time}</span>
            </div>
        </div>
    </div>
`).join('');
};

const updateNotificationsBadge = () => {
const unreadCount = notifications.filter(n => n.unread).length;
const badge = document.querySelector('.notification-badge');
badge.textContent = unreadCount;
badge.style.display = unreadCount > 0 ? 'flex' : 'none';
};

// Example notification
addNotification({
title: 'New Student Feedback',
message: 'You received feedback for HIT0200',
time: 'Just now',
unread: true
});
};

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
initializeNotifications();
initializeProfileSystem();
});

// Profile management system (similar to student.html)
const initializeProfileSystem = () => {
const profileButton = document.querySelector('nav a:nth-child(4)');
const profileModal = document.getElementById('profileModal');

profileButton.addEventListener('click', (e) => {
e.preventDefault();
profileModal.classList.remove('hidden');
});

document.getElementById('profileForm').addEventListener('submit', (e) => {
e.preventDefault();
// Profile update logic
showSuccessMessage('Profile updated successfully');
setTimeout(() => profileModal.classList.add('hidden'), 1500);
});
};
// Enhanced feedback functionality
const initializeFeedbackSystem = () => {
    const feedbackContainer = document.querySelector('.feedback-card');
    
    document.querySelectorAll('.fa-reply').forEach(replyBtn => {
        replyBtn.parentElement.addEventListener('click', () => {
            const responseArea = document.createElement('div');
            responseArea.innerHTML = `
                <div class="mt-4 border-t pt-4 dark:border-gray-700">
                    <textarea class="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600" 
                        placeholder="Type your response..."></textarea>
                    <div class="mt-2 flex justify-end space-x-2">
                        <button class="px-4 py-2 bg-gray-200 rounded dark:bg-gray-600">Cancel</button>
                        <button class="px-4 py-2 bg-indigo-500 text-white rounded">Send</button>
                    </div>
                </div>
            `;
            feedbackContainer.appendChild(responseArea);
        });
    });
};

// Enhanced course materials functionality
const initializeCourseMaterials = () => {
    const materialCards = document.querySelectorAll('.course-material-card');
    
    materialCards.forEach(card => {
        const editBtn = card.querySelector('.fa-edit').parentElement;
        const updateBtn = card.querySelector('.bg-indigo-500');
        
        editBtn.addEventListener('click', () => {
            const title = card.querySelector('h4');
            const description = card.querySelector('p');
            title.contentEditable = true;
            description.contentEditable = true;
            title.focus();
        });
        
        updateBtn.addEventListener('click', () => {
            // Add file upload functionality
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,.doc,.docx';
            input.click();
            
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    card.querySelector('.text-sm.text-gray-500').textContent = 
                        `Updated: ${new Date().toLocaleDateString()}`;
                }
            });
        });
    });
};

// Course Management System
const initializeCourseManagement = () => {
const courseData = [
{
    id: 1,
    title: 'Week 5 Lecture Notes',
    course: 'Software Testing',
    type: 'lecture',
    lastUpdated: '2025-01-15',
    downloads: 45
}
];

const renderCourseMaterials = () => {
const materialsContainer = document.querySelector('.course-material-card').parentElement;

const materialsHTML = courseData.map(material => `
    <div class="course-material-card p-4 bg-white dark:bg-gray-800 rounded-lg">
        <div class="flex justify-between items-start">
            <div>
                <h4 class="font-bold">${material.title}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">${material.course}</p>
            </div>
            <div class="flex space-x-2">
                <button onclick="editMaterial(${material.id})" class="text-indigo-500 hover:text-indigo-700">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteMaterial(${material.id})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="mt-4 flex justify-between items-center">
            <span class="text-sm text-gray-500">
                <i class="fas fa-download mr-1"></i>${material.downloads} downloads
            </span>
            <div class="flex space-x-2">
                <button onclick="previewMaterial(${material.id})" class="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200">
                    <i class="fas fa-eye mr-1"></i>Preview
                </button>
                <button onclick="updateMaterial(${material.id})" class="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600">
                    <i class="fas fa-upload mr-1"></i>Update
                </button>
            </div>
        </div>
    </div>
`).join('');

materialsContainer.innerHTML = materialsHTML;
};

renderCourseMaterials();
};

// Announcements System
const initializeAnnouncementSystem = () => {
const announcements = [
{
    id: 1,
    title: 'Midterm Exam Schedule',
    course: 'Software Testing',
    message: 'The midterm exam will be held next week.',
    priority: 'urgent',
    date: '2025-03-22'
}
];

const createAnnouncement = (data) => {
const newAnnouncement = {
    id: announcements.length + 1,
    ...data,
    date: new Date().toISOString().split('T')[0]
};

announcements.unshift(newAnnouncement);
renderAnnouncements();
notifyStudents(newAnnouncement);
};

const renderAnnouncements = () => {
const container = document.querySelector('#announcements-list');

const announcementsHTML = announcements.map(announcement => `
    <div class="announcement-card p-4 bg-white dark:bg-gray-800 rounded-lg ${getPriorityClass(announcement.priority)}">
        <div class="flex justify-between items-start">
            <div>
                <h4 class="font-bold">${announcement.title}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">${announcement.course}</p>
            </div>
            <span class="text-sm ${getPriorityTextClass(announcement.priority)}">${announcement.priority}</span>
        </div>
        <p class="mt-2">${announcement.message}</p>
        <div class="mt-4 flex justify-between items-center">
            <span class="text-sm text-gray-500">${announcement.date}</span>
            <div class="flex space-x-2">
                <button onclick="editAnnouncement(${announcement.id})" class="text-indigo-500 hover:text-indigo-700">
                    <i class="fas fa-edit mr-1"></i>Edit
                </button>
                <button onclick="deleteAnnouncement(${announcement.id})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash mr-1"></i>Delete
                </button>
            </div>
        </div>
    </div>
`).join('');

container.innerHTML = announcementsHTML;
};

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
initializeFeedbackSystem();
initializeCourseManagement();
initializeAnnouncementSystem();
});
};

// Add event listener cleanup on component unmount
const cleanup = () => {
  darkModeToggle.removeEventListener('click');
  profileButton.removeEventListener('click');
  // Remove other listeners
};

window.addEventListener('unload', cleanup);

const validateAnnouncementForm = (formData) => {
  if (!formData.title || formData.title.length < 3) return false;
  if (!formData.message || formData.message.length < 10) return false;
  return true;
};

const DASHBOARD_CONFIG = {
  chartColors: {
    primary: '#4f46e5',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
  },
  refreshInterval: 5000,
  maxNotifications: 50
};

class DashboardState {
  constructor() {
    this.notifications = [];
    this.courseData = [];
    this.announcements = [];
  }
  
  updateNotifications(notification) {
    this.notifications.unshift(notification);
    this.notifySubscribers('notifications');
  }
}
  const studentFeedbackModal = `
  <div id="studentFeedbackModal" class="fixed inset-0 flex items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 backdrop-blur-lg"></div>
      <div class="relative w-full max-w-4xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-2xl p-6 m-4 overflow-y-auto max-h-[80vh]">
          <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Student Feedback Overview</h3>
              <button onclick="closeStudentFeedbackModal()" class="text-gray-500 hover:text-gray-700">
                  <i class="fas fa-times"></i>
              </button>
          </div>

          <div class="feedback-list space-y-6">
              <!-- Individual Feedback Card -->
              <div class="feedback-card bg-white/50 dark:bg-gray-700/50 rounded-lg p-4 backdrop-blur-sm">
                  <div class="flex justify-between items-start">
                      <div>
                          <h4 class="font-semibold text-lg">Software Testing 2106</h4>
                          <p class="text-sm text-gray-600 dark:text-gray-300">Student ID: ST2023045</p>
                      </div>
                      <div class="flex items-center">
                          <div class="star-rating text-yellow-400">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star-half-alt"></i>
                          </div>
                          <span class="ml-2 text-sm">4.5</span>
                      </div>
                  </div>
                
                  <div class="mt-3">
                      <p class="text-gray-700 dark:text-gray-200">The lectures are very engaging and the practical examples help understand complex concepts better. Would appreciate more hands-on exercises.</p>
                  </div>

                  <div class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <button onclick="showResponseForm(this)" class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 text-sm">
                          <i class="fas fa-reply mr-2"></i>Respond to Feedback
                      </button>
                  </div>

                  <!-- Response Form (Initially Hidden) -->
                  <div class="response-form hidden mt-4">
                      <textarea class="w-full p-3 rounded-lg bg-white/70 dark:bg-gray-600/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700" 
                          placeholder="Type your response..."></textarea>
                      <div class="flex justify-end space-x-3 mt-2">
                          <button onclick="cancelResponse(this)" class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                          <button onclick="submitResponse(this)" class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                              Send Response
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`;

  // Add modal control functions
  const showResponseForm = (button) => {
      const responseForm = button.parentElement.nextElementSibling;
      button.style.display = 'none';
      responseForm.classList.remove('hidden');
  };

  const cancelResponse = (button) => {
      const responseForm = button.closest('.response-form');
      const respondButton = responseForm.previousElementSibling.querySelector('button');
      responseForm.classList.add('hidden');
      respondButton.style.display = 'block';
  };

  const submitResponse = (button) => {
      const responseForm = button.closest('.response-form');
      const responseText = responseForm.querySelector('textarea').value;
    
      if (responseText.trim()) {
          addNotification({
              title: 'Response Sent',
              message: 'Your feedback response has been sent to the student',
              time: 'Just now',
              unread: true
          });
          cancelResponse(button);
      }
  };
  // Initialize feedback display
  const initializeStudentFeedbackDisplay = () => {
      document.addEventListener('DOMContentLoaded', () => {
          // Add click handler for sidebar button
          document.querySelector('[data-feedback-btn]').addEventListener('click', () => {
              openFeedbackOverview();
          });
      });
  };

  // Export for use
  initializeStudentFeedbackDisplay();

  const openFeedbackOverview = () => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center';
    modal.innerHTML = `
        <div class="absolute inset-0 bg-[#000B18] backdrop-blur-[8px]"></div>
        <div class="relative w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 m-6 overflow-y-auto max-h-[90vh] z-50">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h3 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Student Feedback Dashboard</h3>
                    <p class="text-gray-600 dark:text-gray-300 mt-2">Review and respond to student feedback across your courses</p>
                </div>
                <button onclick="closeFeedbackOverview(this)" class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                ${generateFeedbackCards()}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

const generateFeedbackCards = () => {
    const feedbacks = [
        {
            courseId: 'HIT0200',
            courseName: 'Product Development Project',
            studentId: 'ST2023045',
            rating: 4.5,
            feedback: 'Excellent teaching methods and practical examples. The project-based learning approach is very effective.',
            date: '2024-01-15',
            studentName: 'John Smith'
        },
        {
            courseId: '2106',
            courseName: 'Software Testing',
            studentId: 'ST2023033',
            rating: 4.0,
            feedback: 'Clear explanations of testing concepts. Would appreciate more hands-on testing exercises.',
            date: '2024-01-14',
            studentName: 'Emma Davis'
        },
        {
            courseId: '2204',
            courseName: 'System Analysis and Design',
            studentId: 'ST2023028',
            rating: 4.8,
            feedback: 'The course structure is well-organized. Real-world case studies helped in understanding complex concepts.',
            date: '2024-01-13',
            studentName: 'Michael Chen'
        }
    ];

    return feedbacks.map(feedback => `
        <div class="feedback-card bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="text-xl font-semibold text-gray-800 dark:text-white">${feedback.courseName}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Course ID: ${feedback.courseId}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Student: ${feedback.studentName} (${feedback.studentId})</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Submitted: ${feedback.date}</p>
                </div>
                <div class="flex flex-col items-end">
                    <div class="flex items-center mb-1">
                        ${generateStarRating(feedback.rating)}
                        <span class="ml-2 text-lg font-semibold text-gray-700 dark:text-gray-200">${feedback.rating}</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-white dark:bg-gray-600 rounded-lg p-4 mb-4">
                <p class="text-gray-700 dark:text-gray-200 text-lg">${feedback.feedback}</p>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
                <button onclick="toggleResponseForm(this)" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 text-base font-medium">
                    <i class="fas fa-reply mr-2"></i>Respond to Feedback
                </button>
                <div class="response-form hidden mt-4">
                    <textarea class="w-full p-4 rounded-lg bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-700 text-base" 
                        rows="4"
                        placeholder="Write your response to the student..."></textarea>
                    <div class="flex justify-end gap-3 mt-3">
                        <button onclick="toggleResponseForm(this)" class="px-4 py-2 text-base text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Cancel</button>
                        <button onclick="submitFeedbackResponse(this)" class="px-4 py-2 text-base bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Send Response</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
};


  const generateStarRating = (rating) => {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      let stars = '';
    
      for (let i = 0; i < fullStars; i++) {
          stars += '<i class="fas fa-star text-yellow-400"></i>';
      }
      if (hasHalfStar) {
          stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
      }
      const remainingStars = 5 - Math.ceil(rating);
      for (let i = 0; i < remainingStars; i++) {
          stars += '<i class="far fa-star text-yellow-400"></i>';
      }
    
      return stars;
  };

  const closeFeedbackOverview = (button) => {
      button.closest('.fixed').remove();
  };

  const toggleResponseForm = (button) => {
      const form = button.closest('.feedback-card').querySelector('.response-form');
      form.classList.toggle('hidden');
  };

  const submitFeedbackResponse = (button) => {
      const form = button.closest('.response-form');
      const response = form.querySelector('textarea').value;
    
      if (response.trim()) {
          addNotification({
              title: 'Response Sent',
              message: 'Your feedback response has been sent successfully',
              time: 'Just now',
              unread: true
          });
          toggleResponseForm(button);
      }
  };
