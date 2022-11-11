import Canvas from './Engine/Canvas/Canvas';
import ConsoleHandler from './Engine/ErrorHandling/ConsoleHandler';
import Debugging from './Debug/Debugging';
import Game from './Game';
import GroupHandler from './Engine/ErrorHandling/GroupHandler';
import ImageLoader from './Engine/Assets/ImageLoader';
import Vector from './Engine/Math/Vector';
import images from './assets/images.json';

new Canvas('canvas', new Vector(640, 360), 2);

window.debugging = new Debugging();

window.canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = window.canvas.getContext('2d');
if (ctx === null) {
    throw new Error('Could not create context 2d.');
}
window.ctx = ctx;

window.addEventListener('error', e => {
    const metaData: Map<string, unknown> = new Map();
    const handler = new GroupHandler([
        new ConsoleHandler(),
    ]);
    handler.handle(e, metaData);
});

window.addEventListener('load', () => {
    Promise.all([
        ImageLoader.loadImages(images),
    ]).then(() => {
        window.game = new Game();
        window.game.start();
    });
});
