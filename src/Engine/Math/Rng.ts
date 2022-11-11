// eslint-disable-next-line @typescript-eslint/no-var-requires
const seedrandom = require('seedrandom');

export default class Rng {
    private static _instance = new Rng();

    private readonly rng: CallableFunction;

    static get instance(): Rng {
        return this._instance;
    }

    private constructor() {
        this.rng = seedrandom(Math.random().toString());
    }

    random(max: number): number {
        return Math.floor(this.rng() * max);
    }

    randomIntBetween(min: number, max: number): number {
        return Math.floor(this.rng() * (max - min)) + min;
    }

    randomFloatBetween(min: number, max: number): number {
        return this.rng() * (max - min) + min;
    }

    chance(amount: number): boolean {
        return amount > this.random(100);
    }

    choose<T>(array: T[]): T {
        return array[this.random(array.length)];
    }
}
