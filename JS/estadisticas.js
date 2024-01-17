const data = {
  labels: ['Jon', 'Mikel', 'Ander', 'Izaskun', 'Asier', 'Sergio', 'Erik'],
  datasets: [
      {
          label: 'Limpieza',
          data: [3, 7, 5, 10, 1, 6, 2],
          borderColor: 'orange',
          backgroundColor: 'rgba(233, 152, 87, 0.5)',
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
      },
      {
          label: 'Recepción',
          data: [3, 5, 2, 5, 7, 9, 10],
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

