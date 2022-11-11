// https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript/42919752#42919752

const top = 0;
const parent = (i: number) => ((i + 1) >>> 1) - 1;
const left = (i: number) => (i << 1) + 1;
const right = (i: number) => (i + 1) << 1;

export default class PriorityQueue<T> {
    private heap: { element: T, priority: number }[] = [];

    private constructor(
        private readonly comparator: (a: number, b: number) => boolean,
    ) {
    }

    static min<T>(): PriorityQueue<T> {
        return new PriorityQueue((a: number, b: number) => a < b);
    }

    static max<T>(): PriorityQueue<T> {
        return new PriorityQueue((a: number, b: number) => a > b);
    }

    enqueue(element: T, priority: number): void {
        this.heap.push({ element, priority });
        this.siftUp();
    }

    dequeue(): T|null {
        if (this.size() === 0) {
            return null;
        }

        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > top) {
            this.swap(top, bottom);
        }
        this.heap.pop();
        this.siftDown();

        return poppedValue.element;
    }

    size(): number {
        return this.heap.length;
    }

    clear(): void {
        this.heap = [];
    }

    private peek(): { element: T, priority: number } {
        return this.heap[top];
    }

    private swap(a: number, b: number): void {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    private siftUp(): void {
        let node = this.size() - 1;
        while (node > top && this.greater(node, parent(node))) {
            this.swap(node, parent(node));
            node = parent(node);
        }
    }

    private siftDown(): void {
        let node = top;
        while (
            (left(node) < this.size() && this.greater(left(node), node)) ||
            (right(node) < this.size() && this.greater(right(node), node))
        ) {
            const maxChild = (right(node) < this.size() && this.greater(right(node), left(node))) ? right(node) : left(node);
            this.swap(node, maxChild);
            node = maxChild;
        }
    }

    private greater(a: number, b: number): boolean {
        return this.comparator(this.heap[a].priority, this.heap[b].priority);
    }
}
