/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BasicProp, useProp, NumInput } from '..';

test("Has correct value", () => {
    function TestInput(){
        const prop = useProp(69);
        return <NumInput prop={prop} alt='inputField1' />
    }

    render(<TestInput />);

    const inputElement: HTMLInputElement|null = screen.queryByAltText('inputField1');
    expect(inputElement?.value).toEqual('69');
})

test("Updates prop on change event", (done) => {
    
    const prop = new BasicProp(69); 
    function checkChanged(evt: React.ChangeEvent<HTMLInputElement>){
        expect(evt.target.value).toEqual('420');
        done();
    }
    render(<NumInput prop={prop} alt='inputField1' onChange={checkChanged} />);

    const inputElement = screen.queryByAltText('inputField1');
    fireEvent.change(inputElement!, {target: {value:'420',valueAsNumber:420}});

    expect(prop.value).toEqual(420);
});


test("Updates value on prop change", () =>{
    function TestInput(){
        const prop = useProp(69);
        return (<>
            <NumInput prop={prop} alt='inputField1' />
            <button onClick={evt => prop.set(420)}>btn</button>
        </>);
    }
    render(<TestInput />);

    const btn = screen.queryByText('btn');
    fireEvent.click(btn!);

    const inputElement: HTMLInputElement|null = screen.queryByAltText('inputField1');
    expect(inputElement?.value).toEqual('420');
})