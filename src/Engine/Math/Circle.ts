import Color from '../Canvas/Color';
import Rng from './Rng';
import Vector from './Vector';

export default class Circle {
    constructor(
        readonly position: Vector,
        readonly radius: number,
    ) {
    }

    get diameter(): number {
        return this.radius * 2;
    }

    contains(position: Vector): boolean {
        return this.position.distanceTo(position) <= this.radius;
    }

    randomPoint(): Vector {
        const r = this.radius * Math.sqrt(Rng.instance.randomFloatBetween(0, 1));
        const theta = Rng.instance.randomFloatBetween(0, 1) * 2 * Math.PI;

        return this.position.addX(r * Math.cos(theta)).addY(r * Math.sin(theta));
    }

    draw(color: Color, ctx: CanvasRenderingContext2D = window.ctx): void {
        ctx.lineWidth = 1;
        ctx.strokeStyle = color.toString();
        ctx.beginPath();
        ctx.arc(this.position.x + .5, this.position.y + .5, this.radius, 0, 2 * Math.PI); // https://usefulangle.com/post/17/html5-canvas-drawing-1px-crisp-straight-lines
        ctx.stroke();
    }
}
