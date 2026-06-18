const htmlElement = document.documentElement;
const taskForm = document.querySelector("#taskForm");
const taskDialog = document.querySelector("#taskDialog");
const openTaskDialog = document.querySelector("#openTaskDialog");
const closeTaskDialog = document.querySelector("#closeTaskDialog");
const cancelTaskDialog = document.querySelector("#cancelTaskDialog");
const taskTitleInput = document.querySelector("#taskTitle");
const taskCategorySelect = document.querySelector("#taskCategory");
const taskList = document.querySelector("#taskList");
const taskNotice = document.querySelector("#taskNotice");
const themeToggle = document.querySelector("#themeToggle");
const compareValueButton = document.querySelector("#compareValueButton");
const taskSearch = document.querySelector("#taskSearch");
const categoryFilter = document.querySelector("#categoryFilter");

let taskIdCounter = 1;
let activeSearch = "";
let activeCategory = "all";

taskForm.addEventListener("submit", handleTaskSubmit);
openTaskDialog.addEventListener("click", showTaskDialog);
closeTaskDialog.addEventListener("click", hideTaskDialog);
cancelTaskDialog.addEventListener("click", hideTaskDialog);
taskDialog.addEventListener("click", closeDialogFromBackdrop);
taskList.addEventListener("click", handleTaskAction);
themeToggle.addEventListener("click", toggleTheme);
compareValueButton.addEventListener("click", compareInputValue);
taskSearch.addEventListener("input", handleSearch);
categoryFilter.addEventListener("change", handleFilter);

setupPropagationDemo();
createStarterTask();

function handleTaskSubmit(event) {
  event.preventDefault();

  const title = taskTitleInput.value.trim();
  const category = taskCategorySelect.value;

  if (!title) {
    updateNotice("Please enter a task title.");
    return;
  }

  const taskCard = createTaskCard(title, category);

  // prepend() places the newest task at the top of the list.
  taskList.prepend(taskCard);

  updateNotice(`Task "${title}" was added.`);
  taskForm.reset();
  hideTaskDialog();
  openTaskDialog.focus();
  applyFilters();
}

function showTaskDialog() {
  taskDialog.showModal();
  taskTitleInput.focus();
}

function hideTaskDialog() {
  taskDialog.close();
}

function closeDialogFromBackdrop(event) {
  if (event.target === taskDialog) {
    hideTaskDialog();
  }
}

function createStarterTask() {
  const taskCard = createTaskCard("Open console and test event propagation", "study");

  // append() adds the starter card as the first item when the page loads.
  taskList.append(taskCard);

  const hint = document.createElement("p");
  hint.className = "notice";
  hint.textContent = "Try completing, editing, deleting, searching, and filtering tasks.";

  // before() inserts this hint before the task list.
  taskList.before(hint);
}

function createTaskCard(title, category) {
  const taskCard = document.createElement("article");
  const titleNode = document.createElement("h3");
  const titleText = document.createTextNode(title);
  const meta = document.createElement("div");
  const idPill = document.createElement("span");
  const categoryPill = document.createElement("span");
  const statusPill = document.createElement("span");
  const actions = document.createElement("div");

  const taskId = String(taskIdCounter);
  taskIdCounter += 1;

  taskCard.className = "task-card";

  // Custom data attributes can be inspected in HTML and accessed through dataset.
  taskCard.setAttribute("data-id", taskId);
  taskCard.setAttribute("data-status", "active");
  taskCard.setAttribute("data-category", category);

  titleNode.className = "task-title";
  titleNode.appendChild(titleText);

  meta.className = "task-meta";
  idPill.className = "pill";
  categoryPill.className = "pill";
  statusPill.className = "pill";
  statusPill.dataset.role = "status-label";

  idPill.textContent = `ID ${taskCard.getAttribute("data-id")}`;
  categoryPill.textContent = category;
  statusPill.textContent = taskCard.dataset.status;

  actions.className = "task-actions";
  actions.append(
    createActionButton("edit", "Edit"),
    createActionButton("complete", "Complete"),
    createActionButton("delete", "Delete")
  );

  meta.append(idPill, categoryPill, statusPill);
  taskCard.append(meta, titleNode, actions);

  return taskCard;
}

function createActionButton(action, label) {
  const button = document.createElement("button");
  button.className = "task-action";
  button.type = "button";
  button.dataset.action = action;
  button.textContent = label;
  return button;
}

function handleTaskAction(event) {
  const actionButton = event.target.closest("[data-action]");

  if (!actionButton) {
    return;
  }

  const taskCard = actionButton.closest(".task-card");
  const action = actionButton.dataset.action;

  if (action === "delete") {
    deleteTask(taskCard);
  }

  if (action === "complete") {
    completeTask(taskCard);
  }

  if (action === "edit") {
    editTask(taskCard);
  }
}

function deleteTask(taskCard) {
  const taskTitle = taskCard.querySelector(".task-title").textContent;

  // after() shows a temporary message exactly where the deleted card was.
  const deleteMessage = document.createElement("p");
  deleteMessage.className = "notice";
  deleteMessage.textContent = `Deleted "${taskTitle}".`;
  taskCard.after(deleteMessage);

  // remove() deletes the task card from the DOM.
  taskCard.remove();

  setTimeout(() => deleteMessage.remove(), 1800);
  updateNotice("Task deleted.");
}

function completeTask(taskCard) {
  const nextStatus = taskCard.dataset.status === "complete" ? "active" : "complete";

  taskCard.dataset.status = nextStatus;
  taskCard.setAttribute("aria-label", `Task is ${nextStatus}`);

  const statusLabel = taskCard.querySelector('[data-role="status-label"]');
  statusLabel.textContent = nextStatus;

  const completeButton = taskCard.querySelector('[data-action="complete"]');
  completeButton.textContent = nextStatus === "complete" ? "Undo" : "Complete";

  updateNotice(`Task marked ${nextStatus}.`);
}

function editTask(taskCard) {
  const titleElement = taskCard.querySelector(".task-title");
  const oldTitle = titleElement.textContent;
  const newTitle = window.prompt("Edit task title:", oldTitle);

  if (newTitle === null || newTitle.trim() === "") {
    updateNotice("Edit cancelled.");
    return;
  }

  const replacementTitle = document.createElement("h3");
  replacementTitle.className = "task-title";
  replacementTitle.textContent = newTitle.trim();

  // replaceWith() swaps the old heading node with the new edited heading node.
  titleElement.replaceWith(replacementTitle);

  updateNotice(`Task renamed to "${newTitle.trim()}".`);
  applyFilters();
}

function toggleTheme() {
  const nextTheme = htmlElement.dataset.theme === "dark" ? "light" : "dark";

  htmlElement.classList.toggle("dark-mode", nextTheme === "dark");
  htmlElement.dataset.theme = nextTheme;

  // setAttribute() keeps the custom data attribute visible in the Elements panel.
  htmlElement.setAttribute("data-theme", nextTheme);
  themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
  themeToggle.textContent = nextTheme === "dark" ? "Light" : "Dark";
}

function compareInputValue() {
  /*
    Attribute vs Property:
    - getAttribute("value") reads the original value written in the HTML attribute.
    - input.value reads the current live property, which changes when the user types.
  */
  console.log("taskTitleInput.getAttribute('value'):", taskTitleInput.getAttribute("value"));
  console.log("taskTitleInput.value:", taskTitleInput.value);

  if (taskTitleInput.hasAttribute("data-compared")) {
    taskTitleInput.removeAttribute("data-compared");
    updateNotice("Removed data-compared attribute from the title input.");
  } else {
    taskTitleInput.setAttribute("data-compared", "true");
    updateNotice("Added data-compared attribute to the title input. Check the console.");
  }
}

function handleSearch(event) {
  activeSearch = event.target.value.trim().toLowerCase();
  applyFilters();
}

function handleFilter(event) {
  activeCategory = event.target.value;
  applyFilters();
}

function applyFilters() {
  const taskCards = taskList.querySelectorAll(".task-card");

  taskCards.forEach((taskCard) => {
    const title = taskCard.querySelector(".task-title").textContent.toLowerCase();
    const categoryMatches = activeCategory === "all" || taskCard.dataset.category === activeCategory;
    const searchMatches = title.includes(activeSearch);

    taskCard.hidden = !(categoryMatches && searchMatches);
  });
}

function updateNotice(message) {
  taskNotice.textContent = message;
}

function setupPropagationDemo() {
  const grandparent = document.querySelector("#grandparentBox");
  const parent = document.querySelector("#parentBox");
  const child = document.querySelector("#childButton");

  /*
    Event capturing runs from outer element to inner element:
    Grandparent -> Parent -> Child.
  */
  grandparent.addEventListener("click", () => console.log("Capturing: Grandparent"), true);
  parent.addEventListener("click", () => console.log("Capturing: Parent"), true);
  child.addEventListener("click", () => console.log("Capturing: Child"), true);

  /*
    Event bubbling runs from inner element back to outer element:
    Child -> Parent -> Grandparent.
  */
  grandparent.addEventListener("click", () => console.log("Bubbling: Grandparent"));
  parent.addEventListener("click", () => console.log("Bubbling: Parent"));
  child.addEventListener("click", () => console.log("Bubbling: Child"));
}
