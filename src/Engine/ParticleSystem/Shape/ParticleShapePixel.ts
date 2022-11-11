import Color from '../../Canvas/Color';
import ParticleShape from '../ParticleShape';
import Rng from '../../Math/Rng';
import Vector from '../../Math/Vector';
import lerp from '../../Math/lerp';

export default class ParticleShapePixel implements ParticleShape {
    private scale: Vector;

    constructor(
        scaleMin: Vector,
        scaleMax: Vector,
        private readonly alphaStart: number,
        private readonly alphaEnd: number,
        private readonly color: Color,
    ) {
        this.scale = new Vector(
            Rng.instance.randomIntBetween(scaleMin.x, scaleMax.x),
            Rng.instance.randomIntBetween(scaleMin.y, scaleMax.y),
        )
    }

    draw(position: Vector, direction: number, lifetimePercentage: number): void {
        const end = position.add(Vector.fromDirection(direction, this.scale.y).addY(this.scale.y));

        window.ctx.globalAlpha = lerp(this.alphaStart, this.alphaEnd, lifetimePercentage);
        window.ctx.strokeStyle = this.color.toString();
        window.ctx.lineWidth = this.scale.x;
        window.ctx.beginPath();
        window.ctx.moveTo(position.x - .5, position.y);
        window.ctx.lineTo(end.x - .5, end.y);
        window.ctx.stroke();
        window.ctx.globalAlpha = 1;
    }
}
