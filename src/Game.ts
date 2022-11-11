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

    start(): void {
        requestAnimationFrame(() => this.update());
    }

    update(): void {
        if (window.debugging.showFps) {
            this.fps.tick();
        }

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = config.viewport.width;
        tempCanvas.height = config.viewport.height;

        const image = ImageLoader.instance.fromName('mockup.png', Vector.null(), new Vector(config.viewport.width, config.viewport.height), Vector.null());
        image.draw(tempCtx);

        const tempImageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

        const tempImageDataGrid = new Grid<[number, number, number, number]>(config.viewport.width, config.viewport.height);
        for (let y = 0; y < tempImageDataGrid.height; y++) {
            for (let x = 0; x < tempImageDataGrid.width; x++) {
                const index = (x + y * tempImageDataGrid.width) * 4;
                tempImageDataGrid.set(x, y, [
                    tempImageData.data[index],
                    tempImageData.data[index + 1],
                    tempImageData.data[index + 2],
                    tempImageData.data[index + 3],
                ]);
            }
        }

        const imageDataGrid = new Grid<[number, number, number, number]>(config.viewport.width * this.zoom, config.viewport.height * this.zoom);
        for (let y = 0; y < tempImageDataGrid.height; y++) {
            for (let x = 0; x < tempImageDataGrid.width; x++) {
                for (let i = 0; i < this.zoom; i++) {
                    for (let j = 0; j < this.zoom; j++) {
                        imageDataGrid.set(x * this.zoom + i, y * this.zoom + j, this.pattern.getColor(tempImageDataGrid.get(x, y), i, j));
                    }
                }
            }
        }

        const imageData = window.ctx.createImageData(config.viewport.width * this.zoom, config.viewport.height * this.zoom);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const j = i / 4;
            const x = j % (config.viewport.width * this.zoom);
            const y = Math.floor(j / config.viewport.width / this.zoom);
            const data = imageDataGrid.get(x, y);
            if (data !== null) {
                imageData.data[i] = data[0];
                imageData.data[i + 1] = data[1];
                imageData.data[i + 2] = data[2];
                imageData.data[i + 3] = data[3];
            }
        }

        window.ctx.putImageData(imageData, 0, 0);

        requestAnimationFrame(() => this.update());
    }
}
