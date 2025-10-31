const addButton = document.querySelector('.task-input');
const taskList = document.querySelector('.task-list');
const mptMsg = document.createElement('p');
mptMsg.classList.add('empty-msg');
mptMsg.textContent = 'You have NO GOALS, loser!';
taskList.appendChild(mptMsg);

const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const popupInput = document.querySelector('.popup-input');
const popupAdd = document.querySelector('.popup-add');
const popupCancel = document.querySelector('.popup-cancel');

const perc = document.querySelector('.percentage');
const fdbk = document.querySelector('.perc-fdback');

function updateProgress() {
  const tasks = taskList.querySelectorAll('.task');
  const total = tasks.length;

  if (total === 0) {
    perc.textContent = "You didn't do shit bruv!";
    fdbk.textContent = '';
    return;
  }

  let doneCount = 0;
  tasks.forEach(task => {
    if (task.style.textDecoration === 'line-through') doneCount++;
  });

  const percentage = Math.round((doneCount / total) * 100);
  perc.textContent = `${percentage}%`;

  if (percentage === 100) {
    fdbk.textContent = "All done, finally!";
  } else if (percentage > 0) {
    fdbk.textContent = "Keep going, bruv!";
  } else {
    fdbk.textContent = '';
  }
}

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
  if (e.key === 'Enter') popupAdd.click();
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
    updateProgress();
  });

  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(newTask);
    if (taskList.querySelectorAll('.task').length === 0) {
      taskList.appendChild(mptMsg);
    }
    updateProgress();
  });

  updateProgress();
});
