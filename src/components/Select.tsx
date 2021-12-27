import React from 'react';
import { Prop } from '..';

type SelectProps = Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'value'
>;

export function Select<T>(props: SelectProps & {
    value: Prop<T|undefined>,
    options: T[],
    formatter?: (t: T) => string
}){

    const {
        value,
        options,
        formatter,
        onChange,
        ...rest
    } =props;

    function innerOnChange(evt: React.ChangeEvent<HTMLSelectElement>){
        const index = parseInt(evt.target.value);
        const option = options[index];
        value.set(option);
        onChange?.(evt);
    }

    const selectedIndex = options.findIndex(o => o === value.value);

    return (
        <select {...rest} value={selectedIndex} onChange={innerOnChange}>
            {options.map((o, idx) => (
                <option value={idx} key={idx}>
                    {formatter ? formatter(o) : o}
                </option>
            ))}
        </select>
    )
}