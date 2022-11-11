export default class Color {
    private constructor(
        private readonly red: number,
        private readonly green: number,
        private readonly blue: number,
    ) {
    }

    merge(other: Color, ratio: number): Color {
        return new Color(
            this.red * (1 - ratio) + other.red * ratio,
            this.green * (1 - ratio) + other.green * ratio,
            this.blue * (1 - ratio) + other.blue * ratio,
        );
    }

    toString(): string {
        return `#${Math.round(this.red).toString(16).padStart(2, '0')}${Math.round(this.green).toString(16).padStart(2, '0')}${Math.round(this.blue).toString(16).padStart(2, '0')}`;
    }

    static fromInts(red: number, green: number, blue: number): Color {
        return new Color(red, green, blue);
    }
}
