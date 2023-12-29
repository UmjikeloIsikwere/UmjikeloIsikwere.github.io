// Глобальные переменные
let userData = [];
let structure = [];

// Функция для создания структуры таблицы, и вывода её пользователю
// Принимает структуру таблицы, информацию, куда выводить, и нужны ли кнопки редактирования
function generateTable(structure, userData, selector, editable = false) {
  let receiver = document.querySelector(selector);
  receiver.replaceChildren();

  let table = document.createElement(`table`);
  let thead = document.createElement(`thead`);
  let thead_tr = document.createElement(`tr`);

  structure.forEach((e) => {
    let row = document.createElement(`th`);
    row.textContent = e;
    thead_tr.appendChild(row);
  });

  if (editable) {
    let actionHeader = document.createElement(`th`);
    actionHeader.textContent = "Action";
    thead_tr.appendChild(actionHeader);
  }

  thead.appendChild(thead_tr);
  table.appendChild(thead);
  let tbody = document.createElement(`tbody`);

  userData.forEach((user, index) => {
    let row = document.createElement(`tr`);
    Object.values(user).forEach((e) => {
      let item = document.createElement(`td`);
      item.textContent = e;
      row.appendChild(item);
    });

    if (editable) {
      let actionCell = document.createElement(`td`);

      let editButton = document.createElement(`button`);
      editButton.innerHTML = '<svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M30.133 1.552c-1.090-1.044-2.291-1.573-3.574-1.573-2.006 0-3.47 1.296-3.87 1.693-0.564 0.558-19.786 19.788-19.786 19.788-0.126 0.126-0.217 0.284-0.264 0.456-0.433 1.602-2.605 8.71-2.627 8.782-0.112 0.364-0.012 0.761 0.256 1.029 0.193 0.192 0.45 0.295 0.713 0.295 0.104 0 0.208-0.016 0.31-0.049 0.073-0.024 7.41-2.395 8.618-2.756 0.159-0.048 0.305-0.134 0.423-0.251 0.763-0.754 18.691-18.483 19.881-19.712 1.231-1.268 1.843-2.59 1.819-3.925-0.025-1.319-0.664-2.589-1.901-3.776zM22.37 4.87c0.509 0.123 1.711 0.527 2.938 1.765 1.24 1.251 1.575 2.681 1.638 3.007-3.932 3.912-12.983 12.867-16.551 16.396-0.329-0.767-0.862-1.692-1.719-2.555-1.046-1.054-2.111-1.649-2.932-1.984 3.531-3.532 12.753-12.757 16.625-16.628zM4.387 23.186c0.55 0.146 1.691 0.57 2.854 1.742 0.896 0.904 1.319 1.9 1.509 2.508-1.39 0.447-4.434 1.497-6.367 2.121 0.573-1.886 1.541-4.822 2.004-6.371zM28.763 7.824c-0.041 0.042-0.109 0.11-0.19 0.192-0.316-0.814-0.87-1.86-1.831-2.828-0.981-0.989-1.976-1.572-2.773-1.917 0.068-0.067 0.12-0.12 0.141-0.14 0.114-0.113 1.153-1.106 2.447-1.106 0.745 0 1.477 0.34 2.175 1.010 0.828 0.795 1.256 1.579 1.27 2.331 0.014 0.768-0.404 1.595-1.24 2.458z"></path></svg>';
      editButton.dataset.editIndex = index;
      editButton.addEventListener("click", editEventHandler);

      let deleteButton = document.createElement(`button`);
      deleteButton.innerHTML = '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="3 2 18 20"><path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      deleteButton.dataset.deleteIndex = index;
      deleteButton.addEventListener("click", deleteEventHandler);

      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);
    }

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  receiver.appendChild(table);
}

// Вычисление срденего значения
const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

// Вычисление медианы
function median(numbers) {
  const sorted = Array.from(numbers).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

// Вычисление процентов какой-либо оценки среди всех оценок
function calculatePercents (entry, array) {
  let count = 0;
  array.forEach(e=>{
    if (e == entry){
      count++
    }
  })
  return Math.round((count/array.length)*100);
}