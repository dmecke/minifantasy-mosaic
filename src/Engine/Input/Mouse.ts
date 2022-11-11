import ListenerId from './ListenerId';
import MouseListener from './MouseListener';
import Vector from '../Math/Vector';

export default class Mouse {

    private clickedButtons = new Set<number>();

    private clickedListeners: Map<ListenerId, MouseListener> = new Map();
    private downListeners: Map<ListenerId, MouseListener> = new Map();
    private releasedListeners: Map<ListenerId, MouseListener> = new Map();

    private anyClickedCallbacks: Map<ListenerId, (() => void)> = new Map();
    private anyDownCallbacks: Map<ListenerId, (() => void)> = new Map();
    private anyReleasedCallbacks: Map<ListenerId, (() => void)> = new Map();

    private wheelListeners: Map<ListenerId, ((amount: number) => void)> = new Map();

    private _position = Vector.null();

    constructor() {
        window.addEventListener('mousedown', event => this.onMouseDown(event));
        window.addEventListener('mouseup', event => this.onMouseUp(event));
        window.addEventListener('mousemove', event => this.onMouseMove(event));
        window.addEventListener('wheel', event => this.onMouseWheel(event));
    }

    onClicked(button: number, callback: (position: Vector) => void): ListenerId {
        const listenerId = new ListenerId();
        this.clickedListeners.set(listenerId, new MouseListener(button, callback));

        return listenerId;
    }

    onDown(button: number, callback: (position: Vector) => void): ListenerId {
        const listenerId = new ListenerId();
        this.downListeners.set(listenerId, new MouseListener(button, callback));

        return listenerId;
    }

    onReleased(button: number, callback: (position: Vector) => void): ListenerId {
        const listenerId = new ListenerId();
        this.releasedListeners.set(listenerId, new MouseListener(button, callback));

        return listenerId;
    }

    removeClickedListener(listenerId: ListenerId): void {
        this.clickedListeners.delete(listenerId);
    }

    removeDownListener(listenerId: ListenerId): void {
        this.downListeners.delete(listenerId);
    }

    removeReleasedListener(listenerId: ListenerId): void {
        this.releasedListeners.delete(listenerId);
    }

    onClickedOneOf(buttons: number[], callback: () => void): ListenerId[] {
        const listenerIds: ListenerId[] = [];
        buttons.forEach(button => listenerIds.push(this.onClicked(button, callback)));

        return listenerIds;
    }

    onDownOneOf(buttons: number[], callback: () => void): ListenerId[] {
        const listenerIds: ListenerId[] = [];
        buttons.forEach(button => listenerIds.push(this.onDown(button, callback)));

        return listenerIds;
    }

    onReleasedOneOf(buttons: number[], callback: () => void): ListenerId[] {
        const listenerIds: ListenerId[] = [];
        buttons.forEach(button => listenerIds.push(this.onReleased(button, callback)));

        return listenerIds;
    }

    onClickedAny(callback: () => void): ListenerId {
        const listenerId = new ListenerId();
        this.anyClickedCallbacks.set(listenerId, callback);

        return listenerId;
    }

    onDownAny(callback: () => void): ListenerId {
        const listenerId = new ListenerId();
        this.anyDownCallbacks.set(listenerId, callback);

        return listenerId;
    }

    onReleasedAny(callback: () => void): ListenerId {
        const listenerId = new ListenerId();
        this.anyReleasedCallbacks.set(listenerId, callback);

        return listenerId;
    }

    removeClickedAnyListener(listenerId: ListenerId): void {
        this.anyClickedCallbacks.delete(listenerId);
    }

    removeDownAnyListener(listenerId: ListenerId): void {
        this.anyDownCallbacks.delete(listenerId);
    }

    removeReleasedAnyListener(listenerId: ListenerId): void {
        this.anyReleasedCallbacks.delete(listenerId);
    }

    onWheel(callback: (amount: number) => void): ListenerId {
        const listenerId = new ListenerId();
        this.wheelListeners.set(listenerId, callback);

        return listenerId;
    }

    removeWheelListener(listenerId: ListenerId): void {
        this.wheelListeners.delete(listenerId);
    }

    get position(): Vector {
        return this._position;
    }

    private onMouseDown(event: MouseEvent): void {
        const position = this.calculatePosition(event);
        if (!this.clickedButtons.has(event.button)) {
            this.clickedListeners.forEach(listener => listener.handle(event.button, position));
            this.anyClickedCallbacks.forEach(callback => callback());
        }
        this.downListeners.forEach(listener => listener.handle(event.button, position));
        this.anyDownCallbacks.forEach(callback => callback());
        this.clickedButtons.add(event.button);

        event.preventDefault();
    }

    private onMouseUp(event: MouseEvent): void {
        const position = this.calculatePosition(event);
        this.releasedListeners.forEach(listener => listener.handle(event.button, position));
        this.anyReleasedCallbacks.forEach(callback => callback());
        this.clickedButtons.delete(event.button);

        event.preventDefault();
    }

    private onMouseMove(event: MouseEvent): void {
        this._position = this.calculatePosition(event);
    }

    private onMouseWheel(event: WheelEvent): void {
        this.wheelListeners.forEach(callback => callback(event.deltaY));

        event.preventDefault();
    }

    private calculatePosition(event: MouseEvent): Vector {
        if (window.canvas.clientWidth === 0) {
            return Vector.null();
        }

        return new Vector(
            event.clientX - window.canvas.getBoundingClientRect().left,
            event.clientY - window.canvas.getBoundingClientRect().top,
        ).divide(window.canvas.clientWidth / window.canvas.width).floor();
    }
}
