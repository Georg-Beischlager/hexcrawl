<script setup lang="ts">
</script>

<template>
  <div class=" bg-black text-white p-4 pb-12">
    <NuxtLink to="/" class="border border-white leading-none p-1">
      BACK
    </NuxtLink>
    <div class="lg:w-2/3 mt-4">
      <h1 class="text-2xl mb-4">
        Hilfe
      </h1>
      <p class="mb-4">
        Dieses Werkezug ist in folgende Teile gegliedert:
      </p>
      <ul class="mb-8 underline">
        <li><a href="#map">Karte</a></li>
        <li><a href="#db">Datenbankeinträge</a></li>
        <li><a href="#logs">Logs & Sessions</a></li>
        <li><a href="#crew">Crew</a></li>
        <li><a href="#backend">Backend</a></li>
      </ul>
      <h2 id="map" class="text-xl my-4">
        Karte
      </h2>
      <NuxtLink to="/" class="mb-2 underline block">Zur Karte</NuxtLink>
      <p>
        Die Karte bietet einen Überblick der bereits erkundedeten Gebiete. Unten befindet sich das Hauptmenü.
        Dort kann man zu den Unterseiten navigieren und erhält Informationen über die ausgewählte Kachel.
        <br>
        Kacheln können verschiedene Rahmenfarben haben (Rot, Gelb, Weiß, Blau), die selektierte Kachel animiert zwischen blau und grün.
        Die Kacheln können außerdem ein Hintergrundbild besitzen, das zeigt an ob die Kachel bereits erforscht wurde.
        <br>
        Wenn eine Kachel selektiert wird werden einerseits ihre Koordinaten im [Reihe|Spalte] Format angezeigt, weiters werden (falls vorhanden) Links auf Listen mit zugehörigen Datenbank- und Logeinträgen angezeigt.
        <br>
        Rechts über diesesm Hauptmenü sind Kartenkontrollelemente. Der Slider stellt den Zoom ein.<br>
        Das <Icon name="crosshairs-gps" /> Symbol zentriert die Karte auf der Bais.<br>
        Der X|Y Button aktiviert die Koordinaten Anzeige auf der Karte.<br>
        Der HIDE/SHOW Button versteckt oder zeigt dieses Menü an.
      </p>
      <h2 id="db" class="text-xl my-4">
        Datenbankeinträge
      </h2>
      <NuxtLink to="/database" class="mb-2 underline block">Zur Datenbankansicht</NuxtLink>
      <p>
        Datenbankeinträge speichern alle grundsätzlichen Informationen zur Kampagne. Zum Beispiel: Planeten, Völker, Tiere, Regeln, HANNAS Upgrade Liste... <br>
        Da die Daten so zahlreich sind gibt es oben zwei Filtermöglichkeiten: einerseits auf Tag-Basis andererseits auf einer Volltextsuche. <br>
        Datenbankeinträge können untereinander verknüpft sein. Falls so eine Verknüpfung existiert wird diese unter der Überschrift im rechten Content Bereich angezeigt.<br>
        Sie können ebenfalls mit Koordinaten versehen sein, dann erscheint in der Kartenansicht an Link dahin wenn die entsprechende Kachel auf der Karte ausgewählt wird.
      </p>
      <h2 id="logs" class="text-xl my-4">
        Logs & Sessions
      </h2>
      <NuxtLink to="/logs" class="mb-2 underline block">Zur Datenbankansicht</NuxtLink>
      <NuxtLink to="/sessions" class="mb-2 underline block">Zur Datenbankansicht</NuxtLink>
      <p>
        Logeinträge sind pro gespielter Session gedacht. Einerseits ergibt sich daraus die Tabelle unter SESSIONS, andererseits auch die Einträge unter LOGS.<br>
        Am Anfang jeder Session wird ein "Lorekeeper" festgelegt, Aufgabe dieser Person ist es Protokoll zu führen, damit zukünftige Abenteurer*Innen wissen was geschehen ist.
      </p>
      <h2 id="crew" class="text-xl my-4">
        Crew
      </h2>
      <NuxtLink to="/crew" class="mb-2 underline block">Zur Crewansicht</NuxtLink>
      <p>
        Auf der Crew Seite werden alle Charactere angezeigt die derzeit Teil der Basis sind. Diese können Spieler*Innen zugeordnet sein - oder auch nicht.<br>
        Alle sind herzlich eingeladen Teile ihrer Geschichte oder Bilder hier mit den anderen zu teilen.
      </p>
      <h2 id="backend" class="text-xl my-4">
        Backend
      </h2>
      <NuxtLink to="https://blackmoon-api.democrify.xyz/admin/login" class="mb-2 underline block">Zur Datenbankansicht</NuxtLink>
      <p>
        Das Backend verwaltet die Daten auf dieser Webseite. Die Daten dort sind analog zu dieser Webseite gegliedert.<br>
        Den Login könnt ihr bei Georg anfragen, eine eingeständige Registrierung ist nicht vogesehen.<br>
        Weitere Erklärungen folgen auf Bedarf/Anfrage.
      </p>
    </div>
  </div>
</template>
