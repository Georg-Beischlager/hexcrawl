<script setup lang="ts">
const response = await $fetch(`${apiUrl()}/logs?limit=999`) as { docs: BlackMoonLog[] }
const collapsed = ref(false)

const currentLog = ref<any | undefined>()
</script>

<template>
  <EntryList v-if="response && response.docs" :collapsed="collapsed">
    <template #list>
      <div v-for="log of response.docs" :key="log.id" @click.stop="currentLog = log">
        {{ log.title }} [{{ log.author }}]
      </div>
    </template>
    <template v-if="currentLog" #content>
      <div class="size-full pt-12 px-8">
        <h1 class="text-2xl">
          {{ currentLog.title }} - {{ currentLog.createdAt }}
        </h1>
        <div v-html="currentLog.content_html" />
      </div>
    </template>
  </EntryList>
</template>
