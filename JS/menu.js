new Vue({
  el: '#appa',
  data: {
      traducciones: {
          esp: {
              Material: "Materiala",
              // Añade más traducciones en español aquí según sea necesario
          },
          eus: {
              Material: "Materiala", // Añade las traducciones en euskera aquí
              // Añade más traducciones en euskera aquí según sea necesario
          }
      }
  },
  methods: {
      traducir(lang) {
          // Actualiza las traducciones según el idioma seleccionado
          this.traducciones = this.$data.traducciones[lang];
      }
  }
});

function openMenu() {
    var menuContainer = document.querySelector('.menu-container');
    var menuTexts = menuContainer.querySelectorAll('.menu-text');
  
    menuContainer.style.width = '250px'; 
  
    menuTexts.forEach(function (text) {
      text.style.display = 'inline';
    });
  }
  
  function closeMenu() {
    var menuContainer = document.querySelector('.menu-container');
    var menuTexts = menuContainer.querySelectorAll('.menu-text');
  
    menuContainer.style.width = '100px'; 
  
    menuTexts.forEach(function (text) {
      text.style.display = 'none';
    });
  }


  // Define una función para traducir
// function traducir(lang) {
//   // Define los datos de traducción para español y euskera
//   const traducciones = {
//       esp: {
//           Material: "Materiala",
//           // Añade otras traducciones aquí si es necesario
//       },
//       eus: {
//           Material: "Materiala", // Añade las traducciones en euskera aquí
//           // Añade otras traducciones aquí si es necesario
//       }
//   };

//   // Obtén el idioma seleccionado y las traducciones correspondientes
//   const idioma = traducciones[lang];
  
//   // Traduce los elementos de la página
//   document.getElementById('Material').innerText = idioma.Material;
//   // Añade más elementos para traducir según sea necesario
  
//   // Otras acciones de traducción aquí...
// }

  
//   const dataEsp = {
//     "Home": "Home",
//     "Productos": "Produktuak",
//     "Material": "Materiala",
//     "Alumnos": "Ikasleak",
//     "Grupos": "Taldeak",
//     "Estadísticas": "Estatistikak",
//     "Historial": "Historiala",
//     "Tickets": "Tiketak",
//     "Fichas": "Fitxak",
//     "parrafos": {
//         "parrafo1": "Este es el primer párrafo en castellano.",
//         "parrafo2": "Este es el segundo párrafo en castellano."
//     },
//     "enlaces": {
//         "enlace1": {
//             "texto": "Enlace 1",
//             "url": "https://www.ejemplo.com"
//         },
//         "enlace2": {
//             "texto": "Enlace 2",
//             "url": "https://www.ejemplo.com"
//         }
//     }
// }

