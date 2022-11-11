import Rng from './Rng';

export default class Range {
    constructor(
        readonly min: number,
        readonly max: number,
    ) {
        if (min > max) {
            throw new Error(`Min value of range must not be bigger than max value: ${min} -> ${max}.`);
        }
    }

    randomFloatBetween(): number {
        return Rng.instance.randomFloatBetween(this.min, this.max);
    }
}
