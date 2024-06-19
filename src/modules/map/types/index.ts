export interface BusRoutes {
    busNumber: string
    directions: {
        asc: Station [],
        desc: Station []
    }
}

export interface Station {
    code: number
    coords: number[]
    descRu: string
    descKz: string
    direction: number
}
