document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const tagInput = document.getElementById("tag-input");
  const dateInput = document.getElementById("date-input");
  const taskList = document.getElementById("task-list");
  const taskCounter = document.getElementById("task-counter");

  // Carregar tarefas do localStorage <=
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  renderTasks();

  // Criar tarefa <=
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTask = {
      name: taskInput.value.trim(),
      tag: tagInput.value.trim(),
      date: dateInput.value,
      completed: false,
    };

    if (!newTask.name) return;

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    form.reset();
  });

  // Renderizar lista
  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task-item";
      if (task.completed) li.classList.add("completed");

      li.innerHTML = `
        <div class="task-info">
          <p><strong>${task.name}</strong></p>
          ${task.tag ? `<small>🏷️ ${task.tag}</small><br>` : ""}
          ${task.date ? `<small>📅 ${task.date}</small>` : ""}
        </div>

        <button data-index="${index}" class="btn-toggle" aria-label="Marcar tarefa como concluída">
          ${task.completed ? "✔️ Check" : "Concluir"}
        </button>
      `;

      taskList.appendChild(li);
    });

    updateCounter();
    bindToggleEvents();
  }

  // Toggle de conclusão
  function bindToggleEvents() {
    document.querySelectorAll(".btn-toggle").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      });
    });
  }

  // Atualizar contador <=
  function updateCounter() {
    const completed = tasks.filter((t) => t.completed).length;
    const total = tasks.length;

    if (total === 0) {
      taskCounter.textContent = "Nenhuma tarefa adicionada";
    } else if (completed === 0) {
      taskCounter.textContent = `${total} ${total === 1 ? "tarefa" : "tarefas"} pendente(s)`;
    } else {
      taskCounter.textContent = `${completed} de ${total} ${total === 1 ? "tarefa" : "tarefas"} concluída(s)`;
    }
  }

  // Salvar no localStorage <=
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});