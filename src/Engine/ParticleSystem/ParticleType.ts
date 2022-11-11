import ParticleShape from './ParticleShape';
import Range from '../Math/Range';

export default class ParticleType {
    speed = new Range(0, 0);
    speedChange = 0;
    direction = new Range(0, 0);
    deathParticleType: ParticleType|null = null;

    constructor(
        readonly shape: ParticleShape,
        readonly lifetime: Range,
    ) {
    }
}
