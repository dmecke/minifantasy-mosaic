import State from './State';

export default class StateMachine<T> {
    private _previous: string;
    private _state: State<T>;

    constructor(
        private readonly entity: T,
        private readonly states = new Map<string, State<T>>(),
        startingStateName: string,
        private debug = false,
    ) {
        this._state = this.states.get(startingStateName);
        this._previous = startingStateName;
        if (this._state.enter) {
            this._state.enter(this.entity);
        }
        this.log(`starting in state "${startingStateName}"`);
    }

    update(): void {
        if (this._state.update) {
            this._state.update(this.entity);
        }
    }

    render(): void {
        if (this._state.render) {
            this._state.render(this.entity);
        }
    }

    changeTo(name: string): void {
        if (!this.states.has(name)) {
            throw new Error(`Invalid state "${name}".`);
        }

        if (this._state?.name === name) {
            return;
        }

        if (this._state.exit) {
            this._state.exit(this.entity);
        }

        this.log(`changing state from "${this._state.name}" to "${name}"`);
        this._previous = this._state.name;
        this._state = this.states.get(name);

        if (this._state.enter) {
            this._state.enter(this.entity);
        }
    }

    changeToPrevious(): void {
        this.changeTo(this._previous);
    }

    get state(): State<T> {
        return this._state;
    }

    private log(message: string): void {
        if (!this.debug) {
            return;
        }

        console.log(message);
    }
}
