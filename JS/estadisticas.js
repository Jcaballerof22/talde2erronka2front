const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
      {
          label: 'Limpieza',
          data: [50, 75, 30, 40, 60, 80, 20],
          borderColor: 'orange',
          backgroundColor: 'rgba(233, 152, 87, 0.5)',
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
      },
      {
          label: 'Recepción',
          data: [30, 45, 20, 30, 50, 70, 10],
          borderColor: 'green',
          backgroundColor: 'rgba(205, 223, 160, 0.5)',
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
          }
      }
  },
};

const ctx = document.getElementById('grafikoa').getContext('2d');
new Chart(ctx, config);
