import { MapProp } from "./MapProp";
import { Prop } from "./prop";

export function map<
        T, 
        K extends keyof T, 
        K2 extends keyof T[K],
        K3 extends keyof T[K][K2],
        K4 extends keyof T[K][K2][K3],
        K5 extends keyof T[K][K2][K3][K4]
    >(
        p: Prop<T>, 
        k: K, 
        k2:K2,
        k3:K3,
        k4:K4,
        k5:K5
    ) : Prop<T[K][K2][K3][K4][K5]>
export function map<
        T, 
        K extends keyof T, 
        K2 extends keyof T[K],
        K3 extends keyof T[K][K2],
        K4 extends keyof T[K][K2][K3]
    >(
        p: Prop<T>, 
        k: K, 
        k2:K2,
        k3:K3,
        k4:K4
    ) : Prop<T[K][K2][K3][K4]>
export function map<
        T, 
        K extends keyof T, 
        K2 extends keyof T[K],
        K3 extends keyof T[K][K2]
    >(
        p: Prop<T>, 
        k: K, 
        k2:K2,
        k3:K3
    ) : Prop<T[K][K2][K3]>
export function map<
        T, 
        K extends keyof T, 
        K2 extends keyof T[K]
    >(
        p: Prop<T>, 
        k: K, 
        k2:K2
    ) : Prop<T[K][K2]>
export function map<
    T, 
    K extends keyof T
>(
    p: Prop<T>, 
    k: K
) : Prop<T[K]>;
export function map<T>(p: Prop<T>, ...ks: any[]){
    let result:any = p;
    for (let k of ks){
        result = new MapProp<any,any>(result, k);
    }
    return result;
}
