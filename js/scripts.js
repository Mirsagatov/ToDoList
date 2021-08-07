const elToDoList = selectElement('.todo-list');
const elToDoTemplate = selectElement('#todo-item--template').content;

//form element
const elForm = selectElement('.todo-form');
const elInput = selectElement('.todo-input', elForm);


const todoArr =[];

elForm.addEventListener("submit",(evt) => {
    evt.preventDefault();

    todoArr.push({
        id: todoArr.length,
        title: elInput.value.trim(),
        isCompleted: true,
    });
    console.log(todoArr);
    renderToDo(todoArr, elToDoList);

});

function renderToDo(todoArr, element) {
    element.innerHTML = null;

    todoArr.forEach(todoelement => {
        const todoTemplate = elToDoTemplate.cloneNode(true);

        selectElement('.todo-item-complete-text', elToDoTemplate).textContent = todoelement.title;
        element.appendChild(todoTemplate);
    });
    
}
