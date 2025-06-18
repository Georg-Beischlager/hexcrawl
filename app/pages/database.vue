<script setup lang="ts">
const { dbEntries, tags, dbEntriesForCoords, shortForUser } = await useData()

const collapsed = ref(false)
const currentEntry = ref<Database | undefined>()
const selectedTags = ref<number[]>([])
const route = useRoute()

if (route.query.id) {
  currentEntry.value = dbEntries.value?.find(db => db.id === Number(route.query.id))
}

function toggleTag(id: number) {
  const index = selectedTags.value.indexOf(id)
  if (index >= 0) {
    selectedTags.value = selectedTags.value.filter(x => x !== id)
  }
  else {
    selectedTags.value = [...selectedTags.value, id]
  }
}

const filteredEntries = computed(() => {
  if (!dbEntries.value) {
    return []
  }
  let ret = dbEntries.value
  if (selectedTags.value.length > 0) {
    ret = ret.filter((dbEntry) => {
      return dbEntry.tags?.some((t) => {
        const id = (t.tag as Tag).id
        return selectedTags.value.includes(id)
      })
    })
  }

  if (route.query.row && route.query.column) {
    ret = dbEntriesForCoords(Number(route.query.row), Number(route.query.column), ret)
  }

  return ret
})
</script>

<template>
  <EntryList :collapsed="collapsed" @toggle-collapse="collapsed = !collapsed">
    <template #tags>
      <template v-if="tags && !collapsed">
        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="tagEntry of tags" :key="tagEntry.id"
            class="border border-white px-1"
            :class="{ 'border-black bg-white text-black': selectedTags.includes(tagEntry.id), 'border-white': !selectedTags.includes(tagEntry.id) }"
            @click="toggleTag(tagEntry.id)"
          >{{ tagEntry.tag }}</span>
        </div>
      </template>
    </template>
    <template v-if="filteredEntries" #list>
      <NuxtLink v-if="route && route.query.row && route.query.column" class="py-4" to="/database">
        Coordinate Filter {{ route.query.row }}|{{ route.query.column }} [X]
      </NuxtLink>
      <div v-if="currentEntry && currentEntry.related?.length" class="py-4 flex">
        <div>Related:</div>
        <div v-for="(rel, index) of currentEntry.related" :key="index" class="px-1" @click="currentEntry = (rel.to as Database)">
          {{ rel.alias }}
        </div>
      </div>
      <div v-for="db of filteredEntries" :key="db.id" :class="{ underline: db.id === currentEntry?.id }" @click.stop="currentEntry = db">
        {{ db.title }} [{{ shortForUser(db.author) }}]
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
