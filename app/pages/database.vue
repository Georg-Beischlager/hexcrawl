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
  <EntryList :collapsed="collapsed">
    <template #tags>
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
    </template>
    <template v-if="dbResponse && dbResponse.docs" #list>
      <div v-for="log of dbResponse.docs" :key="log.id" @click.stop="currentEntry = log">
        {{ log.title }} [{{ log.author }}]
      </div>
    </template>
    <template v-if="currentEntry" #content>
      <div class="h-full max-w-full pt-12 pl-8 whitespace-pre-wrap">
        <h1 class="text-2xl">
          {{ currentEntry.title }} - {{ currentEntry.createdAt }}
        </h1>
        <div v-html="currentEntry.content_html" />
      </div>
    </template>
  </EntryList>
</template>
