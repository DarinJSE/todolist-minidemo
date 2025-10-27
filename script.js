const addButton = document.querySelector('.task-input');
const taskList = document.querySelector('.task-list');

addButton.addEventListener('click', () => {
  const taskText = prompt("What's your intention?");
  if (taskText) {
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.innerHTML = `${taskText} <span class="done">✔</span><span class="delete">🗑</span>`;
    taskList.appendChild(newTask);

    const doneBtn = newTask.querySelector('.done');
    const deleteBtn = newTask.querySelector('.delete');

    doneBtn.addEventListener('click', () => {
      newTask.style.textDecoration = 'line-through';
      newTask.style.opacity = '0.6';
    });

    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(newTask);
    });
  }
});
