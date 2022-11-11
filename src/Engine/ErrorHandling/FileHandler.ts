export default class FileHandler {
    handle(error: ErrorEvent, metaData: Map<string, unknown>): void {
        const text = [];
        text.push(error.error.stack);
        text.push('');

        text.push(`File: ${error.filename}`);
        text.push(`Line: ${error.lineno}`);
        text.push(`Column: ${error.colno}`);
        text.push('');

        metaData.forEach((value, key) => {
            text.push(`${key}: ${value}`);
        });
        text.push('');

        const link = document.createElement('a');
        link.download = 'crash_report.txt';
        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text.join('\n'))}`;
        link.click();
    }
}
