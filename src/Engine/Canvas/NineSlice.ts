import ImageLoader from '../Assets/ImageLoader';
import Vector from '../Math/Vector';

export default class NineSlice {
    constructor(
        readonly sprite: string,
        readonly left: number,
        readonly right: number,
        readonly top: number,
        readonly bottom: number,
    ) {
    }

    draw(position: Vector, size: Vector, ctx: CanvasRenderingContext2D = window.ctx): void {
        const image = ImageLoader.instance.getImage(this.sprite);

        ctx.drawImage(image, 0, 0, this.left, this.top, position.x, position.y, this.left, this.top); // top left
        ctx.drawImage(image, image.width - this.right, 0, this.right, this.top, position.x + size.x - this.right, position.y, this.right, this.top); // top right
        ctx.drawImage(image, 0, image.height - this.bottom, this.left, this.bottom, position.x, position.y + size.y - this.bottom, this.left, this.bottom); // bottom left
        ctx.drawImage(image, image.width - this.right, image.height - this.bottom, this.right, this.bottom, position.x + size.x - this.right, position.y + size.y - this.bottom, this.right, this.bottom); // bottom right

        ctx.drawImage(image, this.left, 0, image.width - this.left - this.right, this.top, position.x + this.left, position.y, size.x - this.left - this.right, this.top); // top
        ctx.drawImage(image, this.left, image.height - this.bottom, image.width - this.left - this.right, this.bottom, position.x + this.left, position.y + size.y - this.bottom, size.x - this.left - this.right, this.bottom); // bottom
        ctx.drawImage(image, 0, this.top, this.left, image.height - this.top - this.bottom, position.x, position.y + this.top, this.left, size.y - this.top - this.bottom); // left
        ctx.drawImage(image, image.width - this.right, this.top, this.right, image.height - this.top - this.bottom, position.x + size.x - this.right, position.y + this.top, this.right, size.y - this.top - this.bottom); // right

        ctx.drawImage(image, this.left, this.top, image.width - this.left - this.right, image.height - this.top - this.bottom, position.x + this.left, position.y + this.top, size.x - this.left - this.right, size.y - this.top - this.bottom); // middle
    }
}
