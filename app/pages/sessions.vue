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
      R.T.M.V.
    </NuxtLink>
    <div class="grid grid-cols-3 lg:w-1/2 border border-white gap-[1px] bg-white mt-4">
      <template v-for="(log, index) of filteredLogs" :key="index">
        <div class="bg-black">
          {{ log.title }}
        </div>
        <div class="bg-black">
          {{ log.when }}
        </div>
        <div class="bg-black">
          {{ log.players?.reduce((acc, curr) => `${curr.player}, ${acc}`, '') }} H.A.N.N.A.H
        </div>
      </template>
    </div>
  </div>
</template>
