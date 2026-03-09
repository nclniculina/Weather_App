// ===== API Schlüssel =====
// Hier muss dein eigener API Key von OpenWeatherMap eingefügt werden
const apiKey = "80a6a9be84d6f33e760fe349f28e94f7";

// Elemente aus dem HTML holen
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

// Suche starten, wenn Enter gedrückt wird
cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

// Event Listener für den Button
searchBtn.addEventListener("click", getWeather);

// Funktion zum Abrufen der Wetterdaten
function getWeather() {

    const city = cityInput.value;

    // URL für die API Anfrage
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=de&appid=${apiKey}`;

    // Anfrage an die API senden
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // Daten aus der API extrahieren
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const cityName = data.name;
            const icon = data.weather[0].icon;

            // Ergebnis auf der Seite anzeigen
            weatherResult.innerHTML = `
                <h2>${cityName}</h2>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
                <p>🌡 Temperatur: ${temperature}°C</p>
                <p>☁ Wetter: ${description}</p>
            `;
        })
        .catch(error => {
            weatherResult.innerHTML = "Fehler beim Laden der Wetterdaten.";
        });
}
