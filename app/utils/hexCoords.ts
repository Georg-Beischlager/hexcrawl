import type { HexCoordinates, HexSettings, OffsetCoordinates } from 'honeycomb-grid'
import { defineHex, offsetToCube, Orientation } from 'honeycomb-grid'

export const tileSize = 50

export const defaultHexSettings: HexSettings = {
  dimensions: { xRadius: tileSize, yRadius: tileSize }, // these make for tiny hexes
  orientation: Orientation.POINTY, // pointy top
  origin: { x: 0, y: 0 }, // the center of the hex
  offset: -1, // how rows or columns of hexes are placed relative to each other
}

export function createHexIndexes(size: number) {
  const xVals = Array.from(Array.from({ length: size }).keys())
  const yVals = Array.from(Array.from({ length: size }).keys())

  const output = []
  let xOffset = 1
  for (const y of yVals) {
    if (y % 2 === 0) {
      xOffset -= 1
    }
    for (const x of xVals) {
      output.push([x + xOffset, y] as HexCoordinates)
    }
  }
  return output
}

export function convCoords(c: OffsetCoordinates) {
  return offsetToCube(defaultHexSettings, c)
}

export class CustomHex extends defineHex(defaultHexSettings) {
  static create(coordinates: HexCoordinates, data: HexData) {
    const hex = new CustomHex(coordinates)
    hex.data = data
    return hex
  }

  data!: HexData
}
export interface HexData {
  visible: boolean
  sprite: string
  icon?: string
  color?: string
}
