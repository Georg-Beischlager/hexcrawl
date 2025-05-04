import { Grid, spiral, type HexCoordinates, type OffsetCoordinates } from "honeycomb-grid"

export const useGridData = () => {
    const hexCoords: Array<HexCoordinates> = createHexIndexes(20)
    const hexes = hexCoords.map(
    (coordinates) => CustomHex.create(coordinates,{ visible: false, sprite: '/tiles/1/1.png'})
    )
    const grid = new Grid(CustomHex, hexes)

    const centreTile: HexCoordinates = [5,9]
    const centreSpiral = spiral<CustomHex>({start: centreTile, radius: 1})
    grid.traverse(centreSpiral).forEach(h => h.data.visible = true)

    const data: Array<{coords: OffsetCoordinates} & HexData> = [
        //centre
        { coords: {row:9, col: 9} as OffsetCoordinates, sprite: '/tiles/4/8.png', visible: true},
        // spiral 1 
        { coords: {row:8, col: 9} as OffsetCoordinates, sprite: '/tiles/1/1.png', visible: true},
        { coords: {row:8, col: 10} as OffsetCoordinates, sprite: '/tiles/2/2.png', visible: true},
        { coords: {row:9, col: 8} as OffsetCoordinates, sprite: '/tiles/2/2.png', visible: true},
        { coords: {row:9, col: 10} as OffsetCoordinates, sprite: '/tiles/2/2.png', visible: true},
        { coords: {row:10, col: 9} as OffsetCoordinates, sprite: '/tiles/1/1.png', visible: true},
        { coords: {row:10, col: 10} as OffsetCoordinates, sprite: '/tiles/1/1.png', visible: true},
        //spiral 2
        { coords: {row:7, col: 8} as OffsetCoordinates, sprite: '/tiles/2/5.png', visible: true},
        { coords: {row:7, col: 9} as OffsetCoordinates, sprite: '/tiles/5/3.png', visible: true},
        { coords: {row:7, col: 10} as OffsetCoordinates, sprite: '/tiles/2/1.png', visible: true},
        { coords: {row:8, col: 11} as OffsetCoordinates, sprite: '/tiles/2/1.png', visible: true},
        { coords: {row:9, col: 11} as OffsetCoordinates, sprite: '/tiles/5/9.png', visible: true},
        { coords: {row:10, col: 11} as OffsetCoordinates, sprite: '/tiles/1/4_1.png', visible: true},
        { coords: {row:11, col: 10} as OffsetCoordinates, sprite: '/tiles/1/4.png', visible: true},
        { coords: {row:11, col: 9} as OffsetCoordinates, sprite: '/tiles/1/1.png', visible: true},
        { coords: {row:11, col: 8} as OffsetCoordinates, sprite: '/tiles/5/1.png', visible: true},
        { coords: {row:10, col: 8} as OffsetCoordinates, sprite: '/tiles/1/1.png', visible: true},
        { coords: {row:9, col: 7} as OffsetCoordinates, sprite: '/tiles/2/5.png', visible: true},
        { coords: {row:8, col: 8} as OffsetCoordinates, sprite: '/tiles/2/5.png', visible: true},
        // rest
        { coords: {row:5, col: 3} as OffsetCoordinates, sprite: '/tiles/5/4.png', visible: true},
        { coords: {row:6, col: 3} as OffsetCoordinates, sprite: '/tiles/5/4.png', visible: true},
        { coords: {row:6, col: 4} as OffsetCoordinates, sprite: '/tiles/5/4.png', visible: true},
    
        { coords: {row:6, col: 9} as OffsetCoordinates, sprite: '/tiles/5/5.png', visible: true},
        { coords: {row:8, col: 7} as OffsetCoordinates, sprite: '/tiles/5/10.png', visible: true},
        { coords: {row:10, col: 12} as OffsetCoordinates, sprite: '/tiles/1/4_2.png', visible: true},
        { coords: {row:11, col: 12} as OffsetCoordinates, sprite: '/tiles/1/4_3.png', visible: true},
        { coords: {row:12, col: 12} as OffsetCoordinates, sprite: '/tiles/1/4_4.png', visible: true},
        { coords: {row:12, col: 11} as OffsetCoordinates, sprite: '/tiles/1/4_5.png', visible: true},
        { coords: {row:11, col: 11} as OffsetCoordinates, sprite: '/tiles/1/8.png', visible: true},


    ]
    data.forEach((g) => {
        const h = grid.getHex(convCoords(g.coords))
        if(h) {
            h.data = g
        }
    })

    return {grid}
}