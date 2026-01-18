const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");

let todos = [];

addBtn.addEventListener("click", addTodo);

function addTodo() {
  const todo = todoInput.value.trim();
  if (todo === "") {
    alert("할 일을 입력하세요");
    return;
  }
  todos.push(todo); // todos 배열에 새로운 todo 추가
  todoInput.value = ""; // todo 추가하고 난 뒤 input창 초기화
  saveTodos(); // localStorage에 저장
  renderTodos(); // todos를 화면에 그려주기
}

// todo 목록을 list 태그에 그려주기
function renderTodos() {
  todoList.innerHTML = "";

  for (const [index, todo] of todos.entries()) {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = todo;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => deleteTodo(index));

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
