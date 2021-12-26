/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { fireEvent, render, screen } from '@testing-library/react';
 import { useProp, BasicProp, Checkbox } from '..';
 
 test("Has correct value", () => {
     function TestInput(){
         const prop = useProp(true);
         return <Checkbox prop={prop} alt='inputField1' />
     }
 
     render(<TestInput />);
 
     const inputElement: HTMLInputElement|null = screen.queryByAltText('inputField1');
     expect(inputElement?.checked).toBeTruthy();
 })
 
 test("Updates prop on change event", () => {
     
     const prop = new BasicProp(false); 
 
    render(<Checkbox prop={prop} alt='inputField1'  />);

    const inputElement = screen.queryByAltText('inputField1');
    fireEvent.click(inputElement!)

     expect(prop.value).toBeTruthy();
 });
 
 
 test("Updates value on prop change", () =>{
    function TestInput(){
        const prop = useProp(false);
        return (<>
            <Checkbox prop={prop} alt='inputField1' />
            <button onClick={evt => prop.set(true)}>btn</button>
        </>);
    }
    
    render(<TestInput />);
    const btn = screen.queryByText('btn');
    fireEvent.click(btn!);

     const inputElement: HTMLInputElement|null = screen.queryByAltText('inputField1');
     expect(inputElement?.checked).toBeTruthy();
 
 })