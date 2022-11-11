import Area from './Area';
import Circle from './Circle';
import lerp from './lerp';
import radToDeg from './radToDeg';

export default class Vector {

    public constructor(
        private readonly _x: number,
        private readonly _y: number,
    ) {
        if (_x === undefined || _x === null || _y === undefined || _y === null) {
            throw new Error(`Cannot create Vector(${_x}|${_y}.`);
        }
    }

    static null(): Vector {
        return new Vector(0, 0);
    }

    static fromDirection(direction: number, length: number): Vector {
        return new Vector(
            length * Math.cos(direction * Math.PI / -180),
            length * Math.sin(direction * Math.PI / -180),
        );
    }

    copy(): Vector {
        return new Vector(this.x, this.y);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    public toString(): string {
        return this._x + '|' + this._y;
    }

    public equals(other: Vector): boolean {
        return this._x === other._x && this._y === other._y;
    }

    public isNull(): boolean {
        return this.equals(new Vector(0, 0));
    }

    public add(other: Vector): Vector {
        return new Vector(this._x + other._x, this._y + other._y);
    }

    public addX(x: number): Vector {
        return new Vector(this._x + x, this._y);
    }

    public addY(y: number): Vector {
        return new Vector(this._x, this._y + y);
    }

    public subtract(other: Vector): Vector {
        return new Vector(this._x - other._x, this._y - other._y);
    }

    public subtractX(x: number): Vector {
        return new Vector(this._x - x, this._y);
    }

    public subtractY(y: number): Vector {
        return new Vector(this._x, this._y - y);
    }

    public multiply(multiplier: number): Vector {
        return new Vector(this._x * multiplier, this._y * multiplier);
    }

    public multiplyX(multiplier: number): Vector {
        return new Vector(this._x * multiplier, this._y);
    }

    public multiplyY(multiplier: number): Vector {
        return new Vector(this._x, this._y * multiplier);
    }

    public divide(divisor: number): Vector {
        if (divisor === 0) {
            throw new Error('Cannot divide by zero.');
        }

        return new Vector(this._x / divisor, this._y / divisor);
    }

    get length(): number {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

    public normalize(): Vector {
        if (this.length === 0) {
            return Vector.null();
        }

        return this.divide(this.length);
    }

    public perpendicular(): Vector {
        return new Vector(this._y, this._x);
    }

    public distanceTo(other: Vector): number {
        return Math.sqrt(this.distanceSquaredTo(other));
    }

    public distanceSquaredTo(other: Vector): number {
        return Math.pow(this._x - other._x, 2) + Math.pow(this._y - other._y, 2);
    }

    public round(): Vector {
        return new Vector(Math.round(this._x), Math.round(this._y));
    }

    public floor(): Vector {
        return new Vector(Math.floor(this._x), Math.floor(this._y));
    }

    public ceil(): Vector {
        return new Vector(Math.ceil(this._x), Math.ceil(this._y));
    }

    get_square_around(_size: number): Area {
        return new Area(
            new Vector(this.x - _size / 2, this.y - _size / 2),
            new Vector(_size, _size),
        );
    }

    circleAround(radius: number): Circle {
        return new Circle(this, radius);
    }

    directionTo(other: Vector): number {
        return -radToDeg(Math.atan2(this.y - other.y, this.x - other.x)) + 180;
    }

    lerpTo(other: Vector, amount: number): Vector {
        return new Vector(
            lerp(this.x, other.x, amount),
            lerp(this.y, other.y, amount),
        );
    }
}
