const addButton = document.querySelector('.task-input');
const taskList = document.querySelector('.task-list');
const mptMsg = document.createElement('p');
mptMsg.classList.add('empty-msg');
mptMsg.textContent = 'You have NO GOALS, loser!';
taskList.appendChild(mptMsg);

const popup = document.querySelector('.popup');
const popupInput = document.querySelector('.popup-input');
const popupAdd = document.querySelector('.popup-add');
const popupCancel = document.querySelector('.popup-cancel');
const overlay = document.querySelector('.overlay');

addButton.addEventListener('click', () => {
  popup.classList.remove('hide');
  overlay.classList.remove('hide');
  popupInput.focus();
});

popupCancel.addEventListener('click', () => {
  popup.classList.add('hide');
  overlay.classList.add('hide');
  popupInput.value = '';
});

popupInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    popupAdd.click();
    overlay.classList.add('hide');
  }
});


popupAdd.addEventListener('click', () => {
  const taskText = popupInput.value.trim();
  if (!taskText) return;

  if (taskList.contains(mptMsg)) taskList.removeChild(mptMsg);

  const newTask = document.createElement('div');
  newTask.classList.add('task');
  newTask.innerHTML = `
    ${taskText}
    <div class="ddl">
      <span class="done">✔</span>
      <span class="delete">🗑</span>
    </div>
  `;
  taskList.appendChild(newTask);
  popupInput.value = '';
  popup.classList.add('hide');
  overlay.classList.add('hide');

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
});
