export class ParseHelper {
    public static parseCoords(strCoords: string):number[] {
        const inverseCoords =  strCoords.split(',').map(a => +a)
        return [inverseCoords[1], inverseCoords[0]]
    }
}