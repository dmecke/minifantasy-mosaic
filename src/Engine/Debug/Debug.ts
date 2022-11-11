import LocalStorage from '../Storage/LocalStorage';

export default class Debug {

    private static KEY = 'debug';

    settings: Record<string, unknown> = {};

    constructor() {
        this.settings = LocalStorage.load(Debug.KEY, {}) as Record<string, unknown>;
    }

    get(key: string): unknown {
        return this.settings[key];
    }

    set(key: string, value: unknown): void {
        this.settings[key] = value;
        LocalStorage.save(Debug.KEY, this.settings);
    }
}
