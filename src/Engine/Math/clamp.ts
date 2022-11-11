export default function (value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}
