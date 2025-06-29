<script setup lang="ts">
const { logEntries, logEntriesForCoords, shortForUser } = await useData()
const collapsed = ref(false)
const currentLog = ref<Log | undefined>()
const route = useRoute()

const filteredLogs = computed(() => {
  if (!logEntries.value) {
    return []
  }
  if (route.query.row && route.query.column) {
    return logEntriesForCoords(Number(route.query.row), Number(route.query.column), logEntries.value)
  }
  return logEntries.value
})

onMounted(() => {
  if (filteredLogs.value && filteredLogs.value.length > 0) {
    currentLog.value = filteredLogs.value[0]
  }
  if (route.query.id) {
    currentLog.value = logEntries.value?.find(log => log.id === Number(route.query.id))
  }
})
</script>

<template>
  <EntryList :collapsed="collapsed" @toggle-collapse="collapsed = !collapsed">
    <template #filters>
      <NuxtLink v-if="route && route.query.row && route.query.column" class="py-4" to="/logs">
        Coordinate Filter {{ route.query.row }}|{{ route.query.column }} [X]
      </NuxtLink>
    </template>
    <template v-if="logEntries" #list>
      <div v-for="log of filteredLogs" :key="log.id" @click.stop="currentLog = log">
        {{ log.title }} [{{ shortForUser(log.author) }}]
      </div>
    </template>
    <template v-if="currentLog" #content>
      <div class="size-full">
        <h1>
          {{ currentLog.title }} - {{ currentLog.createdAt }}
        </h1>
        <div v-html="currentLog.content_html" />
      </div>
    </template>
  </EntryList>
</template>
