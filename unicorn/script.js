function setMailVorlage(content) {
	document.getElementById('outputArea').value = content;
}

const mailVorlagen = {
	grundgeruest: `Guten Tag,

vielen Dank für Ihre Nachricht.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	tois_vorlage: `Liebe Kundin, lieber Kunde,

vielen Dank für Ihren Anruf. Wie vereinbart erhalten Sie im Anhang die gewünschten Informationen.

Bitte auf diese Nachricht nicht direkt antworten, sondern bei weiteren Fragen die unten angeführten Kontaktdaten verwenden.

Wussten Sie schon?
Sie können Ihre Rechnungen jederzeit in Ihrem persönlichen Kundenbereich unter meine.wienenergie.at einsehen.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung

Freundliche Grüße und danke für Ihr Vertrauen,

Wien Energie Kundenberatung

www.wienenergie.at/kontakt
www.wienenergie.at/impressum`,

	anmeldung: `Guten Tag,

vielen Dank für Ihr Interesse an einer Neuanmeldung bei WienEnergie. Um Ihre Anfrage bearbeiten und Ihnen einen Vertrag für die Neuanmeldung zusenden zu können, benötigen wir folgende Daten:

- Ihren vollständigen Namen
- Ihre Adresse
- Ihr Geburtsdatum
- Ihre Telefonnummer
- Ihre E-Mail-Adresse

Sobald uns diese Informationen vorliegen, werden wir Ihnen umgehend den entsprechenden Vertrag zusenden.

Für Rückfragen stehen wir Ihnen selbstverständlich gerne zur Verfügung.`,

	abmeldung: `Guten Tag,
    
wir bestätigen den Erhalt Ihrer Abmeldung vom Vertrag [Vertragsnummer] und haben diese wie gewünscht eingetragen.
Der Vertrag endet gemäß der 14-tägigen Kündigungsfrist am [Datum].

Für die Erstellung Ihrer Schlussrechnung benötigen wir Ihre Kontaktadresse. Bitte teilen Sie uns mit, ob Sie die Schlussrechnung per Post oder per E-Mail erhalten möchten.

Sollten Sie noch Fragen haben, stehen wir Ihnen selbstverständlich gerne zur Verfügung.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	gh_auszahlung_ausweis_fehlt: `Guten Tag,

Vielen Dank für Ihre Anfrage.

Für die Auszahlung von Guthaben ist eine Authentifizierung mittels Ausweiskopie erforderlich.

Dies dient ausschließlich der Betrugsprävention und der Sicherheit Ihrer Auszahlung. Ihre Ausweiskopie wird nicht in Ihrem Kundendatensatz gespeichert und ausschließlich Ihrer Identifikation.

Wenn Sie keine Ausweiskopie per Mail senden möchten, können Sie Ihren Ausweis auch in einem unserer Servicecenter vorweisen.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	gh_auszahlung: `Guten Tag,

Vielen Dank für Ihre Anfrage.

Die Authentifizierung mittels Ihrer Ausweiskopie wurde erfolgreich durchgeführt.

Die von Ihnen beigefügte Ausweiskopie wird nicht in Ihrem Kundendatensatz gespeichert, sondern diente ausschließlich Ihrer Identifikation.

Ihre Gutschrift erhalten Sie innerhalb der nächsten Werktage auf Ihr angegebenes Bankkonto überwiesen.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	gh_allgemein: `Guten Tag,

Vielen Dank für Ihre Anfrage.

Um Ihre Bankverbindung zu hinterlegen und Ihr Guthaben auszuzahlen, benötigen wir zur Authentifizierung eine Ausweiskopie. Dies dient ausschließlich der Betrugsprävention und gewährleistet die Sicherheit Ihrer Auszahlung.

Die von Ihnen beigefügte Ausweiskopie wird nicht in Ihrem Kundendatensatz gespeichert, sondern dient ausschließlich Ihrer Identifikation.

Wenn Sie keine Ausweiskopie per E-Mail senden möchten, können Sie Ihren Ausweis auch in einem unserer Servicecenter vorweisen.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	kdnr_benötigt: `Guten Tag,

vielen Dank für Ihre Nachricht.

um Ihre Anfrage weiter bearbeiten zu können, benötigen wir bitte noch Ihre Kundennummer oder Ihre Vertragskontonummer.
Ihre Kundennummer beginnt mit "12", Ihre Vertragskontonummer beginnt mit "22".

Für Rückfragen stehen wir Ihnen selbstverständlich gerne zur Verfügung.`,

	rp: `Guten Tag,

vielen Dank für Ihre Nachricht.

gerne haben wir den gewünschten Ratenplan für Sie erstellt.
Bitte beachten Sie, dass die Raten pünktlich an den im Plan angegebenen Terminen überwiesen werden müssen. Achten Sie darauf, den exakten Betrag zu überweisen, da der Ratenplan ansonsten storniert wird.

Für Rückfragen stehen wir Ihnen selbstverständlich gerne zur Verfügung.`,

	rechnungskorrektur_zählerstände: `Guten Tag,

Vielen Dank für Ihre Nachricht.

für eine Korrektur Ihrer Rechnung bezüglich der Zählerstände bitten wir Sie, sich direkt mit der Wiener Netze GmbH in Verbindung zu setzen.

Hier die Kontaktdaten der Wiener Netze GmbH Kundenservice:

Allgemeine Anfragen: 050 128-10100 (Mo-Fr 08:00-17:00)
E-Mail: info@wienernetze.at
Adresse: 1090 Wien, Spittelauer Lände 45

Öffnungszeiten:
Montag, Dienstag, Mittwoch, Freitag: 08:00 - 15:00
Donnerstag: 08:00 - 17:30

Weitere Informationen finden Sie auf der Website des Service Treffs: www.servicetreff.at
Bitte beachten Sie, dass Sie auch die Möglichkeit haben, einen Rückruf für allgemeine Anfragen sowie Fragen zu Smart Metern zu buchen. Für Beschwerden und Baustellenauskunft stehen separate Telefonnummern zur Verfügung. Detaillierte Informationen und Online-Services finden Sie auf der Website der Wiener Netze: www.wienernetze.at

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	sonnenstrom: `Guten Tag,

vielen Dank für Ihre Nachricht!

Bitte senden Sie uns die folgenden Unterlagen vollständig und unterschrieben zurück:

- Wien Energie Sonnenstrom Liefervertrag (Seiten 1-6, Seite 6 unterschrieben)
- Datenschutzvereinbarung (unterschrieben)
- Vollmacht (unterschrieben)
- Energie Control GmbH Dokument (unterschrieben)

Bitte beachten Sie, dass ohne die vollständige Einreichung dieser Unterlagen keine Anmeldung Ihrer Photovoltaikanlage erfolgen kann.
Sobald wir die Unterlagen erhalten haben, werden wir die Anmeldung für Sonnenstrom umgehend veranlassen.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	verlassenschaft: `Guten Tag, 
 
Vielen Dank für die Übermittlung der Sterbeurkunde. 
 
In Ihrem Fall gibt es mehrere Verfahrensweisen: 
 
1.) Ummeldung: Sie oder jemand anders meldet sich auf die Adresse neu an. Dafür benötigen wir den vollständigen Namen, das Geburtsdatum, die Telefonnummer, Mail-Adresse und die Rechnungsadresse des Nachfolgers. 

2.) Abweichender Rechnungsempfänger: Sollte der Vertragseintritt gewünscht sein, hinterlegen wir Sie oder jemand anders als Rechnungsempfänger, solange der Beschluss noch nicht erstellt wurde. 

3.) Abmeldung: Wir kündigen den Vertrag (maximal 3 Monate in der Zukunft).

Bitte um kurze Info für welche dieser 3 Möglichkeiten Sie sich entscheiden.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	trockenlegungsbrief: `Guten Tag,

vielen Dank für Ihre Nachricht.

Wie gewünscht, finden Sie im Anhang den Trockenlegungsbrief zur weiteren Verwendung.

Für Rückfragen stehen wir Ihnen selbstverständlich gerne zur Verfügung.`,

	tw: `Guten Tag,

vielen Dank für Ihre Nachricht.

wie von Ihnen gewünscht, wird der Tarif zum [Datum] umgestellt.

Die PDF-Rechnung wurde ebenfalls aktiviert, und Sie werden diese ab dem nächsten Rechnungslauf in digitaler Form erhalten.

Für Rückfragen stehen wir Ihnen selbstverständlich gerne zur Verfügung.`,

	ummeldung_erfolgreich: `Guten Tag,

wir möchten Ihnen hiermit bestätigen, dass Ihre Ummeldung wie gewünscht erfolgreich durchgeführt wurde.

Für Rückfragen stehen wir Ihnen selbstverständlich gerne zur Verfügung.`,

	data_KS_allgemein: `Service Treff Spittelau:

Adresse: Spittelauer Lände 45, 1090 Wien

Öffnungszeiten:
Mo-Do: 8:00-19:00 Uhr (mit Termin bis 20:00 Uhr)
Fr: 8:00-15:00 Uhr (mit Termin bis 16:00 Uhr)

Terminvereinbarung: https://www.servicetreff.at/

---

Servicepoint Erdberg:

Adresse: Thomas-Klestil-Platz 4, EG, 1030 Wien

Öffnungszeiten:
Mo-Do: 8:00-19:00 Uhr (mit Termin bis 20:00 Uhr)
Fr: 8:00-15:00 Uhr (mit Termin bis 16:00 Uhr)

Terminvereinbarung: https://www.servicetreff.at/

---

Servicepoint Guntramsdorf:

Adresse: Rathaus Viertel 1, 1. OG, 2353 Guntramsdorf

Öffnungszeiten:
Mo-Fr: 8:00-15:00 Uhr
Do: 8:00-17:30 Uhr`,

	data_spit: `Kontaktdaten für den Service Treff Spittelau:

Adresse:
Spittelauer Lände 45
1090 Wien

Öffnungszeiten:
Montag - Donnerstag: 8:00 - 19:00 Uhr (bis 20:00 Uhr mit Termin)
Freitag: 8:00 - 15:00 Uhr (bis 16:00 Uhr mit Termin)

Website: https://www.servicetreff.at/

Anfahrt:
Mit öffentlichen Verkehrsmitteln: U-Bahnlinie U4, Station Spittelau
Mit dem Auto: Parkmöglichkeiten in der Nähe vorhanden

Terminvereinbarung:
Online Terminvereinbarung möglich: https://www.servicetreff.at/

Zusätzliche Informationen:
Im Service Treff Spittelau erhalten Sie Hilfe und Beratung zu allen Produkten und Dienstleistungen der Wiener Stadtwerke.
Sie können hier Ihre Strom-, Gas- und Fernwärmerechnungen bezahlen.
Barrierefreier Zugang vorhanden.`,

	data_wn: `Wiener Netze GmbH Kundenservice Kontaktinformationen:

Allgemeine Anfragen: 050 128-10100 (Mo-Fr 08:00-17:00)
E-Mail: info@wienernetze.at

Service Treff der Wiener Stadtwerke
Adresse: 1090 Wien, Spittelauer Lände 45

Öffnungszeiten:
Montag, Dienstag, Mittwoch, Freitag: 08:00 - 15:00
Donnerstag: 08:00 - 17:30

Weitere Informationen:
https://www.servicetreff.at/

Zusätzliche Hinweise:
Sie können einen Rückruf für allgemeine Anfragen und Anfragen rund um Smart Meter buchen.
Es gibt separate Telefonnummern für Beschwerden und Baustellenauskunft.
Weitere Informationen und Online-Services finden Sie auf der Website der Wiener Netze: https://www.wienernetze.at/`,

	waerme_anm: `Guten Tag,
	
vielen Dank für Ihre Nachricht.

Um Ihr Anliegen bearbeiten zu können, benötigen wir von Ihnen die folgenden Unterlagen:

Für Mietwohnungen:
Eine Bestätigung über den Beginn des Mietvertrages (unterschrieben), die Verbrauchsstellenadresse sowie die vollständigen Namen des Vermieters und Mieters hervorgehen.

Für Eigentumswohnungen:
Eine Kopie des Kaufvertrages (unterschrieben), aus dem das Übergabedatum, die Verbrauchsstellenadresse sowie die vollständigen Namen des Verkäufers und Käufers ersichtlich sind.

Bitte senden Sie uns diese Unterlagen elektronisch als PDF-Dokument zu.

Für weitere Fragen zur Fernwärme wenden Sie sich bitte an folgende E-Mail-Adresse: waerme@wienenergie.at.

Für Rückfragen stehen wir Ihnen selbstverständlich gerne zur Verfügung.`,

	data_inkasso: `Guten Tag,

Vielen Dank für Ihre Nachricht.

Für weitere Auskünfte zum aktuellen Saldo, wenden Sie sich bitte direkt an die Firma Riverty Services Austria GmbH.

Riverty Services Austria GmbH
Getrude-Fröhlich-Sandner-Straße 1/2
1100 Wien
Telefon: +43 (0)386 80 90 38
Homepage: www.riverty.com`,

	waerme_an_abm: `Guten Tag,

vielen Dank für ihre Nachricht.
 
wir haben Ihr Anliegen zur Kenntnis genommen und möchten Sie darüber informieren, dass wir alle An- und Abmeldungen direkt von der Hausverwaltung übermittelt bekommen.
Wir bitten Sie daher noch um etwas Geduld.
 
Die Schlussabrechnung wird bis spätestens 6 Monate nach Beendigung des Verrechnungsjahres erstellt und versendet. Bitte um Übermittelung Ihrer neuen Anschrift.
 
Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	waerme_mieterwechsel: `Guten Tag,
 
der Mieterwechsel wurde wunschgemäß durchgeführt.
 
Zu Ihrer Information:
Aufgrund von gesetzlichen Vorgaben dürfen wir keine direkten Verträge mit Ihren Mieter*innen abschließen – im Sinne des HeizKG ist das nur mit Ihnen als Eigentümer*in möglich. 
Wichtig: Damit bleiben Sie auch in Zukunft unser(e) Vertragspartner*in und haften für anfallende Kosten.
Um Ihnen die Abwicklung so einfach wie möglich zu machen, bieten wir Ihnen ein besonderes Service: Wir tragen den/die Mieter*in als Rechnungsempfänger*in ein und schicken diesem/r alle Rechnungsunterlagen.
 
Sie möchten dieses Service nicht nutzen? Dann informieren Sie uns bitte unter waerme@wienenergie.at
 
Sie haben noch Fragen? Wir sind für Sie da – unter 0800 500 700 von Montag bis Freitag von
07:30 bis 16:00 Uhr oder unter waerme@wienenergie.at

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	anm_pv: `Guten Tag,

vielen Dank für Ihre Nachricht.
 
Gerne haben wir die Anmeldung, für Ihre PV-Anlage angestoßen.

Bitte wenden Sie sich nun, an die Wiener Netze, für die weiteren Schritte, wie die Plombierung der Anlage.
info@wienernetze.at

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	heizkostenabrechnung: `Guten Tag,

vielen Dank für Ihre Nachricht.
 
Bei einer Heizkostenabrechnung handelt es sich um ein spezielles Aufteilungsverfahren basierend auf dem Heizkostenabrechnungsgesetz.
 
Bei diesem Verfahren kann der Einheitenpreis pro Teilstrich erst nach Vorliegen sämtlicher Daten und Werte am Ende des Verrechnungsjahres genau berechnet werden.
 
Aufgrund dieses Spezifikums kann auch eine endgültige Schlussabrechnung erst nach Beendigung eines Verrechnungsjahres gelegt werden. 
 
Wir bitten diesbezüglich um etwas Geduld.
 
Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	mw_untermieter: `Sehr geehrte Kundin, sehr geehrter Kunde! 
 
Wir nehmen zur Kenntnis, dass Sie oben genanntes Nutzungsobjekt ab XXX an HXXXXXX vermietet haben und ab diesem Datum die Rechnungslegung an Ihren Mieter erfolgt. Über eventuelle Zahlungsrückstände werden Sie schriftlich informiert.
 
Ausdrücklich weisen wir jedoch darauf hin, dass Sie als Wohnungseigentümer uns gegenüber Wärmeabnehmer und Vertragspartner für oben genanntes Nutzungsobjekt bleiben. Es erfolgt somit kein Vertragsversand an Ihren Mieter.
Bezüglich der Zwischenablesung ersuchen wir Sie, mit der Firma TXXXX unter der Rufnummer XXXX eine Terminvereinbarung zu treffen oder die Fotos der Zählerstände per Mail an xxxxxx zu senden. 
 
Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,

	Einzelner_Zäst_gespeichert: `Guten Tag,
 
vielen Dank für Ihre Nachricht!

Hiermit können wir Ihnen bestätigen, dass der von Ihnen bekanntgegebene Zählerstand für die angegebene Adresse in unserem System gespeichert wurde.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,
	Mehrere_Zäst_gespeichert: `Guten Tag,
 
vielen Dank für Ihre Nachricht!

Hiermit können wir Ihnen bestätigen, dass die von Ihnen bekanntgegeben Zählerstände für die angegebene Adresse in unserem System gespeichert wurden.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,
	SmartMeter_Keine_ZÄST_benötigt: `Guten Tag,
	
vielen Dank für Ihre Nachricht!
 
Da es sich bei diesen Strom-Zähler um einen Smart-Meter handelt und dieser fernausgelesen werden kann, ist die Übermittlung der Strom-Zählerstände für die Adresse nicht notwendig.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,
	Kunde_SMARTMeter_Zäst_schickt_bei_Ummeldung: `Guten Tag,
 
vielen Dank für Ihre Nachricht!
 
Da es sich bei diesen Strom-Zähler um einen Smart-Meter handelt und dieser fernausgelesen werden kann, ist die Übermittlung der Strom-Zählerstände für die Adresse nicht notwendig. 
 
Der Strom-Zählerstand wird zu dem Stichtag der Ummeldung automatisch aus der Ferne abgelesen und gespeichert.
 
Für die Ummeldung wenden Sie sich bitte an den zuständigen Energielieferanten.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,
	KD_ZÄST_von_Gas_und_SMART_Meter_schickt: `Guten Tag,
 
vielen Dank für Ihre Nachricht!
 
Da es sich bei Ihrem Strom-Zähler um einen Smart-Meter handelt und dieser fernausgelesen werden kann, ist die Übermittlung der Strom-Zählerstände für die Adresse nicht notwendig.
 
Der Gas-Zählerstand wurde jedoch erfolgreich gespeichert und hinterlegt.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,
	KD_ZÄST_von_Gas_und_SMARTMeter_schickt_und_es_gleichzeitig_eine_Ummeldung: `Guten Tag,
 
vielen Dank für Ihre Nachricht!
 
Da es sich bei Ihrem Strom-Zähler um einen Smart-Meter handelt und dieser fernausgelesen werden kann, ist die Übermittlung der Strom-Zählerstände für die Adresse nicht notwendig.
 
Der Strom-Zählerstand wird zu dem Stichtag der Ummeldung automatisch aus der Ferne abgelesen und gespeichert.
 
Der Gas-Zählerstand wurde jedoch erfolgreich gespeichert und hinterlegt.
 
Für die Ummeldung wenden Sie sich bitte an den zuständigen Energielieferanten.

Für Rückfragen stehen wir selbstverständlich gerne zur Verfügung.`,
};

Object.keys(mailVorlagen).forEach(id => {
	document.getElementById(id).addEventListener('click', function () {
		setMailVorlage(mailVorlagen[id]);
	});
});

document.getElementById("outputArea").addEventListener("click", function() {
	this.select(); // Selektiert den gesamten Text im Textfeld
	document.execCommand("copy"); // Kopiert die Selektion in die Zwischenablage
  });
  
