/**
 * @jest-environment jsdom
 */

import React from 'react';
import { useProp } from './useProp';
import { Input } from './Input';
import { fireEvent, render, screen } from '@testing-library/react';
import { BasicProp } from './BasicProp';

test("Has correct value", () => {
    function TestInput(){
        const prop = useProp('wasd');
        return <Input prop={prop} alt='inputField1' />
    }

    render(<TestInput />);

    const inputElement: HTMLInputElement|null = screen.queryByAltText('inputField1');
    expect(inputElement?.value).toEqual('wasd');
})

test("Updates value", async () => {
    const prop = new BasicProp('foo');
    render(<Input prop={prop} alt='inputField1' />);

    const inputElement = screen.queryByAltText('inputField1');
    fireEvent.change(inputElement!, {target: {value:'bar'}})

    expect(prop.value).toEqual('bar');
    // const newInputElement = screen.queryByAltText('inputField1');
    // expect((newInputElement as HTMLInputElement)?.value).toEqual('bar')
})