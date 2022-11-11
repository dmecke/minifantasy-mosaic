export default class ConsoleHandler {
    handle(error: ErrorEvent, metaData: Map<string, unknown>): void {
        this.log(error.error.message, 32);

        metaData.forEach((value, key) => {
            this.log(`${key}: ${value}`);
        });

        this.log(`File: ${error.filename}`);
        this.log(`Line: ${error.lineno}`);
        this.log(`Column: ${error.colno}`);
    }

    private log(message: string, fontSize = 20): void {
        console.log(`%c${message}`, `font-family: monospace; font-size: ${fontSize}px`);
    }
}
