export default class LocalStorage {

    static load(key: string, defaultValue: unknown): unknown {
        const value = window.localStorage.getItem(key);

        return value ? JSON.parse(value) : defaultValue;
    }

    static save(key: string, value: unknown): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}
