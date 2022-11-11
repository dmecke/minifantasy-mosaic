import CanvasSprite from '../Canvas/CanvasSprite';
import Vector from '../Math/Vector';

export default class ImageLoader {

    static readonly instance = new ImageLoader();

    private images: Map<string, HTMLImageElement> = new Map();

    private constructor() {
        // noop
    }

    static loadImages(images: string[]): Promise<void> {
        return new Promise(resolve => {
            let loaded = 0;
            for (const image of images) {
                const img = new Image();
                img.src = `images/${image}`;
                img.onload = () => {
                    loaded++;
                    if (loaded === images.length) {
                        resolve();
                    }
                }
                ImageLoader.instance.images.set(image, img);
            }
        });
    }

    fromName(image: string, offset: Vector, size: Vector, position: Vector): CanvasSprite {
        return new CanvasSprite(ImageLoader.instance.getImage(image), offset, size, position);
    }

    getImage(image: string): HTMLImageElement {
        if (!this.images.has(image)) {
            throw new Error(`Could not find image with name "${image}".`);
        }

        return this.images.get(image);
    }
}
