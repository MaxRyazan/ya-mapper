export class MapHelper {
    public static createMapFromObjectArray<T extends object>(map: Map<any, any>, source: T[], key: keyof T, value: keyof T) {
        for(let i = 0; i < source.length; i++) {
            map.set(source[i][key], source[i][value])
        }
    }
}