import Pattern from './Pattern';
import isEdge from './Helper/isEdge';

export default class BlackEdges implements Pattern {
    constructor(
        private readonly zoom: number,
    ) {
    }

    getColor(color: [number, number, number, number], x: number, y: number): [number, number, number, number] {
        if (isEdge(x, y, this.zoom)) {
            return [0, 0, 0, 0];
        }

        return color;
    }
}
