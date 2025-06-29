<script setup lang="ts">
const { dbEntries, tags, dbEntriesForCoords, shortForUser } = await useData()

const collapsed = ref(false)
const currentEntry = ref<Database | undefined>()
const selectedTags = ref<number[]>([])
const filterText = ref<string | undefined>()
const route = useRoute()

if (route.query.id) {
  currentEntry.value = dbEntries.value?.find(db => db.id === Number(route.query.id))
}

const showFilters = ref(false)

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
  ret = sort(ret) as Database[]
  return filterDB(ret, filterText.value)
})
</script>

<template>
  <EntryList :collapsed="collapsed" @toggle-collapse="collapsed = !collapsed">
    <template #filters>
      <template v-if="tags && !collapsed">
        <div>
          <button class="border border-white px-1" :class="{ 'bg-white text-black': showFilters }" @click="showFilters = !showFilters">
            Filter
          </button>
        </div>
        <template v-if="showFilters">
          <div class="mt-4">
            Tags:
          </div>
          <div class="flex flex-wrap justify-center gap-2 ">
            <span
              v-for="tagEntry of tags" :key="tagEntry.id"
              class="border border-white px-1"
              :class="{ 'border-black bg-white text-black': selectedTags.includes(tagEntry.id), 'border-white': !selectedTags.includes(tagEntry.id) }"
              @click="toggleTag(tagEntry.id)"
            >{{ tagEntry.tag }}</span>
          </div>
          <div class="p-1 flex-col gap-1 mt-4">
            <label for="filterField">Textsuche:</label>
            <input v-model="filterText" name="filterField" type="text" class="bg-black border-b border-white focus:outline-none mx-1">
          </div>
          <NuxtLink v-if="route && route.query.row && route.query.column" class="py-4" to="/database">
            Coordinate Filter {{ route.query.row }}|{{ route.query.column }} [X]
          </NuxtLink>
        </template>
      </template>
    </template>
    <template v-if="filteredEntries" #list>
      <div v-for="db of filteredEntries" :key="db.id" :class="{ underline: db.id === currentEntry?.id }" @click.stop="currentEntry = db">
        <Icon v-if="db.pinned" name="mdi:pin" size="0.75rem" />
        {{ db.title }} [{{ shortForUser(db.author) }}]
      </div>
    </template>
    <template v-if="currentEntry" #content>
      <div class="max-w-full whitespace-pre-wrap">
        <h1>
          {{ currentEntry.title }} - {{ currentEntry.createdAt }}
        </h1>
        <div v-if="currentEntry && currentEntry.related?.length" class="py-4 flex ">
          <div>Related:</div>
          <div v-for="(rel, index) of currentEntry.related" :key="index" class="px-1 cursor-pointer underline" @click="currentEntry = (rel.to as Database)">
            {{ rel.alias }}
          </div>
        </div>
        <div v-html="currentEntry.content_html" />
      </div>
    </template>
  </EntryList>
</template>
