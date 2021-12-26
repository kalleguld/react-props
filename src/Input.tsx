import React, { InputHTMLAttributes } from "react";
import { Prop } from "./prop";

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>, 
    'value'>;

/**Like a normal {@link JSX.IntrinsicElements.input &lt;input /&gt;} element, 
 * except it uses a {@link Prop Prop&lt;string&gt;} instead of value. */
export function Input(props:InputProps & {
    prop: Prop<string>
}){

    const {
        prop,
        onChange,
        ...inputProps
    } = props;

    function innerOnChange(evt: React.ChangeEvent<HTMLInputElement>){
        prop.set(evt.target.value);
        onChange?.(evt);
    }

    return (<input {...inputProps} 
        value={prop.value} 
        onChange={innerOnChange} 
    />);
}