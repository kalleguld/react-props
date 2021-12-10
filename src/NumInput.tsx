import React from "react";
import { InputHTMLAttributes } from "react";
import { Prop } from "./prop";


type NumInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'|'onChange' >;
export function NumInput(props: NumInputProps & {
    prop: Prop<number>
}){
    const {
        prop,
        ...rest
    } = props;

    return (
        <input {...rest} 
            value={prop.value} 
            onChange={evt => prop.set(evt.target.valueAsNumber)}
        />
    )
}