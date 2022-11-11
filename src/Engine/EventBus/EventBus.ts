import Event from './Event';
import ListenerId from './ListenerId';

export default class EventBus {

    private static _instance = new EventBus();

    private subscribers: Map<string, Map<ListenerId, { priority: number, callback: (event: Event) => void }>> = new Map();

    static get instance(): EventBus {
        return EventBus._instance;
    }

    private constructor() {
        //
    }

    subscribe(name: string, callback: (event: Event) => void, priority = 100): ListenerId {
        if (!this.subscribers.has(name)) {
            this.subscribers.set(name, new Map());
        }

        const listenerId = new ListenerId();
        this.subscribers.get(name).set(listenerId, { priority, callback });

        return listenerId;
    }

    unsubscribe(listenerId: ListenerId): void {
        this.subscribers.forEach(callback => callback.delete(listenerId));
    }

    dispatch(event: Event): void {
        if (!this.subscribers.has(event.name)) {
            return;
        }

        const subscribers = new Map([...this.subscribers.get(event.name).entries()].sort());

        subscribers.forEach(subscriber => subscriber.callback(event));
    }
}
