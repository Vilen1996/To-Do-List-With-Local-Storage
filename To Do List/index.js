const text = document.querySelector("#todo-text");
const time = document.querySelector("#todo-time");
const savebtn = document.querySelector("#save-btn");
const list = document.querySelector("#todo-list");
const filterSelect = document.querySelector("#filter");

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTaskToDOM(task.text, task.time, task.done);
  });
}

function deleteToDo() {
  this.remove();
  saveTasks();
}

function handleComplete(element, btn) {
  element.classList.toggle("done");
  btn.innerText = element.classList.contains("done") ? "cancel" : "complete";
  saveTasks();
}

savebtn.onclick = () => {
  if (!text.value.trim()) {
    return text.classList.add("error");
  }
  text.classList.remove("error");
  addTaskToDOM(text.value, time.value, false);
  saveTasks();
  text.value = "";
  time.value = "";
};

filterSelect.onchange = () => {
  switch (filterSelect.value) {
    case "Completed":
      document
        .querySelectorAll(".hide")
        .forEach((x) => x.classList.remove("hide"));
      document
        .querySelectorAll(".todo:not(.done)")
        .forEach((x) => x.classList.add("hide"));
      break;
    case "All":
      document
        .querySelectorAll(".hide")
        .forEach((x) => x.classList.remove("hide"));
      break;
    case "Active":
      document
        .querySelectorAll(".hide")
        .forEach((x) => x.classList.remove("hide"));
      document
        .querySelectorAll(".done")
        .forEach((x) => x.classList.add("hide"));
      break;
  }
};

function addTaskToDOM(textValue, timeValue, done) {
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.innerText = textValue;
  p.style.textAlign = "center";
  p.style.fontSize = "20px";
  let timeP = document.createElement("p");
  timeP.innerText = timeValue;
  div.append(p);
  div.append(timeP);
  div.classList.add("todo");
  if (done) {
    div.classList.add("done");
  }

  let btnDel = document.createElement("button");
  btnDel.innerText = "X";

  let btnComplete = document.createElement("button");
  btnComplete.innerText = done ? "cancel" : "complete";

  div.append(btnDel);
  div.append(btnComplete);
  btnComplete.onclick = () => handleComplete(div, btnComplete);
  btnDel.onclick = deleteToDo.bind(div);
  list.prepend(div);
}

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll(".todo")).map((todo) => {
    return {
      text: todo.querySelector("p").innerText,
      time: todo.querySelector("p:nth-child(2)").innerText,
      done: todo.classList.contains("done"),
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
