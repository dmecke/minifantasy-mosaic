export default class Queue<T> {
    private elements: T[] = [];

    enqueue(element: T): void {
        this.elements.push(element);
    }

    dequeue(): T|null {
        return this.elements.shift();
    }

    size(): number {
        return this.elements.length;
    }
}
