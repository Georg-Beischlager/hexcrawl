<script setup lang="ts">
const { showCoordinates, centerView } = useGridData()
const showControls = ref(true)
function toggleCoordinates() {
  showCoordinates.value = !showCoordinates.value
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-1 items-center flex-wrap text-white">
      <template v-if="showControls">
        <div class="px-2 leading-none">
          <Icon name="mdi:magnify" size="1.5rem" class="mt-1" />
        </div>
        <ScaleSlider />
        <div class="border border-white cursor-pointer px-2 leading-none" @click="centerView">
          <Icon name="mdi:crosshairs-gps" size="1.5rem" class="mt-1" />
        </div>
        <div class="border border-white bg-black cursor-pointer px-2" :class="{ invert: showCoordinates }" @click="toggleCoordinates">
          X|Y
        </div>
        <div class="border border-white bg-black cursor-pointer px-2" @click="showControls = false">
          HIDE
        </div>
      </template>
      <template v-else>
        <div class="border border-white bg-black cursor-pointer px-2" @click="showControls = true">
          SHOW
        </div>
      </template>
    </div>
  </div>
</template>
