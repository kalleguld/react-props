import { useState } from "react";
import { Prop } from "./prop";

export type Options = {
    storage?: 'session'|'local',
    key: string;
}

/** Uses window.localStorage to hold state. */
export function usePersistentProp<T extends {}>(key: string | Options): Prop<T|undefined>
export function usePersistentProp<T extends {}>(key: string | Options, initialValueFunc: () => T): Prop<T>;
export function usePersistentProp<T extends {}>(key: string | Options, initialValue: T): Prop<T>;
export function usePersistentProp<T extends {}>(
    key: string | Options, 
    initialValue?: T | ( () => T )
): Prop<T|undefined>{
    let key2: string;
    let storageName = 'local';
    if (typeof key === 'string'){
        key2 = key;
    }
    else {
        key2 = key.key;
        storageName = key.storage ?? storageName;
    }
    const storage = (storageName === 'session') 
        ? window.sessionStorage 
        : window.localStorage;


    const [value, setValue] = useState(() =>{
        let storageValueStr = storage.getItem(key2);
        if (storageValueStr !== null){
            const storedValue = JSON.parse(storageValueStr) as T;
            return storedValue;
        }
        const val = (typeof initialValue === 'function') 
            ? (initialValue as any)() 
            : initialValue;
        return val;
    });

    function setter(newValue: T ){

        setValue(newValue);
        const storageValueStr = JSON.stringify(newValue);
        storage.setItem(key2, storageValueStr);
    }

    return {
        value,
        set: setter
    };
}