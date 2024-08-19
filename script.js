document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskDatetime = document.getElementById('task-datetime');
    const todoList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');

    // Function to create a new task element
    function createTaskElement(taskText, taskDateTime) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText} <small>${taskDateTime}</small></span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        li.classList.add('task');
        return li;
    }

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const taskDateTime = taskDatetime.value;

        if (taskText === '') return;

        const taskElement = createTaskElement(taskText, taskDateTime);
        todoList.appendChild(taskElement);

        // Clear inputs
        taskInput.value = '';
        taskDatetime.value = '';
    });

    // Handle task actions
    function handleTaskAction(event) {
        const target = event.target;
        const taskItem = target.closest('li');

        if (target.classList.contains('complete-btn')) {
            completedList.appendChild(taskItem);
            taskItem.classList.add('completed');
        } else if (target.classList.contains('edit-btn')) {
            const newTaskText = prompt('Edit task:', taskItem.querySelector('span').textContent.trim());
            if (newTaskText !== null) {
                taskItem.querySelector('span').innerHTML = `${newTaskText} <small>${taskItem.querySelector('small').textContent}</small>`;
            }
        } else if (target.classList.contains('delete-btn')) {
            taskItem.remove();
        }
    }

    // Event delegation for task actions
    document.addEventListener('click', handleTaskAction);
});
