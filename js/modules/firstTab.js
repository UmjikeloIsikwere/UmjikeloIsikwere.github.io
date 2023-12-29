const inputElement = document.querySelector(`[data-upload]`);

// Подписываемся на загрузку файла
inputElement.addEventListener("change", handleFiles);

document.body.addEventListener("tabChanged", (e) => {
  if (e.detail.newTab == 0 && structure.length > 0 && userData.length > 0) {
    generateTable(structure, userData, "[data-table]");
  }
});

// Как только файл загрузился - обрабатываем его
function handleFiles() {
  const fileList = this.files;
  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(fileList[0]);
}

// Делим загруженный CSV файл на структуру и учеников
function handleFileLoad(event) {
  let fileData = event.target.result;

  fileData = fileData.split("\r\n");
  structure = fileData.shift().split(";");
  fileData.forEach((user) => {
    data = {};
    user = user.split(";");
    user.forEach((field, i) => {
      data[structure[i]] = field;
    });
    userData.push(data);
  });
  generateTable(structure, userData, "[data-table]");
}
