<script setup lang="ts">
</script>

<template>
  <div class=" bg-black text-white p-4 pb-12">
    <NuxtLink to="/" class="border border-white leading-none p-1">
      BACK
    </NuxtLink>
    <div class="lg:w-2/3 mt-4">
      <h1>
        Hilfe
      </h1>
      <h2 class="text-xl">
        FAQ
      </h2>
      <ul>
        <li><a href="/about" class="underline">Was ist diese Webseite?</a></li>
        <li><a href="#overview" class="underline">Wie funktioniert diese Webseite?</a></li>
        <li><a href="/about" class="underline">Wie kann ich mitspielen?</a></li>
        <li><a href="/meta" class="underline">Wie kann ich eine Session leiten?</a></li>
      </ul>
      <h2 id="overview" class="mt-8">
        Übersicht
      </h2>
      <ul class="mb-8 underline">
        <li><a href="#map">Karte</a></li>
        <li><a href="#db">Datenbankeinträge</a></li>
        <li><a href="#logs">Logs & Sessions</a></li>
        <li><a href="#crew">Crew</a></li>
        <li><a href="#meta">Meta</a></li>
        <li><a href="#backend">Backend</a></li>
      </ul>
      <h3 id="map" class="text-xl mt-6">
        Karte
      </h3>
      <NuxtLink to="/" class="mb-2 underline block">
        Zur Karte
      </NuxtLink>
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
      <h3 id="db" class="text-xl mt-6">
        Datenbankeinträge
      </h3>
      <NuxtLink to="/database" class="mb-2 underline block">
        Zur Datenbankansicht
      </NuxtLink>
      <p>
        Datenbankeinträge speichern alle grundsätzlichen Informationen zur Kampagne. Zum Beispiel: Planeten, Völker, Tiere, Regeln, HANNAS Upgrade Liste... <br>
        Da die Daten so zahlreich sind gibt es oben zwei Filtermöglichkeiten: einerseits auf Tag-Basis andererseits auf einer Volltextsuche. <br>
        Datenbankeinträge können untereinander verknüpft sein. Falls so eine Verknüpfung existiert wird diese unter der Überschrift im rechten Content Bereich angezeigt.<br>
        Sie können ebenfalls mit Koordinaten versehen sein, dann erscheint in der Kartenansicht an Link dahin wenn die entsprechende Kachel auf der Karte ausgewählt wird.
      </p>
      <h3 id="logs" class="text-xl mt-6">
        Logs & Sessions
      </h3>
      <NuxtLink to="/logs" class="mb-2 underline block">
        Zu den Logs
      </NuxtLink>
      <NuxtLink to="/sessions" class="mb-2 underline block">
        Zu den Sessions
      </NuxtLink>
      <p>
        Logeinträge sind pro gespielter Session gedacht. Einerseits ergibt sich daraus die Tabelle unter SESSIONS, andererseits auch die Einträge unter LOGS.<br>
        Am Anfang jeder Session wird ein "Lorekeeper" festgelegt, Aufgabe dieser Person ist es Protokoll zu führen, damit zukünftige Abenteurer*Innen wissen was geschehen ist.
      </p>
      <h3 id="crew" class="text-xl mt-6">
        Crew
      </h3>
      <NuxtLink to="/crew" class="mb-2 underline block">
        Zur Crew
      </NuxtLink>
      <p>
        Auf der Crew Seite werden alle Charactere angezeigt die derzeit Teil der Basis sind. Diese können Spieler*Innen zugeordnet sein - oder auch nicht.<br>
        Alle sind herzlich eingeladen Teile ihrer Geschichte oder Bilder hier mit den anderen zu teilen.
      </p>
      <h3 id="meta" class="text-xl mt-6">
        Meta
      </h3>
      <NuxtLink to="/meta" class="mb-2 underline block">
        Zur Meta Seite
      </NuxtLink>
      <p>
        Auf der Meta Seite sind Informationen wie eine Session geleitet werden kann. Verschiedenste Ressourcen wie Checklisten, Zufallstabellen und vorgefertigte OpenLegends Kreaturen.
      </p>
      <h3 id="backend" class="text-xl mt-6">
        Backend
      </h3>
      <NuxtLink to="https://blackmoon-api.democrify.xyz/admin/login" class="mb-2 underline block">
        Zum Backend
      </NuxtLink>
      <p>
        Das Backend verwaltet die Daten auf dieser Webseite. Die Daten dort sind analog zu dieser Webseite gegliedert.<br>
        Den Login könnt ihr bei Georg anfragen, eine eingeständige Registrierung ist nicht vogesehen.<br>
        Weitere Erklärungen folgen auf Bedarf/Anfrage.
      </p>
    </div>
  </div>
</template>
