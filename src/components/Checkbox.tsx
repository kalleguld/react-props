import React, { InputHTMLAttributes } from "react";
import { Prop } from "../prop";

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>, 
    'checked'|'type'>;


/**Like a normal {@link JSX.IntrinsicElements.input `<input type='checkbox' />`} element, 
 * except it uses a {@link Prop<boolean> `Prop<boolean>`} instead of `checked` and `onChange` */
export function Checkbox(props: InputProps & {prop: Prop<boolean>} ) {

    const {
        prop,
        onChange,
        ...inputProps
    } = props;
    function innerOnChange(evt: React.ChangeEvent<HTMLInputElement>){
        prop.set(evt.target.checked);
        onChange?.(evt);
    }

    return (<input 
        {...inputProps}
        type='checkbox'
        checked={prop.value}
        onChange={innerOnChange}
    />)

}