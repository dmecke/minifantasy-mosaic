import CanvasSprite from './Engine/Canvas/CanvasSprite';
import Fps from './Engine/Debug/Fps';
import Grid from './Engine/Type/Grid';
import ImageLoader from './Engine/Assets/ImageLoader';
import Mosaic from './Pattern/Mosaic';
import Pattern from './Pattern/Pattern';
import Vector from './Engine/Math/Vector';
import config from './assets/config.json';

export default class Game {
    readonly fps = new Fps();
    private zoom = 4;
    private pattern: Pattern = new Mosaic(this.zoom);
    private position = new Vector(0, 0);
    private movement = new Vector(1, 1);
    private image: CanvasSprite;
    private tempImageDataGrid: Grid<[number, number, number, number]>;
    private imageData: ImageData;

    start(): void {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = config.viewport.width;
        tempCanvas.height = config.viewport.height;

        this.image = ImageLoader.instance.fromName('mockup.png', Vector.null(), new Vector(496, 264), Vector.null());
        this.image.draw(tempCtx);

        const tempImageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

        this.tempImageDataGrid = new Grid<[number, number, number, number]>(config.viewport.width, config.viewport.height);
        for (let y = 0; y < this.tempImageDataGrid.height; y++) {
            for (let x = 0; x < this.tempImageDataGrid.width; x++) {
                const index = (x + y * this.tempImageDataGrid.width) * 4;
                this.tempImageDataGrid.set(x, y, [
                    tempImageData.data[index],
                    tempImageData.data[index + 1],
                    tempImageData.data[index + 2],
                    tempImageData.data[index + 3],
                ]);
            }
        }




        const imageDataGrid = new Grid<[number, number, number, number]>(config.viewport.width * this.zoom, config.viewport.height * this.zoom);
        for (let y = 0; y < this.tempImageDataGrid.height; y++) {
            for (let x = 0; x < this.tempImageDataGrid.width; x++) {
                for (let i = 0; i < this.zoom; i++) {
                    for (let j = 0; j < this.zoom; j++) {
                        imageDataGrid.set(x * this.zoom + i, y * this.zoom + j, this.pattern.getColor(this.tempImageDataGrid.get(x, y), i, j));
                    }
                }
            }
        }

        this.imageData = window.ctx.createImageData(config.viewport.width * this.zoom, config.viewport.height * this.zoom);
        for (let i = 0; i < this.imageData.data.length; i += 4) {
            const j = i / 4;
            const x = j % (config.viewport.width * this.zoom);
            const y = Math.floor(j / config.viewport.width / this.zoom);
            const data = imageDataGrid.get(x, y);
            if (data !== null) {
                this.imageData.data[i] = data[0];
                this.imageData.data[i + 1] = data[1];
                this.imageData.data[i + 2] = data[2];
                this.imageData.data[i + 3] = data[3];
            }
        }

        requestAnimationFrame(() => this.update());
    }

    update(): void {
        if (window.debugging.showFps) {
            this.fps.tick();
        }

        window.ctx.clearRect(0, 0, config.viewport.width, config.viewport.height);

        window.ctx.putImageData(this.imageData, -this.position.x, -this.position.y);

        this.position = this.position.add(this.movement);
        if (this.position.x >= this.image.image.width || this.position.x <= 0) {
            this.movement = this.movement.multiplyX(-1);
        }
        if (this.position.y >= this.image.image.height || this.position.y <= 0) {
            this.movement = this.movement.multiplyY(-1);
        }

        requestAnimationFrame(() => this.update());
    }
}
