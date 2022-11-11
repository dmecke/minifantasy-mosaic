import ErrorHandler from './ErrorHandler';

export default class GroupHandler implements ErrorHandler{
    constructor(
        private readonly handlers: ErrorHandler[],
    ) {
    }

    handle(error: ErrorEvent, metaData: Map<string, unknown>): void {
        for (const handler of this.handlers) {
            handler.handle(error, metaData);
        }
    }
}
