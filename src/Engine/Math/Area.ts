import Color from '../Canvas/Color';
import Rng from './Rng';
import Vector from './Vector';

export default class Area {

    constructor(
        readonly position: Vector,
        readonly size: Vector,
    ) {
    }

    static around(position: Vector, range: number): Area {
        return new Area(position.subtract(new Vector(range, range)), new Vector(range, range).multiply(2));
    }

    add(position: Vector): Area {
        return new Area(
            this.position.add(position),
            this.size,
        );
    }

    subtract(position: Vector): Area {
        return new Area(
            this.position.subtract(position),
            this.size,
        );
    }

    floor(): Area {
        return new Area(
            this.position.floor(),
            this.size,
        );
    }

    contains(position: Vector): boolean {
        if (position.x < this.left) {
            return false;
        }

        if (position.y < this.top) {
            return false;
        }

        if (position.x >= this.right) {
            return false;
        }

        if (position.y >= this.bottom) {
            return false;
        }

        return true;
    }

    containsOneOf(positions: Vector[]): boolean {
        for (const position of positions) {
            if (this.contains(position)) {
                return true;
            }
        }

        return false;
    }

    get left(): number {
        return this.position.x;
    }

    get right(): number {
        return this.position.x + this.size.x;
    }

    get top(): number {
        return this.position.y;
    }

    get bottom(): number {
        return this.position.y + this.size.y;
    }

    get center(): Vector {
        return this.position.add(this.size.divide(2));
    }

    overlaps(other: Area): boolean {
        if (this.left > other.right) {
            return false;
        }

        if (other.left > this.right) {
            return false;
        }

        if (this.top > other.bottom) {
            return false;
        }

        if (other.top > this.bottom) {
            return false;
        }

        return true;
    }

    toString(): string {
        return `${this.position.toString()} - ${this.position.add(this.size.subtract(new Vector(1, 1))).toString()}`;
    }

    overlaps_bbox(_object: { bbox_left: number, bbox_right: number, bbox_top: number, bbox_bottom: number }) {
        if (this.position.x >= _object.bbox_right - 1) {
            return false;
        }

        if (_object.bbox_left >= this.position.x + this.size.x - 1) {
            return false;
        }

        if (this.position.y + this.size.y - 1 <= _object.bbox_top) {
            return false;
        }

        if (_object.bbox_bottom - 1 <= this.position.y) {
            return false;
        }

        return true;
    }

    get_random_point(): Vector {
        return new Vector(
            Rng.instance.randomIntBetween(this.position.x, this.position.x + this.size.x - 1),
            Rng.instance.randomIntBetween(this.position.y, this.position.y + this.size.y - 1),
        );
    }

    draw(outline: boolean, color: Color, alpha = 1) {
        if (outline) {
            window.ctx.lineWidth = 1;
            window.ctx.strokeStyle = color.toString();
            window.ctx.globalAlpha = alpha;
            window.ctx.strokeRect(this.position.x + .5, this.position.y + .5, this.size.x, this.size.y); // https://usefulangle.com/post/17/html5-canvas-drawing-1px-crisp-straight-lines
        } else {
            window.ctx.fillStyle = color.toString();
            window.ctx.globalAlpha = alpha;
            window.ctx.fillRect(this.position.x - .5, this.position.y - .5, this.size.x, this.size.y);
        }
        window.ctx.globalAlpha = 1;
    }
}
