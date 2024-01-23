function updateClock() {
    const selectedHour = document.getElementById('hour').value;
    const clockElement = document.getElementById('clock');

    const formattedHour = formatHour(selectedHour * 15); // Multiplica por 15 para obtener los minutos
    clockElement.textContent = formattedHour;
}

function formatHour(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainderMinutes = minutes % 60;

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = remainderMinutes === 0 ? '00' : remainderMinutes;

    return `${formattedHours}:${formattedMinutes}`;
}

// Initial update
updateClock();
