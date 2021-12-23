import React, { InputHTMLAttributes } from "react";
import { Prop } from "./prop";

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>, 
    'checked'|'onChange'|'type'>;


/**Like a normal {@link JSX.IntrinsicElements.input `<input type='checkbox' />`} element, 
 * except it uses a {@link Prop<boolean> `Prop<boolean>`} instead of `checked` and `onChange` */
export function Checkbox(props: InputProps & {prop: Prop<boolean>} ) {

    const {
        prop,
        ...inputProps
    } = props;

    return (<input 
        {...inputProps}
        type='checkbox'
        checked={prop.value}
        onChange={evt=> prop.set(evt.target.checked)}
    />)

}