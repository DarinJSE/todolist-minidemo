const addButton = document.querySelector('.task-input');
const taskList = document.querySelector('.task-list');

const mptMsg = document.createElement('p');
mptMsg.classList.add('empty-msg');
mptMsg.textContent = 'You have NO GOALS, loser!';
taskList.appendChild(mptMsg);

addButton.addEventListener('click', () => {
  const taskText = prompt("What's your intention?");
  if (taskText) {

    if (taskList.contains(mptMsg)) {
      taskList.removeChild(mptMsg);
    }
    

    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.innerHTML = `${taskText} <div class="ddl"><span class="done">✔</span><span class="delete">🗑</span></div>`;
    taskList.appendChild(newTask);

    const doneBtn = newTask.querySelector('.done');
    const deleteBtn = newTask.querySelector('.delete');

    doneBtn.addEventListener('click', () => {
      newTask.style.textDecoration = 'line-through';
      newTask.style.opacity = '0.6';
    });

    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(newTask);

      if (taskList.querySelectorAll('.task').length === 0) {
        taskList.appendChild(mptMsg);
      }
    });
  }
});
