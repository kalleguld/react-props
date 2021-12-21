import { useState } from "react";
import { Prop } from "./prop";

/**Like {@link useState}, except it returns a {@link Prop Prop&lt;T&gt;} */
export function useProp<T>(): Prop<T|undefined>
export function useProp<T>(initialValueFunc: ( (t: T)=> T)): Prop<T>;
export function useProp<T>(initialValue: T): Prop<T>;
export function useProp<T>(initialValue?: T | ( () => T)): Prop<T|undefined>{
    
    const s = useState(initialValue);
    return {
        value: s[0],
        set: s[1]
    };
}