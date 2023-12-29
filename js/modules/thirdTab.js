// Структура таблицы для статистики
const statStructure = ["class", "average", "median", "quantity", "5%","4%","3%","2%"];
let subjectsData = {};

// Слушаем события смены вкладки, делаем что-то если выбрана текущая
document.body.addEventListener("tabChanged", (e) => {
    if (e.detail.newTab == 2 && structure.length > 0 && userData.length > 0) {
        initThirdTab();
    }
});

// Находим все таблицы, и пересчитываем в них данные, как только пришли на вкладку,
// что бы показывать всегда актуальную информацию
function initThirdTab() {
    const subjectTables = document.querySelectorAll('[data-table-subject]');
    subjectTables.forEach(table => {
        const subjectId = table.dataset.tableSubject;
        const newData = prepareData(subjectId);
        subjectsData[subjectId] = newData;
        generateTable(statStructure, newData, `[data-table-subject="${subjectId}"]`);
    })
}

// Подготовка информации для таблиц, собираем все классы
// потом проходимся по ним, и для каждой пары класс-предмет
// собираем оценки учеников
function prepareData(subjectId) {
    const classSet = new Set();
    let processedData = [];
    userData.forEach(user => {
        classSet.add(user.class);
    })
    const uniqueClasses = [...classSet];
    uniqueClasses.forEach(className => {
        let subjectValues = [];
        userData.forEach(user => {
            if(user.class == className) {
                subjectValues.push(Number(user[subjectId]));
            }
        })
        processedData.push({
            subjectClass: className,
            subjectAverage: average(subjectValues),
            subjectMedian: median(subjectValues),
            subjectStudents: subjectValues.length,
            percents_five: calculatePercents(5,subjectValues),
            percents_four: calculatePercents(4,subjectValues),
            percents_three: calculatePercents(3,subjectValues),
            percents_two: calculatePercents(2,subjectValues),
        })
    })
    return processedData;
}
