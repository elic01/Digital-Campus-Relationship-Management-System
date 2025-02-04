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
