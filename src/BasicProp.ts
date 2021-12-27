import { Prop } from "./prop";

export class BasicProp<T> implements Prop<T>{
    private _value: T;
    constructor(initialValue: T){
        this._value = initialValue;
    }
    get value(){return this._value;}
    set(newValue: T | ( (t: T) => T)){

        this._value = typeof newValue === 'function'
            ? (newValue as any)(this._value)
            : newValue;
    }
}