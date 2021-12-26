/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { fireEvent, render, screen } from '@testing-library/react';
 import { useProp, BasicProp, Radio } from '.';
 
test("Has correct value when selected", () => {
    function TestInput(){
        const prop = useProp('foo');
        return <Radio value={'foo'} prop={prop} alt='inputField1' />
    }

    render(<TestInput />);

    const inputElement: HTMLInputElement|null = screen.queryByAltText('inputField1');
    expect(inputElement?.checked).toBeTruthy();
});
test("Has correct value when not selected", () => {
    function TestInput(){
        const prop = useProp('foo');
        return <Radio value={'bar'} prop={prop} alt='inputField1' />
    }

    render(<TestInput />);

    const inputElement: HTMLInputElement|null = screen.queryByAltText('inputField1');
    expect(inputElement?.checked).toBeFalsy();
});
 
test("Updates prop on change event", () => {
    
    const prop = new BasicProp('foo'); 
    render(<Radio prop={prop} alt='inputField1' value={'bar'} />);

    const inputElement = screen.queryByAltText('inputField1');
    fireEvent.click(inputElement!)

    expect(prop.value).toEqual('bar')
});


test("Updates value on prop change", () =>{
    function TestInput(){
        const prop = useProp('foo');
        return (<>
            <Radio prop={prop} value={'bar'} alt='inputField1' />
            <button onClick={evt => prop.set('bar')}>btn</button>
        </>);
    }

    render(<TestInput />);
    const btn = screen.queryByText('btn');
    fireEvent.click(btn!);

    const inputElement: HTMLInputElement|null = screen.queryByAltText('inputField1');
    expect(inputElement?.checked).toBeTruthy();
})