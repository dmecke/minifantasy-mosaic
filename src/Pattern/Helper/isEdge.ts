export default function (x: number, y: number, zoom: number): boolean {
    return x === 0 || y === 0 || x === zoom - 1 || y === zoom - 1;
}
