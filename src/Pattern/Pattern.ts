export default interface Pattern {
    getColor(color: [number, number, number, number], x: number, y: number): [number, number, number, number];
}

