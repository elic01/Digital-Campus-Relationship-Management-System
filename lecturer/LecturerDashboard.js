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
// Student Feedback Management
const initializeFeedbackSystem = () => {
const feedbackContainer = document.querySelector('.feedback-card');

const feedbackData = [
{
    id: 1,
    course: 'Product Development Project HIT0200',
    student: 'Emmanuel L I Chinjekure',
    year: '2nd Year',
    rating: 4,
    comment: 'Excellent help on Project Documentation Structure. Your insights really helped.',
    date: '2025-01-15',
    status: 'unread'
},
// Add more feedback items
];

const renderFeedback = () => {
const feedbackHTML = feedbackData.map(feedback => `
    <div class="feedback-card p-4 bg-white dark:bg-gray-800 rounded-lg ${feedback.status === 'unread' ? 'border-l-4 border-indigo-500' : ''}">
        <div class="flex justify-between items-start">
            <div>
                <h4 class="font-bold">${feedback.course}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">${feedback.student} - ${feedback.year}</p>
            </div>
            <div class="flex text-yellow-400">
                ${generateStarRating(feedback.rating)}
            </div>
        </div>
        <p class="mt-2">${feedback.comment}</p>
        <div class="flex justify-between items-center mt-2">
            <span class="text-sm text-gray-500">${feedback.date}</span>
            <div class="space-x-2">
                <button onclick="respondToFeedback(${feedback.id})" class="text-indigo-500 hover:text-indigo-700">
                    <i class="fas fa-reply mr-1"></i>Respond
                </button>
                <button onclick="markAsRead(${feedback.id})" class="text-green-500 hover:text-green-700">
                    <i class="fas fa-check mr-1"></i>Mark as Read
                </button>
            </div>
        </div>
    </div>
`).join('');

feedbackContainer.innerHTML = feedbackHTML;
};

renderFeedback();
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
