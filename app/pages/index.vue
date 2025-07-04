<script setup lang="ts">
import type { ContainerInst, GraphicsInst } from 'vue3-pixi'
import { vResizeObserver } from '@vueuse/components'
import { Container } from 'pixi.js'
import { onTick } from 'vue3-pixi'

// https://abbekeultjes.nl/honeycomb/
// https://vue3-pixi.vercel.app/

const dragPos: Ref<{ x: number, y: number } | undefined> = ref(undefined)

const gridContainer = ref<ContainerInst>()
const { grid, groupedTiles, emptyTileUrl, selectedTile, mapHeight, mapWidth, menuHeight, scale, showCoordinates, viewX, viewY, centerView } = useGridData()
let count = 0
const blue = ref(200)

onMounted(() => {
  onResizeObserver()
  nextTick(centerView)
  onTick(tickFn)
  if (gridContainer.value) {
    gridContainer.value.sortDirty = true
  }
})

function tickFn(delta: number) {
  count += delta * 0.1
  blue.value = Math.trunc(190 + Math.sin(count) * 60)
}

function setView(pos: { x: number, y: number }) {
  viewX.value += pos.x
  viewY.value += pos.y
}

function onResizeObserver() {
  mapWidth.value = window.innerWidth
  mapHeight.value = window.innerHeight
}

function tileRender(g: GraphicsInst, tile: CustomHex) {
  g.clear()
  if (tile.data.color) {
    g.lineStyle(5, tile.data.color)
  }
  else if (selectedTile.value?.col === tile.col && selectedTile.value?.row === tile.row) {
    g.lineStyle(5, `#00a3${blue.value.toString(16)}`)
  }
  else {
    g.lineStyle(5, `#00a3ff`)
  }
  g.drawPolygon(tile.corners)
}

function dragStart($event: MouseEvent | TouchEvent) {
  if ($event instanceof MouseEvent) {
    dragPos.value = { x: $event.x, y: $event.y }
  }
  if (window.TouchEvent && $event instanceof TouchEvent && $event.touches[0]) {
    dragPos.value = { x: $event.touches[0].screenX, y: $event.touches[0].screenY }
  }
}

function dragging($event: MouseEvent | TouchEvent) {
  if (dragPos.value !== undefined) {
    const newPos = { x: 0, y: 0 }
    if ($event instanceof MouseEvent) {
      newPos.x = $event.x
      newPos.y = $event.y
    }
    if (window.TouchEvent && $event instanceof TouchEvent && $event.touches[0]) {
      newPos.x = $event.touches[0].screenX
      newPos.y = $event.touches[0].screenY
    }
    setView({ x: newPos.x - dragPos.value.x, y: newPos.y - dragPos.value.y })
    dragPos.value = newPos
  }
}

function dragEnd() {
  dragPos.value = undefined
}

function selectTile(t: CustomHex) {
  selectedTile.value = t
}
</script>

<template>
  <div v-resize-observer="onResizeObserver" class="size-full">
    <Application :width="mapWidth" :height="mapHeight - menuHeight" @mousedown="dragStart" @touchstart="dragStart" @mouseup="dragEnd" @touchend="dragEnd" @mousemove="dragging" @touchmove="dragging">
      <Container ref="gridContainer" :position-x="viewX" :position-y="viewY" :width="grid.pixelWidth" :height="grid.pixelHeight" :scale="scale">
        <template v-for="tileGroup of groupedTiles">
          <template v-for="(tile) of tileGroup" :key="tile">
            <Sprite v-if="tile.data.visible && tile.data.sprite" event-mode="static" :texture="tile.data.sprite" :anchor="0.5" :x="tile.x" :y="tile.y" :width="80" :height="90" :z-index="1" @pointerdown="selectTile(tile)" />
            <Sprite v-else event-mode="static" :texture="emptyTileUrl" :anchor="0.5" :x="tile.x" :y="tile.y" :width="80" :height="90" :z-index="1" @pointerdown="selectTile(tile)" />
            <Graphics :z-index="2" @render="tileRender($event, tile)" />
            <text v-if="tile.data.icon && !showCoordinates" :anchor="0.5" :style="{ fill: 'white', fontSize: '50px' }" :position-x="tile.x" :position-y="tile.y">
              {{ tile.data.icon }}
            </text>
            <text v-if="showCoordinates" :anchor="0.5" :style="{ fill: 'white' }" :position-x="tile.x" :position-y="tile.y">
              {{ tile.row }}|{{ tile.col }}
            </text>
          </template>
        </template>
      </Container>
    </Application>
    <div :style="{ height: `${menuHeight}px` }">
      <MapMenu />
    </div>
    <div class="fixed right-2 bg-black p-1 border border-white" :style="{ bottom: `${menuHeight}px` }">
      <MapControls />
    </div>
  </div>
</template>

<style>
</style>
