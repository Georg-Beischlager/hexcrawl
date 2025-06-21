<script setup lang="ts">
const { rawScale } = useGridData()
</script>

<template>
  <div class="flex justify-center items-center gap-1">
    <input v-model="rawScale" type="range" orient="vertical" min="50" max="150">
  </div>
</template>

<style>
input[type='range'][orient='vertical'] {
  writing-mode: vertical-lr;
  direction: rtl;
  appearance: slider-vertical;
  width: 16px;
  vertical-align: bottom;
  background: white;
}
</style>
