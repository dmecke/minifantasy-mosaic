export default interface State<T> {

    name: string;

    enter?(entity: T): void;

    update?(entity: T): void;

    render?(entity: T): void;

    exit?(entity: T): void;
}
