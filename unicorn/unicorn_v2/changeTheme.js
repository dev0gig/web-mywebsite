    // Funktion zum Ändern des Themes
    function changeTheme() {
        const themeSelector = document.getElementById('theme-selector');
        const selectedTheme = themeSelector.value;

        // CSS-Datei ändern
        document.querySelector('link[rel="stylesheet"]').href = selectedTheme;

        // Auswahl im Local Storage speichern
        localStorage.setItem('selectedTheme', selectedTheme);
    }

    // Beim Laden der Seite die gespeicherte Auswahl anwenden
    window.onload = function () {
        const savedTheme = localStorage.getItem('selectedTheme');
        const themeSelector = document.getElementById('theme-selector');

        if (savedTheme) {
            // Gespeichertes Theme anwenden
            document.querySelector('link[rel="stylesheet"]').href = savedTheme;

            // Dropdown auf die gespeicherte Auswahl setzen
            themeSelector.value = savedTheme;
        }
    };