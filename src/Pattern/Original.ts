import Pattern from './Pattern';

export default class Original implements Pattern {
    getColor(color: [number, number, number, number]): [number, number, number, number] {
        return color;
    }
}
