<script setup lang="ts">
interface Props {
  collapsed: boolean
}
defineProps<Props>()
defineEmits(['toggleCollapse'])
</script>

<template>
  <div class="size-full flex bg-black text-white overflow-x-hidden">
    <div class="relative h-full flex flex-col border-r border-white p-2 transition-all duration-500 select-none" :class="{ 'w-72': !collapsed, 'w-0': collapsed }">
      <button
        class="absolute top-1/2 right-0 border border-white leading-none p-1 z-10 translate-x-full"
        @click="$emit('toggleCollapse')"
      >
        <span v-if="!collapsed">&lt;&lt;</span>
        <span v-if="collapsed">&gt;&gt;</span>
      </button>
      <slot name="tags" />
      <template v-if="!collapsed">
        <slot name="list" />
      </template>
    </div>
    <div class="max-w-full relative">
      <div class="absolute top-2 left-2 flex gap-4">
        <NuxtLink to="/" class="absolute top-2 left-2 border border-white leading-none p-1">
          R.T.M.V.
        </NuxtLink>
      </div>
      <slot name="content" />
    </div>
  </div>
</template>
