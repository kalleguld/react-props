import React, { InputHTMLAttributes } from "react";
import { Prop } from "../prop";

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>, 
    'checked'|'type'|'value'>;

export function Radio<T>(props: InputProps & {
    prop: Prop<T>,
    value: T
}) {
    const {
        prop,
        value,
        onChange,
        ...rest
    } = props;

    function innerOnChange(evt: React.ChangeEvent<HTMLInputElement>){
        prop.set(value);
        onChange?.(evt);
    }

    return <input {...rest} 
        type='radio'
        onChange={innerOnChange}
        checked={prop.value === value}
    />;

}