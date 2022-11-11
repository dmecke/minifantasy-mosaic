import Pattern from './Pattern';

export default class Mosaic implements Pattern {
    constructor(
        private readonly zoom: number,
    ) {
    }

    getColor(color: [number, number, number, number], x: number, y: number): [number, number, number, number] {
        if (this.isTopLeft(x, y)) {
            return this.topLeft(color);
        }

        if (this.isBottomEdge(x, y)) {
            return this.bottomEdge(color);
        }

        if (this.isRightEdge(x, y)) {
            return this.rightEdge(color);
        }

        return color;
    }

    private isTopLeft(x: number, y: number): boolean {
        if (x === 0 && y < this.zoom - 1) {
            return true;
        }

        if (y === 0 && x < this.zoom - 1) {
            return true;
        }

        return false;
    }

    private isBottomEdge(x: number, y: number): boolean {
        return x > 0 && x < this.zoom - 1 && y === this.zoom - 1;
    }

    private isRightEdge(x: number, y: number): boolean {
        return x === this.zoom - 1 && y > 0;
    }

    private topLeft(color: [number, number, number, number]): [number, number, number, number] {
        const factor = 0.2; // higher -> lighter

        return [
            (255 - color[0]) * factor + color[0],
            (255 - color[1]) * factor + color[1],
            (255 - color[2]) * factor + color[2],
            color[3],
        ];
    }

    private bottomEdge(color: [number, number, number, number]): [number, number, number, number] {
        const factor = 0.7; // smaller -> darker

        return [
            color[0] * factor,
            color[1] * factor,
            color[2] * factor,
            color[3],
        ];
    }

    private rightEdge(color: [number, number, number, number]): [number, number, number, number] {
        const factor = 0.8; // smaller -> darker

        return [
            color[0] * factor,
            color[1] * factor,
            color[2] * factor,
            color[3],
        ];
    }
}
