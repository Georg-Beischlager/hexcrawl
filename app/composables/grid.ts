import type { HexCoordinates, OffsetCoordinates } from 'honeycomb-grid'
import { Grid } from 'honeycomb-grid'

const viewX = ref(50)
const viewY = ref(50)
const showCoordinates = ref(false)
const mapWidth = ref(100)
const mapHeight = ref(100)
const rawScale = ref(100)
const scale = computed(() => rawScale.value / 100)
const menuHeight = ref(150)

const debug = ref('')
const emptyTileUrl = 'https://blackmoon-api.democrify.xyz/api/media/file/empty-1.png'
const hexCoords: Array<HexCoordinates> = createHexIndexes(30)
const hexes = hexCoords.map(
  coordinates => CustomHex.create(coordinates, { visible: false, sprite: emptyTileUrl }),
)
const grid = new Grid(CustomHex, hexes)
const selectedTile = ref<CustomHex | undefined>()
const data: Array<{ coords: OffsetCoordinates } & HexData> = []
init()
async function init() {
  const { mapTiles } = await useData()
  const apiTiles = mapTiles.value?.map((mapTile) => {
    return {
      coords: { row: mapTile.coordinates?.row, col: mapTile.coordinates?.column } as OffsetCoordinates,
      sprite: (mapTile.image as Media).url || '',
      visible: !!mapTile.visible,
      color: mapTile.color || undefined,
      icon: mapTile.icons || undefined,
    }
  })
  if (apiTiles) {
    data.push(...apiTiles)
    updateGrid()
    selectedTile.value = grid.getHex({ row: 14, col: 13 } as OffsetCoordinates)
  }
}

function updateGrid() {
  data.forEach((g) => {
    const h = grid.getHex(convCoords(g.coords))
    if (h) {
      h.data = g
    }
  })
}

function centerView() {
  viewX.value = ((mapWidth.value) / 2 - (grid.pixelWidth) / 2 + 4 * tileSize) * scale.value
  viewY.value = (mapHeight.value / 2 - (grid.pixelHeight) / 2) * scale.value
}

const groupedTiles = computed(() => {
  const data = []
  // invisible
  data.push(grid.filter(h => h.data.visible !== true && h.data.color === undefined))
  // visible
  data.push(grid.filter(h => h.data.visible === true && h.data.color === undefined))
  // white
  data.push(grid.filter(h => h.data.color === 'white'))
  // yellow
  data.push(grid.filter(h => h.data.color === 'yellow'))
  // red
  data.push(grid.filter(h => h.data.color === 'red'))
  // selected tile
  data.push(grid.filter(h => h.row === selectedTile.value?.row && h.col === selectedTile.value?.col))
  return data
})

export function useGridData() {
  return { grid, groupedTiles, emptyTileUrl, debug, selectedTile, mapWidth, mapHeight, menuHeight, rawScale, scale, showCoordinates, viewX, viewY, centerView }
}
