import Debugging from './src/Debug/Debugging';
import Game from './src/Game';

declare global {
    interface Window {
        debugging: Debugging;
        canvas: HTMLCanvasElement;
        game: Game;
        ctx: CanvasRenderingContext2D;
    }

    interface Gamepad {
        readonly vibrationActuator: GamepadHapticActuator;
    }

    interface GamepadHapticActuator {
        playEffect(type: string, params: {
            duration: number,
            startDelay: number,
            strongMagnitude: number,
            weakMagnitude: number,
        }): void;
    }
}
