<script setup lang="ts">
const entries = await $fetch(`${apiUrl()}/database?limit=999`)
</script>

<template>
  <div>
    {{ entries }}
  </div>
</template>
