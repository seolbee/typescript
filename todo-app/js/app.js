var todo_list = [];
var todo_form = document.querySelector('.todo_form');
var todo_content = document.querySelector('#todo_content');
var todo_list_box = document.querySelector('.todo_list');
function insertTodo(todo) {
    todo_list.push(todo);
    loadTodoList();
}
function TodoListTemplate(todo) {
    return "\n        <div class=\"todo\">\n            <p>" + todo.content + "</p>\n            <button onclick=\"deleteTodo(" + todo.id + ")\">\uC0AD\uC81C\uD558\uAE30</button>\n        </div>\n    ";
}
function loadTodoList() {
    todo_list_box.innerHTML = '';
    todo_list.forEach(function (todo) {
        todo_list_box.innerHTML += TodoListTemplate(todo);
    });
}
function deleteTodo(id) {
    todo_list = todo_list.filter(function (todo) { return todo.id != id; });
    loadTodoList();
}
todo_form.addEventListener("submit", function (e) {
    e.preventDefault();
    insertTodo(new Todo(todo_list.length + 1, todo_content.value));
    todo_content.value = "";
});
