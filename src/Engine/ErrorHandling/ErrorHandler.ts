export default interface ErrorHandler {
    handle(error: ErrorEvent, metaData: Map<string, unknown>): void;
}
