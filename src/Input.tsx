import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Prop } from "./prop";

type InputProps = Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 
    'value'|'onChange'>;

/**Like a normal {@link JSX.IntrinsicElements.input &lt;input /&gt;} element, 
 * except it uses a {@link Prop Prop&lt;string&gt;} instead of value and onChange*/
export function Input(props:InputProps & {
    prop: Prop<string>
}){

    const {
        prop,
        ...inputProps
    } = props;

    return (<input {...inputProps} 
        value={prop.value} 
        onChange={evt => prop.set(evt.target.value)} 
    />);
}