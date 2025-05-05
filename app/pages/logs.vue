<script setup lang="ts">
const response = await $fetch(`${apiUrl()}/logs?limit=999`) as { docs: BlackMoonLog[] }
const collapsed = ref(false)

const currentLog = ref<any | undefined>()
</script>

<template>
  <div v-if="response" class="size-full flex bg-black text-white">
    <div class="relative h-full flex flex-col border-r border-white p-2 transition-all duration-500 select-none" :class="{ 'w-48': !collapsed, 'w-0': collapsed }">
      <button class="absolute top-1/2 right-0 border border-white leading-none p-1 translate-x-full z-10" @click="collapsed = !collapsed">
        <span v-if="!collapsed">&lt;&lt;</span>
        <span v-if="collapsed">&gt;&gt;</span>
      </button>
      <template v-if="!collapsed">
        <div v-for="log of response.docs" :key="log.id" @click.stop="currentLog = log">
          {{ log.title }} [{{ log.author }}]
        </div>
      </template>
    </div>
    <div class="w-full relative">
      <div class="absolute top-2 left-2 flex gap-4">
        <NuxtLink to="/" class="absolute top-2 left-2 border border-white leading-none p-1">
          R.T.M.V.
        </NuxtLink>
      </div>

      <template v-if="currentLog">
        <div class="size-full pt-12 px-8">
          <h1 class="text-2xl">
            {{ currentLog.title }} - {{ currentLog.created }}
          </h1>
          <div v-html="currentLog.content_html" />
        </div>
      </template>
    </div>
  </div>
</template>
