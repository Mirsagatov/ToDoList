const elTodoList = selectElement('.todo-list');
const elTodoTemplate = selectElement('#todo-item--template').content;

//form element
const elForm = selectElement('.todo-form');
const elInputTodo = selectElement('.todo-input', elForm);

const todosArr = [];

function deleteTodo(evt) {
    const todoId = evt.target.dataset.todoId;


    const foundTodoIndex = todosArr.findIndex(item => item.id == todoId);

    todosArr.splice(foundTodoIndex, 1);//todosArr dan olib tashlandi

    renderTodos(todosArr, elTodoList);// qayta render qilindi
}


function completeTodo(evt) {
    const todoId = evt.target.dataset.todoId;
    const foundTodoElement = todosArr.find(item => item.id == todoId);
    
    foundTodoElement.isCompleted = !foundTodoElement.isCompleted;

    renderTodos(todosArr, elTodoList);
    
}


function renderTodos(todosArr, element) {
    element.innerHTML = null;

    todosArr.forEach((todo) => {

        const todoTemplate = elTodoTemplate.cloneNode(true);

        // console.log(todoTemplate);
        const todoTitleSpan = selectElement('.todo-item-complete-text', todoTemplate);
        const todoDeleteBtn = selectElement('.todo-item-delete-btn', todoTemplate);
        const todoCompleteInput = selectElement('.todo-input-complete', todoTemplate);
        
        todoTitleSpan.textContent = todo.title;
        todoDeleteBtn.dataset.todoId = todo.id;
        todoCompleteInput.checked = todo.isCompleted;
        todoCompleteInput.dataset.todoId = todo.id;

        if(todo.isCompleted == true) {
            todoTitleSpan.setAttribute("class", "delete");
        }

        todoDeleteBtn.addEventListener('click', deleteTodo);
        todoCompleteInput.addEventListener('click', completeTodo);

        element.appendChild(todoTemplate);//template o'zini append qilish kifoya, har bitta elementni qilish shartmas
    });
}


elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const inputTodo = elInputTodo.value.trim();

    const uniqueId = todosArr[todosArr.length-1] ? todosArr[todosArr.length-1].id+1 :1;

    todosArr.push({
        id: uniqueId,
        title: inputTodo,
        isCompleted: false,//key har doim false bo'ladi, chunki bitta todoni yaratishdan keyin qilinmidiyu
    });//har submit bo'votkanda bittadan obyekt push bo'vottti arrayga
    
     console.log(todosArr);
    renderTodos(todosArr, elTodoList);

    elInputTodo.value = null;
});



