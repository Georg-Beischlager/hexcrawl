import type { HexCoordinates, OffsetCoordinates } from 'honeycomb-grid'
import { Grid } from 'honeycomb-grid'

const viewX = ref(50)
const viewY = ref(50)
const showCoordinates = ref(false)
const mapWidth = ref(100)
const mapHeight = ref(100)
const scale = ref(1)

const debug = ref('')

const hexCoords: Array<HexCoordinates> = createHexIndexes(30)
const hexes = hexCoords.map(
  coordinates => CustomHex.create(coordinates, { visible: false, sprite: '/tiles/1/1.png' }),
)
const grid = new Grid(CustomHex, hexes)
const selectedTile = ref<CustomHex | undefined>()
const data: Array<{ coords: OffsetCoordinates } & HexData> = [
  // centre
  { coords: { row: 14, col: 13 } as OffsetCoordinates, sprite: '/tiles/4/8.png', visible: true },
  // spiral 1
  { coords: { row: 13, col: 12 } as OffsetCoordinates, sprite: '/tiles/1/1.png', visible: true },
  { coords: { row: 13, col: 13 } as OffsetCoordinates, sprite: '/tiles/2/2.png', visible: true },
  { coords: { row: 14, col: 12 } as OffsetCoordinates, sprite: '/tiles/2/2.png', visible: true },
  { coords: { row: 14, col: 14 } as OffsetCoordinates, sprite: '/tiles/2/2.png', visible: true },
  { coords: { row: 15, col: 12 } as OffsetCoordinates, sprite: '/tiles/1/1.png', visible: true },
  { coords: { row: 15, col: 13 } as OffsetCoordinates, sprite: '/tiles/1/1.png', visible: true },

  { coords: { row: 12, col: 11 } as OffsetCoordinates, sprite: '/tiles/2/5.png', visible: true },
  { coords: { row: 12, col: 12 } as OffsetCoordinates, sprite: '/tiles/5/3.png', visible: true },
  { coords: { row: 12, col: 13 } as OffsetCoordinates, sprite: '/tiles/2/1.png', visible: true },
  { coords: { row: 13, col: 14 } as OffsetCoordinates, sprite: '/tiles/2/1.png', visible: true },
  { coords: { row: 14, col: 11 } as OffsetCoordinates, sprite: '/tiles/2/5.png', visible: true },
  { coords: { row: 13, col: 11 } as OffsetCoordinates, sprite: '/tiles/2/5.png', visible: true },
  { coords: { row: 14, col: 10 } as OffsetCoordinates, sprite: '/tiles/2/5.png', visible: true },

  { coords: { row: 10, col: 8 } as OffsetCoordinates, sprite: '/tiles/5/4.png', visible: true },
  { coords: { row: 11, col: 7 } as OffsetCoordinates, sprite: '/tiles/5/4.png', visible: true },
  { coords: { row: 11, col: 8 } as OffsetCoordinates, sprite: '/tiles/5/4.png', visible: true },

  { coords: { row: 16, col: 14 } as OffsetCoordinates, sprite: '/tiles/1/4.png', visible: true },
  { coords: { row: 15, col: 14 } as OffsetCoordinates, sprite: '/tiles/1/4_1.png', visible: true },
  { coords: { row: 15, col: 15 } as OffsetCoordinates, sprite: '/tiles/1/4_2.png', visible: true },
  { coords: { row: 16, col: 16 } as OffsetCoordinates, sprite: '/tiles/1/4_3.png', visible: true },
  { coords: { row: 17, col: 15 } as OffsetCoordinates, sprite: '/tiles/1/4_4.png', visible: true },
  { coords: { row: 17, col: 14 } as OffsetCoordinates, sprite: '/tiles/1/4_5.png', visible: true },
  { coords: { row: 16, col: 15 } as OffsetCoordinates, sprite: '/tiles/1/8.png', visible: true },

  { coords: { row: 13, col: 10 } as OffsetCoordinates, sprite: '/tiles/5/10.png', visible: false },
  { coords: { row: 11, col: 13 } as OffsetCoordinates, sprite: '/tiles/5/5.png', visible: false },
  { coords: { row: 14, col: 15 } as OffsetCoordinates, sprite: '/tiles/5/9.png', visible: false },
  { coords: { row: 16, col: 12 } as OffsetCoordinates, sprite: '/tiles/1/1.png', visible: false },
  { coords: { row: 15, col: 11 } as OffsetCoordinates, sprite: '/tiles/5/1.png', visible: false },

]
updateGrid()
init()

async function init() {
  const { mapTiles } = await useData()
  const apiTiles = mapTiles.value?.map((mapTile) => {
    return {
      coords: { row: mapTile.coordinates?.row, col: mapTile.coordinates?.column } as OffsetCoordinates,
      sprite: (mapTile.image as Media).url || '',
      visible: !!mapTile.visible,
    }
  })
  if (apiTiles) {
    data.push(...apiTiles)
    updateGrid()
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

export function useGridData() {
  return { grid, debug, selectedTile, mapWidth, mapHeight, scale, showCoordinates, viewX, viewY, centerView }
}
