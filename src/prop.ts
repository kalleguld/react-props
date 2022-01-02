
/** Represents a getter and a setter */
export interface Prop<T>{
    readonly value: T;
    set(newValue: T): void;
}


