fetch('menu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('orrialdea').innerHTML = data;
            })
            .catch(error => console.error('Error al obtener el contenido:', error));

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