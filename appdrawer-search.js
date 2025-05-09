// Funktion zum Erstellen eines einzelnen App-Item-DOM-Elements
function createAppItemElement(app) {
    const appItem = document.createElement('div');
    appItem.className = 'app-item';
    appItem.id = app.id; // Setzt die ID für das äußere div

    const button = document.createElement('button');
    button.className = 'button-circle';
    button.setAttribute('aria-label', app.ariaLabel || app.id); // Nutzt ariaLabel oder fallback auf id
    button.style.backgroundImage = `url('${app.iconUrl}')`;
    // Stellt sicher, dass das Klickverhalten dem deiner ursprünglichen Buttons entspricht (Navigation im selben Tab)
    button.onclick = () => { window.location.href = app.targetUrl; };

    const label = document.createElement('span');
    label.className = 'app-id-label';
    label.textContent = app.id; // Zeigt die ID als Text an

    appItem.appendChild(button);
    appItem.appendChild(label);

    return appItem;
}

document.addEventListener('DOMContentLoaded', function () {
    // Korrekter Container für die App-Items innerhalb der "Favorites"-Box
    const appDrawerContainer = document.querySelector('#box-favorites .app-container');

    if (!appDrawerContainer) {
        console.error('Fehler: AppDrawer Container (#box-favorites .app-container) wurde nicht gefunden!');
        return;
    }

    // Überprüfen, ob appsData von der externen Datei geladen wurde und ein Array ist
    if (typeof appsData === 'undefined' || !Array.isArray(appsData)) {
        console.error('Fehler: Das "appsData" Array wurde nicht gefunden oder ist kein Array. Stelle sicher, dass appsData.js korrekt geladen wird und das Array definiert.');
        appDrawerContainer.textContent = 'Fehler beim Laden der Apps. Daten nicht gefunden.';
        return;
    }

    if (appsData.length === 0) {
        appDrawerContainer.textContent = 'Keine Apps zum Anzeigen vorhanden.';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.disabled = true; // Suchfeld ggf. deaktivieren
        return;
    }

    // 1. Bereite Objekte für die Anzeige vor
    const appItemsForDisplay = appsData.map(app => {
        const appElement = createAppItemElement(app); // Erzeuge das DOM-Element
        return {
            element: appElement,
            sortKey: app.id.toLowerCase() // Sortierschlüssel (ID in Kleinbuchstaben)
        };
    });

    // 2. Sortiere die App-Objekte anhand des sortKey
    appItemsForDisplay.sort((a, b) => {
        return a.sortKey.localeCompare(b.sortKey);
    });

    // 3. Füge die sortierten DOM-Elemente dem appDrawerContainer hinzu
    appDrawerContainer.innerHTML = ''; // Leere den Container, bevor neue Elemente hinzugefügt werden
    appItemsForDisplay.forEach(item => {
        appDrawerContainer.appendChild(item.element);
    });

    console.log(`${appItemsForDisplay.length} Favoriten-Items wurden dynamisch erstellt und sortiert.`);

    // 4. Suchfunktionalität
    const searchInput = document.getElementById('searchInput');
    if (searchInput && appItemsForDisplay.length > 0) {
        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase().trim();

            appItemsForDisplay.forEach(item => {
                // item.sortKey ist bereits in Kleinbuchstaben
                if (item.sortKey.includes(searchTerm)) {
                    item.element.style.display = 'flex'; // Stellt sicher, dass es als Flex-Item angezeigt wird (gemäß .app-item CSS)
                } else {
                    item.element.style.display = 'none';
                }
            });
        });
    } else if (!searchInput) {
        console.error("Suchfeld ('searchInput') nicht gefunden!");
    }
});