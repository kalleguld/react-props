import { useState } from "react";
import { Prop } from "./prop";

/** Uses window.localStorage to hold state. */
export function usePersistentProp<T extends {}>(key: string): Prop<T|undefined>
export function usePersistentProp<T extends {}>(key: string, initialValueFunc: () => T): Prop<T>;
export function usePersistentProp<T extends {}>(key: string, initialValue: T): Prop<T>;
export function usePersistentProp<T extends {}>(key: string, initialValue?: T | ( () => T ) ): Prop<T|undefined>{

    const [value, setValue] = useState(() =>{
        let storageValueStr = window.localStorage.getItem(key);
        if (storageValueStr !== null){
            const storedValue = JSON.parse(storageValueStr) as T;
            return storedValue;
        }
        const val = (typeof initialValue === 'function') 
            ? (initialValue as any)() 
            : initialValue;
        return val;
    });

    function setter(newValue: T | undefined | ( (t:T|undefined) => T|undefined)){
        const v = (newValue instanceof Function)
            ? newValue(value)
            : newValue;
        setValue(v);
        const storageValueStr = JSON.stringify(v);
        window.localStorage.setItem(key, storageValueStr);
    }

    return {
        value,
        set: setter
    };
}