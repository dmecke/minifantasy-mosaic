export default class PressedState {
    private _once = false;
    private _permanent = false;
    private activated = false;

    get once(): boolean {
        return this._once;
    }

    get permanent(): boolean {
        return this._permanent;
    }

    activate(): void {
        this._once = true;
        this._permanent = true;
    }

    reset(): void {
        this._once = false;
        this._permanent = false;
        this.activated = false;
    }

    update(): void {
        if (this.activated) {
            this._once = false;
            this.activated = false;
        }
        if (this._once) {
            this.activated = true;
        }
    }

    merge(other: PressedState): PressedState {
        const state = new PressedState();
        state._once = this._once || other._once;
        state._permanent = this._permanent || other._permanent;
        state.activated = this.activated || other.activated;

        return state;
    }
}
