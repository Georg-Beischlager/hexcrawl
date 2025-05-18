<script setup lang="ts">
import type { Graphics } from 'pixi.js'
import type { ContainerInst, GraphicsInst } from 'vue3-pixi'
import { vResizeObserver } from '@vueuse/components'
import { Container } from 'pixi.js'
import { onTick } from 'vue3-pixi'

// https://abbekeultjes.nl/honeycomb/
// https://vue3-pixi.vercel.app/

const showCoordinates = ref(false)
const viewX = ref(50)
const viewY = ref(50)
const dragPos: Ref<{ x: number, y: number } | undefined> = ref(undefined)

const debug = ref('')
const gridContainer = ref<ContainerInst>()
const { grid } = useGridData()

let count = 0
const blue = ref(200)
const mapWidth = ref(100)
const mapHeight = ref(100)

onMounted(() => {
  onResizeObserver()
  nextTick(centerView)
  onTick(tickFn)
  if (gridContainer.value) {
    gridContainer.value.sortDirty = true
  }
})

function tickFn(delta: number) {
  count += delta * 0.025
  blue.value = Math.trunc(190 + Math.sin(count) * 60)
}

function setView(pos: { x: number, y: number }) {
  viewX.value += pos.x
  viewY.value += pos.y
}

function centerView() {
  viewX.value = mapWidth.value / 2 - grid.pixelWidth / 2
  viewY.value = mapHeight.value / 2 - grid.pixelHeight / 2
}

function onResizeObserver() {
  mapWidth.value = window.innerWidth
  mapHeight.value = window.innerHeight
}

function tileRender(g: GraphicsInst, tile: CustomHex) {
  g.clear()
  if (tile.data.visible) {
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
  debug.value = JSON.stringify(dragPos.value)
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
</script>

<template>
  <div v-resize-observer="onResizeObserver" class="size-full">
    <Application :width="mapWidth" :height="mapHeight - 150" @mousedown="dragStart" @touchstart="dragStart" @mouseup="dragEnd" @touchend="dragEnd" @mousemove="dragging" @touchmove="dragging">
      <Container ref="gridContainer" :position-x="viewX" :position-y="viewY" :width="grid.pixelWidth" :height="grid.pixelHeight">
        <template v-for="(tile) of grid.filter(hex => !hex.data.visible)" :key="tile">
          <Graphics @render="tileRender($event, tile)" />
          <text v-if="showCoordinates" :anchor="0.5" :style="{ fill: 'white' }" :position-x="tile.x" :position-y="tile.y">
            {{ tile.row }}|{{ tile.col }}
          </text>
        </template>
        <template v-for="(tile) of grid.filter(hex => hex.data.visible)" :key="tile">
          <Sprite :texture="tile.data.sprite" :anchor="0.5" :x="tile.x" :y="tile.y" :width="80" :height="90" :z-index="1" />
          <Graphics :z-index="2" @render="tileRender($event, tile)" />
          <text v-if="showCoordinates" :anchor="0.5" :style="{ fill: 'white' }" :position-x="tile.x" :position-y="tile.y">
            {{ tile.row }}|{{ tile.col }}
          </text>
        </template>
      </Container>
    </Application>
    <div class="w-full h-[150px] flex justify-center bg-black border border-white text-white select-none leading-none">
      <div class="px-2 w-2/5 flex flex-col gap-2 text-right overflow-hidden">
        <div>H.A.N.N.A.H. Radar Command Center</div>
        <div class="flex justify-start gap-1 flex-wrap items-center">
          <NuxtLink to="/database" class="border border-white px-2 bg-black">
            DB
          </NuxtLink>
          <NuxtLink to="/logs" class="border border-white px-2 bg-black">
            LOGS
          </NuxtLink>
          <div class="border border-white px-2" @click="centerView">
            R.V.O.
          </div>
          <div class="border border-white px-2 bg-black" :class="{ invert: showCoordinates }" @click="showCoordinates = !showCoordinates">
            T.C.D.
          </div>
        </div>
      </div>
      <div class="text-xl border-l border-r border-white p-2 w-1/5 text-center  overflow-hidden">
        Black Moon HexMap
      </div>
      <div class="px-2 w-2/5  overflow-hidden">
        __Debug Console <br>
        <div class="flex flex-wrap gap-2 mt-2">
          <div>&lt;ViewCoordinates&gt; [{{ Math.trunc(10000 + viewX) }} / {{ Math.trunc(7000 + viewY) }}]</div>
          <div>&lt;HoverTile&gt; {type: ??}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
