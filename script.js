const textInput = document.querySelector('#textInput');
const saveBtn = document.querySelector('#saveBtn');
const taskList = document.querySelector('#taskList');
const allBtn = document.querySelector('#allBtn');
const completedBtn = document.querySelector('#completedBtn');
const pendingBtn = document.querySelector('#pendingBtn');

let tasks = [];
let currentFilter = 'all';

const taskTemplate = (text, index, completed) => {
    const completedClass = completed ? 'line-through' : '';
    const checked = completed ? 'checked' : '';
    return `
    <div class="border h-[40px] px-[8px] my-3 flex items-center justify-between" id='${index}'>
        <label class="inline-flex items-center">
            <input type="checkbox" class="mr-[10px]" ${checked} onchange="toggleComplete(${index})">
            <span class="text-[12px] ${completedClass}">${text}</span>
        </label>
        <div class="flex items-center">
            <button onclick="edit(${index})" class="inline-flex items-center justify-center rounded-[5px] bg-[#0085FF] size-[20px] mr-[8px]"><i class="text-[10px] fa fa-pen text-white"></i></button>
            <button onclick="deleteTask(${index})" class="inline-flex items-center justify-center rounded-[5px] bg-[#FF0000] size-[20px]"><i class="text-[10px] fa fa-trash text-white"></i></button>
        </div>
    </div>
    `;
}

function edit(index) {
    const taskElement = document.getElementById(index);
    const spanElement = taskElement.querySelector('span');
    const currentText = spanElement.textContent;
    textInput.value = currentText;
    textInput.setAttribute('data-index', index);
    textInput.focus();
}

function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') {
            return true;
        } else if (currentFilter === 'completed') {
            return task.completed;
        } else if (currentFilter === 'pending') {
            return !task.completed;
        }
    });
    filteredTasks.forEach((task, index) => {
        taskList.innerHTML += taskTemplate(task.text, index, task.completed);
    });
}

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const taskText = textInput.value.trim();
    const index = textInput.getAttribute('data-index');
    if (taskText !== '') {
        if (index !== null) {
            tasks[index] = { text: taskText, completed: false }; 
        } else {
            tasks.unshift({ text: taskText, completed: false });
        }
        renderTasks();
        textInput.value = '';
        textInput.removeAttribute('data-index');
    }
});

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    if(confirm('Bu todo silinsin?')){
        tasks.splice(index, 1);
        renderTasks();
    }
}

allBtn.addEventListener('click', () => {
    currentFilter = 'all';
    renderTasks();
    updateFilterButtonStyles();
});

completedBtn.addEventListener('click', () => {
    currentFilter = 'completed';
    renderTasks();
    updateFilterButtonStyles();
});

pendingBtn.addEventListener('click', () => {
    currentFilter = 'pending';
    renderTasks();
    updateFilterButtonStyles();
});

function updateFilterButtonStyles() {
    allBtn.classList.toggle('bg-[#8F8F8F]', currentFilter === 'all');
    allBtn.classList.toggle('text-white', currentFilter === 'all');
    completedBtn.classList.toggle('bg-[#8F8F8F]', currentFilter === 'completed');
    completedBtn.classList.toggle('text-white', currentFilter === 'completed');
    pendingBtn.classList.toggle('bg-[#8F8F8F]', currentFilter === 'pending');
    pendingBtn.classList.toggle('text-white', currentFilter === 'pending');
}

renderTasks();
updateFilterButtonStyles();