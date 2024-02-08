var titulo = 'kaixo';

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
  