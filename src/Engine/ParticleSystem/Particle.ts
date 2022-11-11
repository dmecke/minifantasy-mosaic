import ParticleType from './ParticleType';
import Vector from '../Math/Vector';

export default class Particle {
    private age = 0;
    private speed: number;
    private readonly direction: number;
    private readonly lifetime: number;

    constructor(
        private _position: Vector,
        private readonly particleType: ParticleType,
    ) {
        this.speed = particleType.speed.randomFloatBetween();
        this.direction = particleType.direction.randomFloatBetween();
        this.lifetime = particleType.lifetime.randomFloatBetween();
    }

    update(): void {
        this.age++;
        this._position = this._position.add(Vector.fromDirection(this.direction, this.speed));
        this.speed = Math.max(0, this.speed + this.particleType.speedChange);
    }

    draw(): void {
        this.particleType.shape.draw(this._position, this.direction, this.age / this.lifetime);
    }

    get position(): Vector {
        return this._position;
    }

    get alive(): boolean {
        return this.age < this.lifetime;
    }

    get deathParticle(): ParticleType|null {
        return this.particleType.deathParticleType;
    }
}
