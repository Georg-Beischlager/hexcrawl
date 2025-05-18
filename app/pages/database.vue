<script setup lang="ts">
console.warn(apiUrl())
const dbResponse = await $fetch(`${apiUrl()}/database?limit=999`) as { docs: BlackMoonLog[] }
const tagsRepsonse = await $fetch(`${apiUrl()}/tags?limit=999`) as { docs: { id: number, tag: string }[] }
const collapsed = ref(false)
const currentEntry = ref<any | undefined>()
const selectedTags = ref<number[]>(tagsRepsonse.docs ? tagsRepsonse.docs.map(t => t.id) : [])

function toggleTag(id: number) {
  const index = selectedTags.value.indexOf(id)
  if (index >= 0) {
    selectedTags.value = selectedTags.value.filter(x => x !== id)
  }
  else {
    selectedTags.value = [...selectedTags.value, id]
  }
}
</script>

<template>
  <div class="size-full flex bg-black text-white overflow-x-hidden">
    <template v-if="dbResponse">
      <div class="relative h-full flex flex-col border-r border-white p-2 transition-all duration-500 select-none" :class="{ 'w-72': !collapsed, 'w-0': collapsed }">
        <button
          class="absolute top-1/2 right-0 border border-white leading-none p-1 z-10 translate-x-full"
          @click="collapsed = !collapsed"
        >
          <span v-if="!collapsed">&lt;&lt;</span>
          <span v-if="collapsed">&gt;&gt;</span>
        </button>
        <template v-if="tagsRepsonse && tagsRepsonse.docs && !collapsed">
          <div class="flex flex-wrap justify-center gap-2">
            <span
              v-for="tagEntry of tagsRepsonse.docs" :key="tagEntry.tag"
              class="border border-white px-1"
              :class="{ 'border-black bg-white text-black': selectedTags.includes(tagEntry.id), 'border-white': !selectedTags.includes(tagEntry.id) }"
              @click="toggleTag(tagEntry.id)"
            >{{ tagEntry.tag }}</span>
          </div>
        </template>
        <template v-if="!collapsed">
          <div v-for="log of dbResponse.docs" :key="log.id" @click.stop="currentEntry = log">
            {{ log.title }} [{{ log.author }}]
          </div>
        </template>
      </div>
      <div class="max-w-full relative">
        <div class="absolute top-2 left-2 flex gap-4">
          <NuxtLink to="/" class="absolute top-2 left-2 border border-white leading-none p-1">
            R.T.M.V.
          </NuxtLink>
        </div>
        <template v-if="currentEntry">
          <div class="h-full max-w-full pt-12 pl-8 whitespace-pre-wrap">
            <h1 class="text-2xl">
              {{ currentEntry.title }} - {{ currentEntry.createdAt }}
            </h1>
            <div v-html="currentEntry.content_html" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
