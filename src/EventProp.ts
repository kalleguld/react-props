import { Prop } from "./prop";


export class EventProp<T> implements Prop<T>{
    constructor(
        private readonly prop: Prop<T>,
        private readonly onChange: (newT: T, oldT: T) => void
    ){ }

    get value(): T{ return this.prop.value };

    set(t: T){
        const old = this.prop.value;
        this.prop.set(t);
        this.onChange(t, old);
    }
}