import Debug from '../Engine/Debug/Debug';
import saveScreenshot from '../Engine/Recording/saveScreenshot';

export default class Debugging {

    private readonly debug = new Debug();

    help(): void {
        console.log('Available methods:');
        Object.keys(Debugging.prototype).forEach(method => console.log(method));
    }

    toggleFps(): boolean {
        this.debug.set('showFps', !this.debug.get('showFps'));

        return this.showFps;
    }

    saveScreenshot(): void {
        saveScreenshot(4, 'screenshot');
    }

    get showFps(): boolean {
        return this.debug.get('showFps') as boolean;
    }
}
