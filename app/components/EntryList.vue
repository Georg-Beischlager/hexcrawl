<script setup lang="ts">
interface Props {
  collapsed: boolean
}
defineProps<Props>()
defineEmits(['toggleCollapse'])
</script>

<template>
  <div class="size-full flex bg-black text-white overflow-x-hidden">
    <div class="relative h-full flex flex-col border-r border-white p-2 transition-all duration-500 select-none shrink-0" :class="{ 'w-72': !collapsed, 'w-0': collapsed }">
      <button
        class="absolute top-1/2 right-0 border border-white leading-none p-1 z-10 translate-x-full"
        @click="$emit('toggleCollapse')"
      >
        <span v-if="!collapsed">&lt;&lt;</span>
        <span v-if="collapsed">&gt;&gt;</span>
      </button>
      <div class="border-b border-white pb-2 border-dotted">
        <slot name="filters" />
      </div>
      <template v-if="!collapsed">
        <slot name="list" />
      </template>
    </div>
    <div id="content-container" class="max-w-full lg:max-w-[1000px] relative border-l border-white max-h-screen overflow-y-auto  pt-4 pb-8 pl-8 lg:px-16 ">
      <NuxtLink to="/" class="border border-white leading-none p-1">
        BACK
      </NuxtLink>
      <div class="mt-4">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style>
#content-container::-webkit-scrollbar {
  width: 0.25rem;
  background: #000000;
}

#content-container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
}

#content-container::-webkit-scrollbar-thumb {
  outline: 1px solid white;
  background-color: black;
}
</style>
