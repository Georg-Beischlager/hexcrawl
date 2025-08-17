<script setup lang="ts">
interface RandomTable {
  title: string
  entries: string[]
  hidden: boolean
}

const randomTables = ref<RandomTable[]>([
  { title: 'Names', hidden: true, entries: [
    `Ethan Dewitt`,
    `Graham Burcham`,
    `Urien Dituri`,
    `Drake Lockley`,
    `Kedric Lockley`,
    `Everett Riordan`,
    `Wilhelm Forgrave`,
    `Uruk Wakeman`,
    `Cyan Breton`,
    `Cory Haught`,
    `Orson Watrous`,
    `Xavier Kampf`,
    `Harlan Bucanan`,
    `Ahren Castillon`,
    `Zared Amano`,
    `Lincoln Barrick`,
    `Benedict Catlow`,
    `Darius Vangelos`,
    `Vaughn Zavaleta`,
    `Yavin Hames`,
    `Nokat`,
    `Istaw`,
    `Ukaw`,
    `Ikak`,
    `Kata`,
    `Ralu`,
    `Raiukam`,
    `Loakam`,
    `Amtsuk`,
    `Olok`,
  ] },
  { title: 'Random NPCs', hidden: true, entries: [
    `Velle: Female Humanoid Pilot. Velle has gray skin and messy green hair. She wears current fashion and carries a laser pistol. Velle is a terrible liar.`,
    `Oz-428: Assassin Robot. Oz-428 has an open chassis and glowing green eyes, and is armed with a concealed monofilament whip. It speaks with a deep voice.`,
    `Clary Pete: Male Technician. Clary has copper hair and amber eyes. He wears an utility jumpsuit and carries a laser cutter/welder. Clary is disorganized and cynical.`,
    `Kimby Washy: Female Scientist. Kimby has black hair and brown eyes, and a round nose. She wears an old uniform and carries a tablet computer. Kimby is a wanderer, seeking new discoveries and experiences.`,
    `Maddox-704: Medical Robot. Maddox-704 has a wheeled chassis and five arms, and is equipped with a life support system and bioreactor. It speaks with a strange accent.`,
    `Arlen Morgonz: Male Paramedic. Arlen is short and slender, with white hair and dark grey eyes. He wears classical fashion and carries a medical kit. Arlen is a wanderer, seeking new discoveries and experiences.`,
    `Raige Brison: Male Rogue. Raige is tall and overweight, with copper hair and large red eyes. He wears an utility jumpsuit and carries a tablet computer. Raige is reserved and impatient.`,
    `Tammy Clenels: Female Scientist. Tammy is tall, with messy blue hair and narrow opalescent eyes. She wears a black jumpsuit and carries a tablet computer. Tammy is decisive and anxious.`,
    `Erer Risand: Male Smuggler. Erer has thick auburn hair and green eyes. He wears classical fashion and carries a needlegun. Erer is fascinated by alien technology.`,
    `Hane Gryante: Male Mercenary. Hane is heavyset, with green hair and sharp white eyes. He wears a white jumpsuit and carries a tablet computer. Hane is reserved and tactless.`,
    `Spanner: Technical Robot. Spanner has seamless plastic skin and glowing yellow eyes, and is equipped with various fine tools and manipulators. It is humble and bold.`,
    `Shaward: Female Mammalian Paramedic. Shaward has mottled yellow fur and red eyes. She wears an old uniform and carries a semi-automatic pistol. Shaward has a severe allergy to cats.`,
    `Picard: Exploration Robot. Picard has a pair of heavy arms and glowing green eyes, and is equipped with various sensors and survey tools. It is sadistic but creative.`,
    `C'Vasi: Female Mammalian Mercenary. C'Vasi is tall, with black skin and sharp teeth. She wears an utility jumpsuit and carries a semi-automatic pistol. C'Vasi is humble and anxious.`,
    `Hisi: Male Humanoid Mercenary. Hisi has black hair and light yellow eyes. He wears a technical jumpsuit and carries a semi-automatic pistol. Hisi has a severe allergy to dogs.`,
    `Brichy Russon: Male Scientist. Brichy has a narrow face, with violet hair and soft silver eyes. He wears a gray jumpsuit and carries a needlegun. Brichy speaks with a strange accent.`,
    `Taliesin-298: Medical Robot. Taliesin-298 has a wheeled chassis and five multi-jointed arms, and is equipped with sophisticated medical and surgical instruments. It is programmed to be cautious and inquisitive.`,
    `Jony Derson: Male Technician. Jony has golden hair and cyan eyes, and a thick moustache. He wears classical fashion and carries a needlegun. Jony has an a paralyzing fear of alien creatures.`,
    `Petev Ryante: Male Smuggler. Petev has cropped violet hair and large silver eyes. He wears a white jumpsuit and carries a tablet computer. Petev has no idea what he's doing, but has confidence doing it.`,
    `Jamy Terson: Male Mercenary. Jamy has a round face, with short blue hair and silver eyes. He wears an utility jumpsuit and carries a laser pistol. Jamy is irreverent and guarded.`,
  ] },
  { title: 'Random Encounters', hidden: true, entries: [
    `A robot mercenary named IW-897, master of the cutter Conquest. Its computer's memory core has been corrupted, and it requests assistance.`,
    `A swirling mass of destructive nanobots drifts in empty space.`,
    `A male explorer named Redy Flery, master of the Constellation. His research has convinced him that something impossibly powerful and utterly evil lurks in hyperspace.`,
    `A female avian merchant named Rasi, master of the Dragonfly. She has broadcast a distress signal, claiming that her cargo of robotic toys has activated itself, and they are trying to kill her.`,
    `The Aeogron Drifter, an exploration spaceship with Common Hull and an elevated command deck. It is transmitting an indecipherable signal across multiple channels.`,
    `Sheathia Hesand, a female merchant, master of the Cicada. She has been learning something called "freestyle rap", and is eager to try it out with another spacer.`,
    `An icy asteroid drifts in empty space, surrounded by a cloud of furnace slag.`,
    `A robot pirate named Merrick-461, master of the privateer vessel Belenus. It is searching for an alien artfact named the Decacross of Goidi.`,
    `A female saurian merchant named Mautai, master of the free trader Eban Trader. She has recently acquired several arachnid slaves, and is anxious to find a buyer.`,
    `A robot pirate named IO-442, master of the raider Aegis of Teni. It has recently upgraded its rapid-fire railguns, and is looking for a fight to test them.`,
    `An immense alien probe drifts in empty space. It does not believe that biological creatures can be sentient.`,
    `A rogue crystalline planet flies through space, surrounded by an immense ring-like fusion ramjet engine.`,
    `An ancient alien probe orbits a hyperactive white star. It has become xenophobic, and is capable of manipulating stellar magnetic fields to deflect spacecraft.`,
    `Ralphy Kelly, a male mercenary, master of the corvette Lance of Benni. His computer's memory core has been corrupted, and he requests assistance.`,
    `A cratered planet orbits a hyperactive blue star. It is covered with the ruins of a machine-age civilization, wiped out by a bio-engineered virus.`,
    `A sublight spacecraft in a long orbit around a nearby hyperactive blue star. Its humanoid pilot is long-dead, but still animated by its cybernetics.`,
    `A mated pair of colossal space whales, fighting a swarm of smaller predators.`,
    `A male humanoid mercenary named Morpha, master of the corvette Instrument of Vengeance. He has been learning something called "karaoke", and is eager to try it out with another spacer.`,
    `The Debry's Opportunity, a private yacht with Common Hull and two large engine nacelles. Its crew has run out of Achith truffles, and requests assistance.`,
    `A mated pair of giant space whales, feeding on a living nebula.`,
    `A rift in space suddenly tears open. Beyond it lies a battle between immense alien spacecraft.`,
    `A female pirate named Risty Mira, master of the privateer vessel Claymore of Dracia. She has broadcast a distress signal, and lurks within the shell of a derelict space station.`,
    `A derelict space station, torn open from within, orbits an alien planet.`,
    `An alien warship orbits a cratered planet, dropping nuclear weapons.`,
    `An immense gravity wave sweeps through space, damaging FTL drives.`,
    `Debra Hughy, a female merchant, master of the Insured Asset. She has recently acquired several cases of illegal salvage, and is anxious to find a buyer.`,
    `A male arachnid pirate named Cone Esull, master of the raider David Drake. He has broadcast a distress signal, and trapped a bait spacecraft with an EMP mine.`,
    `An ocean planet orbits a hyperactive white star. It is home to a theocratic civilization of saurians, who have already developed steam-powered airships.`,
    `A spherical alien probe orbits a frozen planet. It was programmed to be xenophobic, and is capable of generating wormholes to deflect spacecraft.`,
    `An incandescent cloud of metallic plasma suddenly emerges from hyperspace.`,
    `A frozen planet orbits a blue giant star. A strange alien spacecraft lies entombed within its mountains of ice.`,
    `YE-432, a robot mercenary, master of the corvette Citadel of Xami. It has been hired to protect the planet Seker V from a fierce space kraken.`,
    `Jareth-884, a robot scientist, master of the research vessel Serendipity. It has been learning something called "freestyle rap", and is eager to try it out with another spacer.`,
    `A derelict cargo spaceship suddenly emerges from hyperspace. One of the robot crew is still active, but its memory core is damaged.`,
    `A swarm of glittering space crabs, searching for food.`,
    `A barren planet orbits a blue star. Swarms of self-replicating nanobots cover its surface.`,
    `A male scientist named Joshua Warte, master of the research vessel Horizon. He has been learning something called "yodeling", and is eager to try it out with another spacer.`,
    `An ancient alien probe orbits a cratered planet. It has become xenophobic, and attacks any approaching spacecraft with laser weapons.`,
    `A black hole suddenly falls out of hyperspace.`,
    `A robot pirate named Zero, master of the privateer vessel Claymore of Tralfa. It has broadcast a distress signal, and trapped a bait spacecraft with an ion mine.`,
    `A male mammalian explorer named Zora Zoni, master of the scout vessel Horizon. He has located a large deposit of zalkiium, but needs help relocating the indigenous aliens.`,
    `A male mercenary named Brence Rownand, master of the Victory. He is unconscious, and his spacecraft is falling towards a white dwarf star.`,
    `The Aegis of Tlikyo, a patrol spaceship with Common Hull. It has come alongside a damaged spacecraft to provide assistance.`,
    `Janus-758, a robot explorer, master of the scout vessel Buzz Aldrin. It is pursuing the miners who destroyed the ruins of New Vaalbara.`,
    `A male mammalian pirate named Cradi T'Venti, master of the Antagonist. He has recently upgraded his ion cannons, and is looking for a fight to test them.`,
    `A robot mercenary named B-436, master of the Dauntless. Its FTL drive has been damaged by a gravitational anomaly, and it requests assistance.`,
    `A derelict passenger shuttle orbits a cratered planet. Its engines have been neatly severed by some type of laser weapon.`,
    `A sublight spacecraft in a long orbit around a nearby red giant star. Its humanoid pilot is long-dead, but still animated by its cybernetics.`,
    `An immense alien probe orbits a hyperactive red star. It was programmed to be curious, and is eager to exchange geological data.`,
    `A derelict courier spaceship orbits a volcanic planet. Its cargo containers have been neatly severed by some type of laser weapon.`,
  ] },
  { title: 'Random Mechs', hidden: true, entries: [
    `Commando: Medium Urban Combat Mech. The Commando has a reinforced frame with several modular hardpoints. It is armed with a heavy laser cannon in the right arm and a long-range missile pack in each side of the torso. The model is notorious for significant weak points in its armor.`,
    `Marksman: Medium Urban Combat Mech. The Marksman has an agile four-legged frame covered by ablative panels. It carries a particle cannon in its right hand, and has a particle cannon in each side of the torso for additional firepower. The model is frequently field-modified with anti-personnel mines.`,
    `Pathfinder: Medium Recon Mech. The Pathfinder has a compact frame and vectored fusion jump jets. It carries a railgun in its right hand, and has a short-range missile pack in each side of the torso for additional firepower. It is also equipped with an experimental stealth system.`,
    `Prometheus: Medium Recon Mech. The Prometheus has an angular frame and vectored fusion jump jets. It is armed with a laser cannon in the right arm and a short-range missile pack in each side of the torso. It is also equipped with an advanced sensor suite.`,
    `Wraith: Heavy Aerospace Mech. The Wraith has an aerodynamic frame with antigravity nacelles. It is armed with a heavy particle cannon in the right arm and a heavy laser cannon in each side of the torso.`,
    `Ghost: Light Recon Mech. The Ghost has a compact frame with a center torso cockpit. It is armed with a machine gun in the right arm and a long-range missile pack in each side of the torso.`,
    `Tyche: Heavy Recon Mech. The Tyche has an agile frame covered by ablative panels. It carries a heavy railgun in its right hand, and has a rotary missile launcher in each side of the torso for additional firepower. The model is frequently field-modified with specialized sensors.`,
    `Thoth: Light Recon Mech. The Thoth has an agile frame with a center torso cockpit. It carries a light laser cannon in its right hand, and has a vulcan machine gun in each side of the torso for additional firepower. It is also equipped with an advanced sensor suite.`,
    `Executioner: Light Assault Mech. The Executioner has a compact frame with a center torso cockpit. It is armed with a railgun in each arm and a long-range missile pack in each side of the torso. The model is frequently field-modified with a more capable targeting computer.`,
    `Steadfast: Light Assault Mech. The Steadfast has a sturdy frame with several modular hardpoints. It carries a fusion lance in its right hand, and has a long-range missile pack in its left arm and an autocannon in each side of the torso for ranged firepower.`,
  ] },
  { title: 'Random Spaceships', hidden: true, entries: [
    `Legend of Teri: Exploration Spaceship. The Legend of Teri has a blocky hull. It is equipped with an advanced sensor system and defensive ion cannon.`,
    `Harrier: Patrol Spaceship. The Harrier has a blocky hull with aerodynamic wings. It is equipped with point-defense lasers and armed with pulse laser cannons.`,
    `Celestial Constellation: Research Spaceship. The Celestial Constellation has an aerodyne hull and advanced sublight engines with redundant backup systems. It is equipped with autonomous observation probes and a landing shuttle.`,
    `Solar Empress: Passenger Shuttle. The Solar Empress has a sleek hull and fast ion engines. It is equipped with 140 passenger seats and a landing shuttle.`,
    `Severance Package: Privateer Spaceship. The Severance Package has an ellipsoid primary hull welded to several smaller spherical structures. It is equipped with a single suite and armed with missile racks.`,
    `Irregular of Jari: Privateer Spaceship. The Irregular of Jari has a blocky hull and an obsolete jump drive which requires repairs after every run. It is equipped with a single basic suite and armed with autonomous hunter drones.`,
    `Sergey Korolyov: Research Spaceship. The Sergey Korolyov has an ellipsoid hull covered with scorch marks. It is equipped with autonomous sensor probes and a landing shuttle.`,
    `Thrush: Private Yacht. The Thrush has a blocky hull and obsolete sublight engines. It is equipped with three compartments and a defensive force shield.`,
    `Queen of Ticia: Passenger Shuttle. The Queen of Ticia has a salvaged hull and glitchy sublight engines which leak radiation. It is equipped with 100 passenger seats and a defensive ion cannon.`,
    `Bani Wayfarer: Exploration Spaceship. The Bani Wayfarer has a narrow hull and a glitchy quantum drive which interferes with unshielded electronics. It is equipped with an advanced sensor system and landing shuttle.`,
  ] },
  { title: 'Random Cans of Food', hidden: true, entries: [
    `An extra-large can covered by a thick layer of wax. It contains clear pudding, which tastes something like lime.`,
    `A corroded duraplast can covered by a thick layer of wax. It contains gritty stew with green noodles, which tastes like pickled nuts.`,
    `A corroded duraplast can of slimy paste. It tastes like sour mushrooms, with an aftertaste of epoxy.`,
    `A shiny duraplast can wrapped in a humorous bumper sticker. Its filled with orange stew with fatty chunks, which tastes like spicy melon.`,
    `An extra-large tin can with several buttons which don't seem to do anything. It contains purple jelly, which tastes something like burnt nuts.`,
    `An extra-large can which hums until opened. It contains fatty chunks in a brown sauce, which tastes something like salty almonds.`,
    `A battered aluminum can of clear stew with green bits, which tastes like tart cheese.`,
    `A battered steel can of orange paste, which tastes like onion.`,
    `A dented tin can of crispy noodles in a green sauce. It smells like methanol, but tastes like coffee.`,
    `An extra-large can of crunchy noodles in a blue sauce. It tastes like orange, with a hint of pine tar.`,
  ] },
  { title: 'Random Drugs', hidden: true, entries: [
    `A shiny ceramic vial labeled "Mint Flavor", filled with blood-like liquid. A faded label describes this drug as a vaccine, but exposure to quantum instability has altered it. When you consume this liquid, your skull becomes softer and malleable for the next hour.`,
    `A torn blister pack holding a single blue gel capsule, marked with a double-helix. There is a drug information label, but it is written in an alien script. When you swallow this capsule, you forget everything for the next hour.`,
    `A steel box labeled "No Refills", containing a single clear plastic patch. When you apply this patch to your skin, you are unaffected by any other drugs for the next day.`,
    `Six white plastic patches in a sealed tin case labeled "Project Chimera". When you apply one of these patches to your skin, a crown of small horns grows on your head over the next few days.`,
    `A brown ampoule labeled "Formula 132", filled with blood-like liquid. A faded label describes this drug as a depressant, but exposure to strange matter contamination has altered it. When you consume this liquid, you can sense magnetic fields for the next seven hours.`,
    `A milky yellow fluid in a brown syringe with a ring of seven short needles. An attached prescription describes this drug as an euphoriant, but time and alien physics have completely transmuted it. When you inject this fluid, you are cured of any current infections.`,
    `A shiny syringe filled with blood-like liquid, which glows slightly in the dark. There was once a drug information label, but it has been destroyed by time. When you inject this liquid, you don't require any sleep for the next 24 hours.`,
    `A clear blue gel in a battered bottle labeled "Mint Flavor". The bottle has been carefully wrapped in a sales sheet, which describes something else called a "quantum air de-ionizer". When you consume this gel, you become resistant to radiation damage for the next day.`,
    `Seven yellow capsules in a grimy box labeled "Emergency Use Only". When you swallow one of these capsules, you grow an additional eye in your forehead for the next six hours.`,
    `A fancy tin cylinder containing four gray pills, shaped like tiny stars. This drug was probably a stimulant, but someone or something has tampered with it. When you swallow one of these pills, your eyes wither for the next day, then regrow but different.`,
  ] },
])
</script>

<template>
  <div class=" bg-black text-white p-4 pb-12 min-h-screen">
    <NuxtLink to="/" class="border border-white leading-none p-1">
      BACK
    </NuxtLink>
    <div class="lg:w-2/3 mt-4">
      <h1>
        Zufallstabellen
      </h1>
      <h2>Quelle</h2>
      <p class="mb-8">
        <a href="https://donjon.bin.sh/weather/">https://donjon.bin.sh/</a><br>
      </p>
      <template v-for="randomTable of randomTables" :key="randomTable.title">
        <template v-if="randomTable.hidden === true">
          <h2 class="flex items-center cursor-pointer" @click="randomTable.hidden = false">
            {{ randomTable.title }} <Icon name="mdi:chevron-down-box" />
          </h2>
        </template>
        <template v-if="randomTable.hidden === false">
          <h2 class="flex items-center cursor-pointer" @click="randomTable.hidden = true">
            {{ randomTable.title }} <Icon name="mdi:chevron-up-box" />
          </h2>
          <ol>
            <li v-for="entry of randomTable.entries" :key="entry">
              {{ entry }}
            </li>
          </ol>
        </template>
      </template>
    </div>
  </div>
</template>

<style>
ol {
  list-style-type: decimal-leading-zero;
}
li {
  padding-top: 8px;
}
</style>
