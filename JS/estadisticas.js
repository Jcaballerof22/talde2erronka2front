const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
      {
          label: 'Fully Rounded',
          data: [50, 75, 30, 40, 60, 80, 20],
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
      },
      {
          label: 'Small Radius',
          data: [30, 45, 20, 30, 50, 70, 10],
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
      }
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
      responsive: true,
      plugins: {
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: 'Chart.js Bar Chart'
          }
      }
  },
};

const ctx = document.getElementById('grafikoa').getContext('2d');
new Chart(ctx, config);
