import Fps from './Engine/Debug/Fps';
import ImageLoader from './Engine/Assets/ImageLoader';
import Vector from './Engine/Math/Vector';
import config from './assets/config.json';

export default class Game {
    readonly fps = new Fps();
    private _timer = 0;

    start(): void {
        requestAnimationFrame(() => this.update());
    }

    update(): void {
        if (window.debugging.showFps) {
            this.fps.tick();
        }

        this._timer++;

        ImageLoader.instance.fromName('mockup.png', Vector.null(), new Vector(config.viewport.width, config.viewport.height), Vector.null()).draw();

        requestAnimationFrame(() => this.update());
    }

    get timer(): number {
        return this._timer;
    }
}
