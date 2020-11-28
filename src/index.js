// forms
// listas
// marcação de itens na lista (to-do feito)
// requisições

// https://jsonplaceholder.typicode.com/
// To-do
// V listar as tarefas (listagem)
// - criação de tarefas (form)
// - tarefas completas

const API_URL = "https://jsonplaceholder.typicode.com/todos";

fetch(API_URL) // , { method: "GET" })
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    createListItems(data);
  });

let tarefasEl = document.querySelector("#todos");

/*
  Preenche a lista de tarefas no documento
   com um elemento para cada tarefa da lista
*/
function createListItems(tarefas) {
  for (let tarefa of tarefas) {
    addListItem(tarefa);
  }
}

function addListItem(tarefa) {
  let item = document.createElement("li");

  item.dataset["task"] = tarefa.id;

  let check = document.createElement("input");
  check.type = "checkbox";
  check.checked = tarefa.completed;

  let task = document.createElement("span");
  task.textContent = tarefa.title;

  item.appendChild(check);
  item.appendChild(task);

  tarefasEl.appendChild(item);
}

let formEl = document.querySelector("#form-add-task");
// console.log(formEl)

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  // console.log(event);
  //let form = event.target;
  let formData = new FormData(event.target);

  console.log(formData.get("task"));

  let task = {
    userId: 1,
    title: formData.get("task"),
    completed: false
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then((resp) => {
    if (resp.ok) {
      alert("Tarefa criada!");
      addListItem(task);
    } else {
      alert("Ocorreu um erro, a tarefa não foi criada!");
    }
  });

  // console.log(formData.get("color"));
});
