<script setup lang="ts">
const { debug, showCoordinates, scale, selectedTile, viewX, viewY, centerView } = useGridData()
const { dbEntries, dbEntriesForCoords, logEntries, logEntriesForCoords } = await useData()

const tileDbLinks = computed(() => {
  if (!selectedTile.value || !dbEntries.value)
    return undefined
  const db = dbEntriesForCoords(selectedTile.value.row, selectedTile.value.col, dbEntries.value)
  if (db && db.length > 0) {
    return {
      name: `DB [${db.length}]`,
      url: `/database?row=${selectedTile.value.row}&column=${selectedTile.value.col}`,
    }
  }
  return undefined
})

const tileLogLinks = computed(() => {
  if (!selectedTile.value || !logEntries.value)
    return undefined
  const logs = logEntriesForCoords(selectedTile.value.row, selectedTile.value.col, logEntries.value)
  if (logs && logs.length > 0) {
    return {
      name: `LOGS [${logs.length}]`,
      url: `/logs?row=${selectedTile.value.row}&column=${selectedTile.value.col}`,
    }
  }
  return undefined
})

function toggleCoordinates() {
  showCoordinates.value = !showCoordinates.value
}
function changeScale(n: number) {
  scale.value = n
  centerView()
}
</script>

<template>
  <div class="bg-black border border-white h-[150px] ">
    <div class="size-full flex-col justify-between items-center max-w-screen-lg  text-white select-none leading-none mx-auto">
      <div class="px-2 flex flex-col gap-2 text-center overflow-hidden">
        <div>H.A.N.N.A.H. Interface</div>
        <div class="flex gap-1 items-center flex-wrap">
          <NuxtLink to="/sessions" class="border border-white px-2 bg-black">
            SESSIONS
          </NuxtLink>
          <NuxtLink to="/database" class="border border-white px-2 bg-black">
            DB
          </NuxtLink>
          <NuxtLink to="/logs" class="border border-white px-2 bg-black">
            LOGS
          </NuxtLink>
          <NuxtLink to="/crew" class="border border-white px-2 bg-black">
            CREW
          </NuxtLink>
          <div class="border border-white px-2" @click="centerView">
            R.V.O.
          </div>
          <div class="border border-white px-2 bg-black" :class="{ invert: showCoordinates }" @click="toggleCoordinates">
            T.C.D.
          </div>
          <div class="px-2 bg-black ml-1">
            Scale:
          </div>
          <div class="border border-white px-2 bg-black" :class="{ invert: scale < 1 }" @click="changeScale(0.66)">
            0.66
          </div>
          <div class="border border-white px-2 bg-black" :class="{ invert: scale === 1 }" @click="changeScale(1)">
            1.00
          </div>
          <div class="border border-white px-2 bg-black" :class="{ invert: scale > 1 }" @click="changeScale(1.33)">
            1.33
          </div>
        </div>
      </div>

      <div class="px-2  overflow-hidden">
        <div class="flex flex-wrap gap-2 mt-2">
          <div>&lt;ViewBounds&gt; [{{ Math.trunc(viewX) }} / {{ Math.trunc(viewY) }}]</div>
          <div v-if="selectedTile" class="flex gap-2">
            <div>&lt;Tile&gt; {{ selectedTile.row }} | {{ selectedTile.col }}</div>
            <NuxtLink v-if="tileDbLinks" :to="tileDbLinks.url" class="underline">
              {{ tileDbLinks.name }}
            </NuxtLink>
            <NuxtLink v-if="tileLogLinks" :to="tileLogLinks.url" class="underline">
              {{ tileLogLinks.name }}
            </NuxtLink>
          </div>
          <div v-if="debug">
            {{ debug }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
