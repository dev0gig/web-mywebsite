document.addEventListener('DOMContentLoaded', () => {
    const widgetElement = document.querySelector('.weather-widget');
    const locationElement = document.getElementById('widget-location');
    const descriptionElement = document.getElementById('widget-description');
    const tempRangeElement = document.getElementById('widget-temp-range');
    const bgIconElement = document.getElementById('widget-bg-icon');
    const dateElement = document.getElementById('widget-date');

    const defaultLatitude = 48.2082; // Wien
    const defaultLongitude = 16.3738; // Wien
    const defaultLocationName = "Wien";

    async function getWeatherData(lat, lon) {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe/Berlin&forecast_days=1`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            const cityName = await getCityName(lat, lon);
            updateWidgetUI(data, cityName);
        } catch (error) {
            console.error("Fehler beim Abrufen der Wetterdaten:", error);
            locationElement.textContent = defaultLocationName;
            descriptionElement.textContent = "Daten nicht geladen";
            tempRangeElement.textContent = "---";
            dateElement.textContent = ""; // Datum leeren bei Fehler
            bgIconElement.src = "";
            widgetElement.className = 'weather-widget cloudy'; // Standard-Fallback-Klasse
        }
    }

    async function getCityName(latitude, longitude) {
        const reverseGeocodingApiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=de`;
        try {
            const response = await fetch(reverseGeocodingApiUrl);
            if (!response.ok) { // Einfachere Fehlerprüfung
                console.error(`HTTP error fetching city name: ${response.status}`);
                return defaultLocationName;
            }
            const data = await response.json();
            // Sicherer Zugriff auf Adressdaten
            return data?.address?.city || data?.address?.town || data?.address?.village || data?.address?.suburb || defaultLocationName;
        } catch (error) {
            console.error("Fehler beim Abrufen des Stadtnamens:", error);
            return defaultLocationName;
        }
    }

    function updateWidgetUI(data, locationName) {
        if (data && data.current && data.daily && data.daily.time && data.daily.time.length > 0) {
            const currentWeatherCode = data.current.weather_code;
            const isDay = data.current.is_day === 1;
            const tempMax = Math.round(data.daily.temperature_2m_max[0]);
            const tempMin = Math.round(data.daily.temperature_2m_min[0]);

            locationElement.textContent = locationName;
            tempRangeElement.textContent = `${tempMin}° / ${tempMax}°`;

            const { description, iconName, colorClass } = getWeatherDetails(currentWeatherCode, isDay);
            descriptionElement.textContent = description;

            // Du benötigst Icons im Ordner /icons/ (z.B. icons/sunny.png)
            bgIconElement.src = `icons/${iconName}.png`;
            bgIconElement.alt = description; // Für Barrierefreiheit, auch wenn dekorativ

            // Aktuelles Datum setzen
            const today = new Date();
            const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
            dateElement.textContent = today.toLocaleDateString('de-DE', dateOptions);

            // Farbklasse auf das Widget anwenden
            widgetElement.className = 'weather-widget'; // Reset classes
            if (colorClass) {
                widgetElement.classList.add(colorClass);
            }
        } else {
            descriptionElement.textContent = "Keine Daten verfügbar.";
            tempRangeElement.textContent = "---";
            dateElement.textContent = ""; // Datum leeren
            bgIconElement.src = "";
            widgetElement.className = 'weather-widget cloudy'; // Standard-Fallback
        }
    }

    function getWeatherDetails(code, isDay) {
        let description = "Unbekannt", iconName = "unknown", colorClass = "cloudy";
        switch (code) {
            case 0: description = isDay ? "Sonnig" : "Klare Nacht"; iconName = isDay ? "sunny" : "clear-night"; colorClass = isDay ? "sunny" : "night"; break;
            case 1: description = isDay ? "Überwiegend sonnig" : "Überwiegend klar"; iconName = isDay ? "partly-cloudy-day" : "partly-cloudy-night"; colorClass = isDay ? "sunny" : "night"; break;
            case 2: description = "Teils bewölkt"; iconName = isDay ? "partly-cloudy-day" : "partly-cloudy-night"; colorClass = "cloudy"; if (!isDay) colorClass = "night"; break;
            case 3: description = "Bedeckt"; iconName = "cloudy"; colorClass = "cloudy"; break;
            case 45: case 48: description = "Nebel"; iconName = "fog"; colorClass = "foggy"; break;
            case 51: case 53: case 55: case 56: case 57: description = "Nieselregen"; iconName = "rain"; colorClass = "rainy"; break;
            case 61: case 63: case 65: description = "Regen"; iconName = "rain"; colorClass = "rainy"; break;
            case 66: case 67: description = "Gefrierender Regen"; iconName = "rain"; colorClass = "rainy"; break;
            case 71: case 73: case 75: description = "Schnee"; iconName = "snow"; colorClass = "snowy"; break;
            case 77: description = "Schneekörner"; iconName = "snow"; colorClass = "snowy"; break;
            case 80: case 81: case 82: description = "Regenschauer"; iconName = "rain"; colorClass = "rainy"; break;
            case 85: case 86: description = "Schneeschauer"; iconName = "snow"; colorClass = "snowy"; break;
            case 95: description = "Gewitter"; iconName = "thunderstorm"; colorClass = "stormy"; break;
            case 96: case 99: description = "Gewitter mit Hagel"; iconName = "thunderstorm"; colorClass = "stormy"; break;
            default: description = `Wettercode: ${code}`; iconName = isDay ? "partly-cloudy-day" : "partly-cloudy-night";
        }
        return { description, iconName, colorClass };
    }

    function handleLocation(position) {
        getWeatherData(position.coords.latitude, position.coords.longitude);
    }

    function handleLocationError(error) {
        console.warn("Geolocation nicht verfügbar/abgelehnt, verwende Standardort.", error.message);
        getWeatherData(defaultLatitude, defaultLongitude);
    }

    // Starte den Prozess des Abrufens von Standort und Wetterdaten
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleLocation, handleLocationError, { timeout: 10000, enableHighAccuracy: false });
    } else {
        console.warn("Geolocation API nicht verfügbar, verwende Standardort.");
        getWeatherData(defaultLatitude, defaultLongitude);
    }
});