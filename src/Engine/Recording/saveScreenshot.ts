import config from '../../assets/config.json';

export default function (scale: number, name: string): void {
    const screenshotCanvas = document.createElement('canvas');
    screenshotCanvas.width = window.canvas.width * scale;
    screenshotCanvas.height = window.canvas.height * scale;
    const screenshotCtx = screenshotCanvas.getContext('2d');
    if (!screenshotCtx) {
        throw new Error('Cannot get screenshot context');
    }
    screenshotCtx.imageSmoothingEnabled = false;
    screenshotCtx.drawImage(window.canvas, 0, 0, config.viewport.width, config.viewport.height, 0, 0, config.viewport.width * scale, config.viewport.height * scale);
    const link = document.createElement('a');
    link.download = `${name}.png`;
    link.href = screenshotCanvas.toDataURL('image/png');
    link.click();
}
