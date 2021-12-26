/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BasicProp, useProp, Input } from '..';

test("Has correct value", () => {
    function TestInput(){
        const prop = useProp('wasd');
        return <Input prop={prop} alt='inputField1' />
    }

    render(<TestInput />);

    const inputElement: HTMLInputElement|null = screen.queryByAltText('inputField1');
    expect(inputElement?.value).toEqual('wasd');
})

test("Updates prop on change event", (done) => {
    
    const prop = new BasicProp('foo'); 
    function checkChanged(evt: React.ChangeEvent<HTMLInputElement>){
        expect(evt.target.value).toEqual('bar');
        done();
    }
    render(<Input prop={prop} alt='inputField1' onChange={checkChanged} />);

    const inputElement = screen.queryByAltText('inputField1');
    fireEvent.change(inputElement!, {target: {value:'bar'}});

    expect(prop.value).toEqual('bar');
});


test("Updates value on prop change", () =>{
    function TestInput(){
        const prop = useProp('foo');
        return (<>
            <Input prop={prop} alt='inputField1' />
            <button onClick={evt => prop.set('bar')}>btn</button>
        </>);
    }
    render(<TestInput />);

    const btn = screen.queryByText('btn');
    fireEvent.click(btn!);

    const inputElement: HTMLInputElement|null = screen.queryByAltText('inputField1');
    expect(inputElement?.value).toEqual('bar');

})