import Pattern from './Pattern';
import isEdge from './Helper/isEdge';

export default class SemiTransparentEdges implements Pattern {
    constructor(
        private readonly zoom: number,
    ) {
    }

    getColor(color: [number, number, number, number], x: number, y: number): [number, number, number, number] {
        if (isEdge(x, y, this.zoom)) {
            return [color[0], color[1], color[2], color[3] * 0.5];
        }

        return color;
    }
}
