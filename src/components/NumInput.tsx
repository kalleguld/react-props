import React, { InputHTMLAttributes } from "react";
import { Prop } from "../prop";


type NumInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>, 
    'value'|'type' >;
export function NumInput(props: NumInputProps & {
    prop: Prop<number>
}){
    const {
        prop,
        onChange,
        ...rest
    } = props;

    function innerOnChange(evt: React.ChangeEvent<HTMLInputElement>){
        prop.set(evt.target.valueAsNumber);
        onChange?.(evt);
    }

    return (
        <input {...rest} 
            type='number'
            value={prop.value} 
            onChange={innerOnChange}
        />
    )
}