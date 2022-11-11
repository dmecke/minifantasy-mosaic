import Particle from './Particle';
import ParticleType from './ParticleType';
import Vector from '../Math/Vector';

export default class ParticleSystem {

    private particles: Particle[] = [];

    spawn(particleType: ParticleType, position: Vector, amount: number): void {
        for (let i = 0; i < amount; i++) {
            this.particles.push(new Particle(position, particleType));
        }
    }

    update(): void {
        this.particles.forEach(particle => particle.update());
        this
            .particles
            .filter(particle => !particle.alive)
            .filter(particle => particle.deathParticle !== null)
            .forEach(particle => this.particles.push(new Particle(particle.position, particle.deathParticle)))
        ;
        this.particles = this.particles.filter(particle => particle.alive);
    }

    draw(): void {
        this.particles.forEach(particle => particle.draw());
    }
}
