// Task Tracker basic logic

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  const tasks = getTasks();
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.innerHTML = `
      <label class="custom-checkbox">
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-idx="${idx}">
        <span class="checkbox-box">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <polyline points="4 11 8 15 16 6" stroke="#18181b" stroke-width="2" fill="none"/>
          </svg>
        </span>
      </label>
      <span class="task-text">${task.text}</span>
      <button class="delete-btn" data-idx="${idx}">&times;</button>
    `;
    list.appendChild(li);
  });
  document.getElementById('clear-completed-btn').style.display =
    tasks.some(t => t.completed) ? 'inline-block' : 'none';
}

document.getElementById('add-task-btn').onclick = function() {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (!text) return;
  const tasks = getTasks();
  tasks.push({ text, completed: false });
  saveTasks(tasks);
  input.value = '';
  renderTasks();
};

document.getElementById('task-list').onclick = function(e) {
  const idx = e.target.getAttribute('data-idx');
  if (e.target.matches('input[type="checkbox"]')) {
    const tasks = getTasks();
    tasks[idx].completed = e.target.checked;
    saveTasks(tasks);
    renderTasks();
  } else if (e.target.matches('.delete-btn')) {
    const tasks = getTasks();
    tasks.splice(idx, 1);
    saveTasks(tasks);
    renderTasks();
  }
};

document.getElementById('clear-completed-btn').onclick = function() {
  let tasks = getTasks();
  tasks = tasks.filter(t => !t.completed);
  saveTasks(tasks);
  renderTasks();
};

// Initial render
renderTasks();
