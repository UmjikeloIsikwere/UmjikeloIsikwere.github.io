// Слушаем события смены вкладки, делаем что-то если выбрана текущая
document.body.addEventListener("tabChanged", (e) => {
  if (e.detail.newTab == 1 && structure.length > 0 && userData.length > 0) {
    generateTable(structure, userData, "[data-table-editable]", true);
  }
  initSecondTab();
});

// Подписываемся на события клика на кнопки добавить пользователя и редактировать
function initSecondTab() {
    document.querySelector('[data-add]').addEventListener('click', addNewUserEventHandler);
    document.querySelector('[data-save]').addEventListener('click', saveEventHandler);
    document.querySelector('[data-download]').addEventListener('click', saveDataHandler)
}

// Если нажали кнопку добавить - разблокируем все поля и кнопку сохранить, но блокируем кнопку добавления
function addNewUserEventHandler() {
    const form = document.querySelector('form');
    const elements = form.querySelectorAll('[data-reflect-field]');

    elements.forEach((e)=>{
        e.disabled = false;
    });
    
    const addButton = document.querySelector('[data-add]');
    addButton.disabled = true;

    const saveButton = document.querySelector('[data-save]');
    saveButton.disabled = false;
}

// Подписываемся на сохранение, если нет индекса пользователя, то просто добавляем нового, если есть - меняем существуюшего по индексу.
function saveEventHandler () {
    const form = document.querySelector('form');
    const elements = form.querySelectorAll('[data-reflect-field]');
    
    const addButton = document.querySelector('[data-add]');
    addButton.disabled = false;

    const saveButton = document.querySelector('[data-save]');
    saveButton.disabled = true;

    const formData = new FormData(form);
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    if(!isNaN(form.dataset.reflectId) && form.dataset.reflectId > 0) {
        userData[form.dataset.reflectId] = formDataObj;
    } else {
        userData.push(formDataObj);
        if(structure.length === 0) {
            structure = ["name","class","informatics","physics","mathemathics","literature","music"];
        }
    }

    elements.forEach((e) => {
        e.disabled = true;
        e.value = "";
    });
    form.dataset.reflectId = "";

    generateTable(structure, userData, "[data-table-editable]", true);
}

// Обработчик для редактирования, делаем то же самое что в создании нового пользователя, но предварительно заполняем все поля
// существующими данными, и выставляем индекс для формы, что бы функция созранения понимала что делать
function editEventHandler (e) {
    const indexToEdit = e.target.dataset.editIndex;
    const form = document.querySelector('form');
    const elements = form.querySelectorAll('[data-reflect-field]');

    elements.forEach((element) => {
        element.value = userData[indexToEdit][element.dataset.reflectField];
    })

    form.dataset.reflectId = indexToEdit;
    addNewUserEventHandler();
}

// Удаляем пользователя по клику
function deleteEventHandler (e) {
    const indexToRemove = e.target.dataset.deleteIndex;
    userData.splice(indexToRemove, 1);
    generateTable(structure, userData, "[data-table-editable]", true);
}

function saveDataHandler (_) {
    saveData(structure, userData, `export_${Math.round(Date.now()/1000)}.csv`);
}

// Сохранение файла
function saveData(structure, data, fileName) {
    let finalData = [structure];
    data.forEach(user => {
        let userArray = [];
        structure.forEach(field => {
            userArray.push(user[field]);
        })
        finalData.push(userArray);
    })
    finalData.forEach((arr, index) =>{
        finalData[index] = arr.join(";");
    })
    finalData = finalData.join("\r\n");
    const url = window.URL.createObjectURL(new Blob([finalData], {type: 'text/plain;charset=utf8'}));
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}