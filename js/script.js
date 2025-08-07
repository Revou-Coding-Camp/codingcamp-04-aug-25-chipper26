let todoList = [];

function validateForm() {
  const todoInput = document.getElementById('todo-input').value.trim();
  const dateInput = document.getElementById('date-input').value;

  if (todoInput === '' || dateInput === '') {
    alert('Please enter a task and a due date.');
  } else {
    addTodo(todoInput, dateInput);
    document.getElementById('todo-input').value = '';
    document.getElementById('date-input').value = '';
  }
}

function addTodo(task, date) {
  const todoItem = {
    task: task,
    date: date,
    status: 'Pending',
  };
  todoList.push(todoItem);
  displayTodos();
}

function displayTodos() {
  const tableBody = document.getElementById('todo-list');
  tableBody.innerHTML = '';

  if (todoList.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-gray-500 py-4">No task found.</td>
      </tr>`;
    return;
  }

  todoList.forEach((item, index) => {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-700 text-sm';

    row.innerHTML = `
      <td class="py-2 px-3">${item.task}</td>
      <td class="py-2 px-3">${item.date}</td>
      <td class="py-2 px-3">${item.status}</td>
      <td class="py-2 px-3">
        <button onclick="deleteTodo(${index})" class="text-red-400 hover:text-red-600 text-sm">
          🗑️
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  displayTodos();
}

function clearTodos() {
  todoList = [];
  displayTodos();
}

// ✅ GANTI: Tombol FILTER sekarang munculin input tanggal
document.getElementById('filter-button').addEventListener('click', function () {
  const filterInput = document.getElementById('filter-date');
  if (filterInput) {
    filterInput.classList.toggle('hidden');
  }
});

// ✅ NEW: Filter berdasarkan tanggal
function filterByDate() {
  const selectedDate = document.getElementById('filter-date').value;

  if (!selectedDate) {
    displayTodos();
    return;
  }

  const filtered = todoList.filter(item => item.date === selectedDate);
  renderFilteredTodos(filtered);
}

function renderFilteredTodos(filteredList) {
  const tableBody = document.getElementById('todo-list');
  tableBody.innerHTML = '';

  if (filteredList.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-gray-500 py-4">No matching tasks.</td>
      </tr>`;
    return;
  }

  filteredList.forEach((item, index) => {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-700 text-sm';

    row.innerHTML = `
      <td class="py-2 px-3">${item.task}</td>
      <td class="py-2 px-3">${item.date}</td>
      <td class="py-2 px-3">${item.status}</td>
      <td class="py-2 px-3">
        <button onclick="deleteTodo(${index})" class="text-red-400 hover:text-red-600 text-sm">
          🗑️
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

