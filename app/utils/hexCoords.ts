import { defineHex, offsetToCube, Orientation, type HexCoordinates, type HexSettings, type OffsetCoordinates } from "honeycomb-grid"

export const defaultHexSettings: HexSettings = {
    dimensions: { xRadius: 50, yRadius: 50 }, // these make for tiny hexes
    orientation: Orientation.POINTY, // pointy top
    origin: { x: 0, y: 0 }, // the center of the hex
    offset: -1, // how rows or columns of hexes are placed relative to each other
  }

export function createHexIndexes(size: number) {
    const xVals = Array.from(Array(size).keys())
    const yVals = Array.from(Array(size).keys())

    const output = []
    let xOffset = 1
    for(let y of yVals) {
        if(y%2 === 0) {
            xOffset -= 1
        }
        for(let x of xVals) {
            output.push([x+xOffset,y] as HexCoordinates)
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
}
