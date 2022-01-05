/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { fireEvent, render, screen } from '@testing-library/react';
 import { useProp, BasicProp, Radio } from '..';
 
test("Has correct value when selected", () => {
    function TestInput(){
        const prop = useProp('foo');
        return <Radio value={'foo'} prop={prop} alt='inputField1' />
    }

    render(<TestInput />);

    const inputElement = screen.getByAltText<HTMLInputElement>('inputField1');
    expect(inputElement.checked).toBeTruthy();
});

test("Has correct value when not selected", () => {
    function TestInput(){
        const prop = useProp('foo');
        return <Radio value={'bar'} prop={prop} alt='inputField1' />
    }

    render(<TestInput />);

    const inputElement = screen.getByAltText<HTMLInputElement>('inputField1');
    expect(inputElement.checked).toBeFalsy();
});
 
test("Updates prop on change event", () => {
    
    const prop = new BasicProp('foo'); 
    render(<Radio prop={prop} alt='inputField1' value={'bar'} />);

    const inputElement = screen.getByAltText('inputField1');
    fireEvent.click(inputElement)

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
    const btn = screen.getByText('btn');
    fireEvent.click(btn!);

    const inputElement = screen.getByAltText<HTMLInputElement>('inputField1');
    expect(inputElement.checked).toBeTruthy();
})

test("updates neighbor on selection", () => {
    function TestComponent(){
        const prop = useProp('foo');
        return (<>
            <Radio prop={prop} value='foo' alt='foo' />
            <Radio prop={prop} value='bar' alt='bar2' />
            <Radio prop={prop} value='baz' alt='baz' />
            <Radio prop={prop} value='bar' alt='bar3' />
        </>);
    }
    render(<TestComponent />);

    const bar = screen.getByAltText('bar2');
    fireEvent.click(bar);

    const foo = screen.getByAltText<HTMLInputElement>('foo');
    expect(foo.checked).toBeFalsy();
    const bar2 = screen.getByAltText<HTMLInputElement>('bar2');
    expect(bar2.checked).toBeTruthy();
    const baz = screen.getByAltText<HTMLInputElement>('baz');
    expect(baz.checked).toBeFalsy();
    const bar3 = screen.getByAltText<HTMLInputElement>('bar3');
    expect(bar3.checked).toBeTruthy();
})