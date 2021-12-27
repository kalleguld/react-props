/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { act, fireEvent, render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event'
 import { useProp, BasicProp, Select, EventProp } from '..';
 
test("Has correct value", () => {
    function TestInput(){
        const options = ['foo','bar','baz'];
        const prop = useProp('bar');
        return (
            <form data-testid='form1'>
                <Select value={prop} 
                    options={options} 
                    data-testid='select1' 
                    name='exampleValue' />
            </form>
        );
    }

    const r = render(<TestInput />);
    const select1 = screen.getByTestId<HTMLFormElement>('select1');
    expect(select1.selectedOptions[0].text).toEqual('bar');
    
});

test("Has correct value after changing selection", async () => {
    let v: string|undefined = undefined;
    const fn = jest.fn();
    //const prop = new BasicProp('bar');
    function TestInput(){
        const options = ['foo','bar','baz'];
        const prop = new EventProp(useProp('bar'), t => v = t);
        return (
            <form data-testid='form1'>
                <Select value={prop} 
                    options={options}
                    onChange={fn} 
                    data-testid='select1' 
                    formatter={s => s.toUpperCase()}
                    name='exampleValue' />
            </form>
        );
    }

    const r = render(<TestInput />);
    const select1 = screen.getByTestId<HTMLSelectElement>('select1');
    userEvent.selectOptions(select1, ['BAZ'])
    
    expect(fn).toBeCalled();    
    const select2 = screen.getByTestId<HTMLSelectElement>('select1');
    expect(select2.selectedOptions[0].text).toEqual('BAZ');
    expect(v).toEqual('baz');
});
