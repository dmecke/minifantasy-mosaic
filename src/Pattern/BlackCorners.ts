import Pattern from './Pattern';
import isCorner from './Helper/isCorner';

export default class BlackCorners implements Pattern {
    constructor(
        private readonly zoom: number,
    ) {
    }

    getColor(color: [number, number, number, number], x: number, y: number): [number, number, number, number] {
        if (isCorner(x, y, this.zoom)) {
            return [0, 0, 0, 0];
        }

        return color;
    }

}
