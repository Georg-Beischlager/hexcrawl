<script setup lang="ts">
const { crew } = await useData()
const collapsed = ref(false)
const currentCharacter = ref<Character | undefined>()
const route = useRoute()

const filteredCrew = computed(() => {
  return crew.value
})

onMounted(() => {
  if (filteredCrew.value && filteredCrew.value.length > 0) {
    currentCharacter.value = filteredCrew.value[0]
  }
  if (route.query.id) {
    currentCharacter.value = crew.value?.find(character => character.id === Number(route.query.id))
  }
})
</script>

<template>
  <EntryList :collapsed="collapsed" @toggle-collapse="collapsed = !collapsed">
    <template v-if="crew" #list>
      <NuxtLink v-if="route && route.query.row && route.query.column" class="py-4" to="/logs">
        Coordinate Filter {{ route.query.row }}|{{ route.query.column }} [X]
      </NuxtLink>
      <div v-for="character of filteredCrew" :key="character.id" @click.stop="currentCharacter = character">
        {{ character.name }}
      </div>
    </template>
    <template v-if="currentCharacter" #content>
      <div class="size-full pt-12 px-8">
        <h1 class="text-2xl">
          {{ currentCharacter.name }} - {{ currentCharacter.createdAt }}
        </h1>
        <img v-if="currentCharacter.image && (currentCharacter.image as Media).url " :src="((currentCharacter.image as Media).url as string)" class="max-h-[500px] max-w-[500px] select-none">
        <div v-html="currentCharacter.biography_html" />
      </div>
    </template>
  </EntryList>
</template>
