import Vector from '../Math/Vector';

export default interface ParticleShape {
    draw(position: Vector, direction: number, lifetimePercentage: number): void;
}
