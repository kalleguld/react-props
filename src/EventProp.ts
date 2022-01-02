import { Prop } from "./prop";

export interface EventPropChangeArgs<T> {
    readonly oldValue: T;
    newValue: T;
    cancel(): void;
}

/** A {@link Prop} that wraps another {@link Prop} and has a callback. */
export class EventProp<T> implements Prop<T>{
    constructor(
        private readonly prop: Prop<T>,
        private readonly onChange: (pca: EventPropChangeArgs<T>) => void
    ){ }

    get value(): T{ return this.prop.value };

    set(newValue: T){
        const oldValue = this.prop.value;
        let shouldCancel = false;
        const pca: EventPropChangeArgs<T> = {
            oldValue: oldValue,
            newValue: newValue,
            cancel: () => { shouldCancel = true; }
        };
        this.onChange(pca);
        if (shouldCancel)
            return;
        this.prop.set(pca.newValue);
    }
}