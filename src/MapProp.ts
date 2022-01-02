import { Prop } from "./prop";

export class MapProp<T, K extends keyof T> implements Prop<T[K]> {
    constructor(
        private readonly p: Prop<T>,
        private readonly k: K){

    }
    get value(){
        return this.p.value[this.k];
    }
    set(newValue: T[K]){
        const val = this.p.value;
        
        let newT: any;
        if (Array.isArray(val)){
            newT = [...val];
        }
        else { 
            newT = {...val};
        }
        newT[this.k] = newValue;
        this.p.set(newT);
    }
}
