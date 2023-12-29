const subjectLists = [
  "informatics",
  "physics",
  "mathemathics",
  "literature",
  "music",
];
let chartInit = false;
let chartSubjectsData = {};
let globalChart;

// Слушаем события смены вкладки, делаем что-то если выбрана текущая
// У нас есть флаг, инициализация графиков происходит только если пришли впервые,
// дальше мы только обновляем существующий график
document.body.addEventListener("tabChanged", (e) => {
  if (e.detail.newTab == 3 && structure.length > 0 && userData.length > 0) {
    if (!chartInit) {
      globalChart = initFourthTab();
    } else {
      updateChart();
    }
  }
});

// Заготовка конфигурации для библиотеки с графиками
let chartConfigBoilerplate = {
  type: "bar",
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
      },
    },
  },
};

// Подсчитываем данные впервые, навешиваем слушателей на все кнопочки, и инициализируем график
function initFourthTab() {
  const chart = document.querySelector("[data-chart-wrapper]");
  const buttonsList = document.querySelectorAll("[data-switch-to]");

  subjectLists.forEach((subject) => {
    let processedChartsData = processDataCharts(subject);
    chartSubjectsData[subject] = processedChartsData;
  });

  let cData = {
    labels: chartSubjectsData.informatics.processedLabels,
    datasets: [],
  };

  cData.datasets.push({
    label: "Средняя оценка",
    data: chartSubjectsData.informatics.processedData,
    borderWidth: 1,
    backgroundColor: '#ee7538'
  });
  console.log(cData);

  chartConfigBoilerplate.data = cData;
  chartConfigBoilerplate.options.plugins.title.text = "informatics";
  const ctx = chart.querySelector("canvas");
  chartInit = true;

  buttonsList.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("switch");
      updateChart(button.dataset.switchTo);
    });
  });

  return new Chart(ctx, chartConfigBoilerplate);
}

// Подсчитываем среднюю оценку для каждой пары класс-предмет
function processDataCharts(chartSubject) {
  const classSet = new Set();
  let processedData = [];
  userData.forEach((user) => {
    classSet.add(user.class);
  });
  const processedLabels = [...classSet];
  processedLabels.forEach((className) => {
    let subjectValues = [];
    userData.forEach((user) => {
      if (user.class == className) {
        subjectValues.push(Number(user[chartSubject]));
      }
    });
    processedData.push(average(subjectValues));
  });

  return { processedLabels, processedData };
}

// Обновляем график под необходимый предмет, вызывается по нажатию на кнопку
function updateChart(updateSubject = "informatics") {
  chartSubjectsData = {};
  subjectLists.forEach((subject) => {
    let processedChartsData = processDataCharts(subject);
    chartSubjectsData[subject] = processedChartsData;
  });

  let data = {}
  data.datasets = [
    {
      label: "Средняя оценка",
      data: chartSubjectsData[updateSubject].processedData,
      borderWidth: 1,
      backgroundColor: '#ee7538',
    },
  ];

  globalChart.data.datasets = data.datasets;
  globalChart.data.labels = chartSubjectsData[updateSubject].processedLabels;
  globalChart.options.plugins.title.text = updateSubject;
  globalChart.update();
}
