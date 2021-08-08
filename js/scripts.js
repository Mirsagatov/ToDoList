const elTodoList = selectElement('.todo-list');
const elTodoTemplate = selectElement('#todo-item--template').content;

//form element
const elForm = selectElement('.todo-form');
const elInputTodo = selectElement('.todo-input', elForm);

const localTodos = JSON.parse(window.localStorage.getItem('todos'));
const todosArr = localTodos || [];

function deleteTodo(evt) {
    const todoId = evt.target.dataset.todoId;


    const foundTodoIndex = todosArr.findIndex(item => item.id == todoId);

    todosArr.splice(foundTodoIndex, 1);//todosArr dan olib tashlandi

    window.localStorage.setItem('todos', JSON.stringify(todosArr));
    renderTodos(todosArr, elTodoList);// qayta render qilindi
}


function completeTodo(evt) {
    const todoId = evt.target.dataset.todoId;
    const foundTodoElement = todosArr.find(item => item.id == todoId);
    
    foundTodoElement.isCompleted = !foundTodoElement.isCompleted;

    window.localStorage.setItem('todos', JSON.stringify(todosArr));
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

        //nechta todos borligi qanchasi complated, qanchasi uncomplated ligi(chaqirdik htmldan)
        const todoAllCount = selectElement('.all-count');
        const todoComplatedCount = selectElement('.complated-count');
        const todoUncomplatedCount = selectElement('.uncomplated-count');
        
        todoTitleSpan.textContent = todo.title;
        todoDeleteBtn.dataset.todoId = todo.id;
        todoCompleteInput.checked = todo.isCompleted;
        todoCompleteInput.dataset.todoId = todo.id;

        todoDeleteBtn.addEventListener('click', deleteTodo);
        todoCompleteInput.addEventListener('click', completeTodo);

        
        if(todo.isCompleted == true) {
            todoTitleSpan.setAttribute("class", "delete");
        }
        

        let complatedTodos = 0;
        let uncomplatedTodos = 0;

        todosArr.forEach(todo => {
            if(todo.isCompleted == true) {
                complatedTodos += 1;
            }
            else {
                uncomplatedTodos += 1;
            }
        });

        todoAllCount.textContent = todosArr.length;
        todoComplatedCount.textContent = complatedTodos;
        todoUncomplatedCount.textContent = uncomplatedTodos;

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
    
    //  console.log(todosArr);
     window.localStorage.setItem('todos', JSON.stringify(todosArr));
    renderTodos(todosArr, elTodoList);

    elInputTodo.value = null;
});



renderTodos(todosArr, elTodoList);



