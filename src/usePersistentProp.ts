import { useMemo, useState } from "react";
import { Prop } from "./prop";

/** Uses window.localStorage to hold state. */
export function usePersistentProp<T extends {}>(key: string): Prop<T|undefined>
export function usePersistentProp<T extends {}>(key: string, initialValue: T): Prop<T>;
export function usePersistentProp<T extends {}>(key: string, initialValue?: T): Prop<T|undefined>{

    
    const storageValue = useMemo(() => {
        let storageValueStr = window.localStorage.getItem(key);
        if (storageValueStr !== null){
            const storedValue = JSON.parse(storageValueStr) as T;
            //console.debug("restored persistent prop", {key, storedValue})
            return storedValue;
        }
        storageValueStr = JSON.stringify(initialValue);
        window.localStorage.setItem(key, storageValueStr);
        //console.debug("Setting initial persistent prop", {key, initialValue});
        return initialValue;
    }, [key]);

    const [value, setValue] = useState(storageValue);

    function setter(newValue: T|undefined){
        setValue(newValue);
        const storageValueStr = JSON.stringify(newValue);
        window.localStorage.setItem(key, storageValueStr);
        //console.debug("Setting persistent prop", {key, newValue});
    }

    return {
        value,
        set: setter
    };
}