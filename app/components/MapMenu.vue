<script setup lang="ts">
const { debug, selectedTile } = useGridData()
const { dbEntries, dbEntriesForCoords, logEntries, logEntriesForCoords } = await useData()

const tileDbLinks = computed(() => {
  if (!selectedTile.value || !dbEntries.value)
    return undefined
  const db = dbEntriesForCoords(selectedTile.value.row, selectedTile.value.col, dbEntries.value)
  if (db && db.length > 0) {
    return {
      name: `DB[${db.length}]`,
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
      name: `LOGS[${logs.length}]`,
      url: `/logs?row=${selectedTile.value.row}&column=${selectedTile.value.col}`,
    }
  }
  return undefined
})
</script>

<template>
  <div class="bg-black border border-white h-full">
    <div class="size-full flex-col justify-between items-center max-w-screen-lg  text-white select-none leading-none mx-auto">
      <div class="px-2 flex flex-col gap-2 text-center overflow-hidden">
        <div>H.A.N.N.A.H. Interface</div>
        <nav class="flex gap-1 items-center flex-wrap justify-center">
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
          <NuxtLink to="/meta" class="border border-white px-2 bg-black">
            META
          </NuxtLink>
          <NuxtLink to="https://blackmoon-api.democrify.xyz/admin/login" class="border border-white px-2 bg-black" target="_blank">
            BACKEND
          </NuxtLink>
          <NuxtLink to="/help" class="border border-white px-2 bg-black">
            HELP
          </NuxtLink>
          <NuxtLink to="/about" class="border border-white px-2 bg-black">
            ABOUT
          </NuxtLink>
        </nav>
      </div>
      <div class="px-2  overflow-hidden">
        <div class="flex flex-wrap gap-2 mt-2">
          <div v-if="selectedTile" class="flex gap-2">
            <div>&lt;Tile&gt;[{{ selectedTile.row }}|{{ selectedTile.col }}]</div>
            <NuxtLink v-if="tileDbLinks" :to="tileDbLinks.url" class="border-b border-white">
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
