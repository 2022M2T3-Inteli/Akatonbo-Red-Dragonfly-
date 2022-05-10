const ctx = document.getElementById("hrChart").getContext("2d");

const MONTHS = [
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function months(config) {
  var cfg = config || {};
  var count = cfg.count || 12;
  var section = cfg.section;
  var values = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}

const generateLabels = () => {
  return months({ count: 16 });
};

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

const data = {
  labels: generateLabels(),
  datasets: [
    {
      label: "Limitação com recursos internos",
      data: [
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100,
      ],
      borderColor: CHART_COLORS.green,
      backgroundColor: CHART_COLORS.green,
      hidden: false,
      fill: false,
      pointRadius: 0,
    },
    {
      label: "Limitação com recursos internos + externos",
      data: [
        400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400,
        400, 400, 400,
      ],
      borderColor: CHART_COLORS.purple,
      backgroundColor: CHART_COLORS.purple,
      hidden: false,
      fill: false,
      pointRadius: 0,
    },
    {
      label: "Capacidade necessária",
      data: [
        510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510, 510,
        510, 510, 510,
      ],
      borderColor: CHART_COLORS.yellow,
      backgroundColor: CHART_COLORS.yellow,
      hidden: false,
      fill: false,
      pointRadius: 0,
    },
    {
      label: "Horas alocadas atualmente",
      data: [
        330, 330, 430, 510, 510, 510, 510, 510, 430, 410, 350, 310, 310, 310,
        310, 150, 150,
      ],
      borderColor: CHART_COLORS.blue,
      backgroundColor: CHART_COLORS.blue,
      hidden: false,
      fill: "origin",
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: "",
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Horas",
        },
      },
      x: {
        title: {
          display: true,
          text: "Mês",
        },
      },
    },
    legend: {
      display: false,
    },
  },
};

const hrChart = new Chart(ctx, config);
