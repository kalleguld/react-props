import { useMemo, useState } from "react";
import { Prop } from "./prop";

/** Uses window.localStorage to hold state */
export function usePersistentProp<T extends {}>(key: string): Prop<T|undefined>
export function usePersistentProp<T extends {}>(key: string, initialValue: T): Prop<T>;
export function usePersistentProp<T extends {}>(key: string, initialValue?: T): Prop<T|undefined>{

    
    const storageValue = useMemo(() => {
        let storageValueStr = window.localStorage.getItem(key);
        if (storageValueStr !== null){
            return JSON.parse(storageValueStr) as T;
        }
        storageValueStr = JSON.stringify(initialValue);
        window.localStorage.setItem(key, storageValueStr);
        return initialValue;
    }, [key]);

    const [value, setValue] = useState(storageValue);
    function setter(newValue: T|undefined){
        setValue(newValue);
        const storageValueStr = JSON.stringify(initialValue);
        window.localStorage.setItem(key, storageValueStr);
        
    }

    return {
        value,
        set: setter
    };
}