<script setup lang="ts">
const { logEntries } = await useData()
const currentLog = ref<Log | undefined>()
const route = useRoute()

const filteredLogs = computed(() => {
  if (!logEntries.value)
    return []

  // sort by date DESC
  return useCloneDeep(logEntries.value).sort((a, b) => {
    if (!b || !b.when)
      return 1
    if (!a || !a.when)
      return -1
    const aTs = Date.parse(a.when)
    const bTs = Date.parse(b.when)
    return aTs - bTs
  })
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
  <div class="size-full  bg-black text-white p-4">
    <NuxtLink to="/" class="border border-white leading-none p-1">
      BACK
    </NuxtLink>
    <div class="grid grid-cols-4 lg:w-2/3 border border-white gap-[1px] bg-white mt-4">
      <div class="bg-black p-1">
        Titel
      </div>
      <div class="bg-black  p-1">
        Datum
      </div>
      <div class="bg-black  p-1">
        Player
      </div>
      <div class="bg-black  p-1">
        GM(s)
      </div>
      <template v-for="(log, index) of filteredLogs" :key="index">
        <div class="bg-black  p-1">
          {{ log.title }}
        </div>
        <div class="bg-black  p-1">
          {{ log.when }}
        </div>
        <div class="bg-black  p-1">
          {{ log.players?.reduce((acc, curr) => `${curr.player}, ${acc}`, '') }} H.A.N.N.A.H
        </div>
        <div class="bg-black  p-1">
          {{ log.gms }}
        </div>
      </template>
    </div>
  </div>
</template>
