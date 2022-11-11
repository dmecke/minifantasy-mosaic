export default class Video {
    private static MIME_TYPE = 'video/webm;codecs=h264';
    private sessions: { recorder: MediaRecorder, chunks: Blob[] }[] = [];

    constructor(
        readonly duration: number,
    ) {
        this.tick();
    }

    save(name: string): void {
        if (!MediaRecorder.isTypeSupported(Video.MIME_TYPE)) {
            return;
        }

        const session = this.sessions.shift();
        session.recorder.requestData();
        setTimeout(() => {
            const blob = new Blob(session.chunks, {
                type: Video.MIME_TYPE,
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name}.mp4`;
            a.click();
            URL.revokeObjectURL(url);
        }, 0);
    }

    private tick(): void {
        if (!MediaRecorder.isTypeSupported(Video.MIME_TYPE)) {
            return;
        }

        this.startSession();
        if (this.sessions.length > this.duration) {
            this.sessions.shift().recorder.stop();
        }
        setTimeout(() => this.tick(), 1000);
    }

    private startSession(): void {
        const recorder = new MediaRecorder(window.canvas.captureStream(15), { mimeType: Video.MIME_TYPE });
        const chunks: Blob[] = [];
        recorder.ondataavailable = e => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        }
        recorder.start();

        this.sessions.push({ recorder, chunks });
    }
}
