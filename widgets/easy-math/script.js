const aufgabeElement = document.getElementById('aufgabe');
const antwortButtons = document.querySelectorAll('.antworten button'); // Selektiert alle Buttons im .antworten Div
const feedbackElement = document.getElementById('feedback');
const neueAufgabeButton = document.getElementById('neueAufgabe');

let aktuelleAufgabe;

function generiereAufgabe() {
    const zahl1 = Math.floor(Math.random() * 20) + 1; // Zufällige Zahl zwischen 1 und 20
    let zahl2 = Math.floor(Math.random() * 19) + 1; // Zufällige Zahl zwischen 1 und 19 (um Division durch 0 zu vermeiden)
    const operationen = ['+', '-', '*', '/'];
    let zufaelligeOperation = operationen[Math.floor(Math.random() * operationen.length)]; // Mache variable, falls Division angepasst wird

    let richtigeAntwort;
    switch (zufaelligeOperation) {
        case '+':
            richtigeAntwort = zahl1 + zahl2;
            break;
        case '-':
            richtigeAntwort = zahl1 - zahl2;
            break;
        case '*':
            richtigeAntwort = zahl1 * zahl2;
            break;
        case '/':
            // Stelle sicher, dass die Division aufgeht und vermeide Division durch 0
            if (zahl2 !== 0 && zahl1 % zahl2 === 0) {
                richtigeAntwort = zahl1 / zahl2;
            } else {
                // Wenn die Division nicht aufgeht, wähle eine andere Operation
                const andereOperationen = ['+', '-', '*'];
                zufaelligeOperation = andereOperationen[Math.floor(Math.random() * andereOperationen.length)]; // Aktualisiere die Operation
                if (zufaelligeOperation === '+') {
                    richtigeAntwort = zahl1 + zahl2;
                } else if (zufaelligeOperation === '-') {
                    richtigeAntwort = zahl1 - zahl2;
                } else {
                    richtigeAntwort = zahl1 * zahl2;
                }
            }
            break;
    }

    aktuelleAufgabe = {
        frage: `${zahl1} ${zufaelligeOperation} ${zahl2} = ?`,
        richtigeAntwort: richtigeAntwort
    };
}

function generiereAntworten() {
    const richtigeAntwort = aktuelleAufgabe.richtigeAntwort;
    const falscheAntworten = [];
    // Stelle sicher, dass falsche Antworten nicht die richtige Antwort sind und sich unterscheiden
    while (falscheAntworten.length < 3) {
        // Generiere eine zufällige Antwort in einem plausiblen Bereich
        let zufaelligeAntwort;
        // Versuche Antworten nahe der richtigen Antwort, aber nicht zu weit weg
        const abweichung = Math.floor(Math.random() * 10) - 5; // Zufällige Abweichung von -5 bis +4
        zufaelligeAntwort = richtigeAntwort + abweichung;

        // Stelle sicher, dass die generierte Antwort eine Ganzzahl ist
        zufaelligeAntwort = Math.round(zufaelligeAntwort);

        // Zusätzliche Prüfungen, um extreme oder unpassende falsche Antworten zu vermeiden
        if (richtigeAntwort >= 0 && zufaelligeAntwort < -10) continue;
        if (richtigeAntwort < 0 && zufaelligeAntwort > 10) continue;


        if (zufaelligeAntwort !== richtigeAntwort && !falscheAntworten.includes(zufaelligeAntwort)) {
            falscheAntworten.push(zufaelligeAntwort);
        }
    }

    const alleAntworten = [...falscheAntworten, richtigeAntwort];
    // Zufällige Anordnung der Antworten
    for (let i = alleAntworten.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alleAntworten[i], alleAntworten[j]] = [alleAntworten[j], alleAntworten[i]];
    }

    antwortButtons.forEach((button, index) => {
        button.textContent = alleAntworten[index];
        button.onclick = () => ueberpruefeAntwort(parseInt(button.textContent)); // Text als Zahl parsen
        button.disabled = false; // Buttons bei neuer Aufgabe aktivieren
        button.classList.remove('correct-answer-highlight'); // Hervorhebung entfernen
    });
}

function zeigeAufgabe() {
    aufgabeElement.textContent = aktuelleAufgabe.frage;
    feedbackElement.textContent = ''; // Feedback zurücksetzen
    feedbackElement.className = '';
}

function ueberpruefeAntwort(gewaehlteAntwort) {
    // Buttons nach der Antwort deaktivieren, damit man nicht mehrmals klickt
    antwortButtons.forEach(button => button.disabled = true);

    if (gewaehlteAntwort === aktuelleAufgabe.richtigeAntwort) {
        feedbackElement.textContent = 'Richtig!';
        feedbackElement.className = 'richtig';
    } else {
        feedbackElement.textContent = `Falsch. Die richtige Antwort ist ${aktuelleAufgabe.richtigeAntwort}.`;
        feedbackElement.className = 'falsch';
    }

    // Richtige Antwort hervorheben
    const correctAnswerValue = aktuelleAufgabe.richtigeAntwort;
    antwortButtons.forEach(button => {
        if (parseInt(button.textContent) === correctAnswerValue) {
            button.classList.add('correct-answer-highlight');
        }
    });
}

function starteSpiel() {
    // Hervorhebung von vorheriger Aufgabe entfernen
    antwortButtons.forEach(button => {
        button.classList.remove('correct-answer-highlight');
    });

    generiereAufgabe();
    generiereAntworten();
    zeigeAufgabe();
}

neueAufgabeButton.addEventListener('click', starteSpiel);

// Spiel beim Laden der Seite starten
starteSpiel();