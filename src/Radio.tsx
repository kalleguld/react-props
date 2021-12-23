import React, { InputHTMLAttributes } from "react";
import { Prop } from "./prop";

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>, 
    'checked'|'onChange'|'type'|'value'>;

export function Radio<T>(props: InputProps & {
    prop: Prop<T>,
    value: T
}) {
    const {
        prop,
        value,
        ...rest
    } = props;
    return <input {...rest} 
        type='radio'
        onChange={() => prop.set(value)}
        checked={prop.value === value}
    />;

}