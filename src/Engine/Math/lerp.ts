export default function (a: number, b: number, amount: number): number {
    return a * (1 - amount) + b * amount;
}
