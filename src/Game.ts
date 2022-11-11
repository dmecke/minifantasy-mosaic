import Fps from './Engine/Debug/Fps';

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

        requestAnimationFrame(() => this.update());
    }

    get timer(): number {
        return this._timer;
    }
}
