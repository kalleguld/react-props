import { Prop } from "./prop";


export class EventProp<T> implements Prop<T>{
    constructor(
        private readonly prop: Prop<T>,
        private readonly onChange: (t: T) => void
    ){

    }
    get value(): T{return this.prop.value};
    set(t: T){
        this.prop.set(t);
        this.onChange(t);
    }
}