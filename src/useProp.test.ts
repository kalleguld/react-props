import { renderHook, act } from '@testing-library/react-hooks';
import { useProp } from './useProp';

test('initial value can be set correctly', () => {
    const { result } = renderHook(() => {
        return useProp('1234');
    });

    expect(result.current.value).toEqual('1234');
});

test('initial value can be set using a function', () => {
    const { result } = renderHook(() => {
        return useProp(() => 2+2 /* expensive calculation, don't do it if it's not needed */);
    });

    expect(result.current.value).toEqual(4);
});

test('initial value is undefined if not specified', () => {
    const { result } = renderHook(() => {
        return useProp<number>();
    });

    expect(result.current.value).toBeUndefined();
});

test('value can be changed', () => {
    const { result } = renderHook(() => useProp('1234') );

    act(() => result.current.set('5678') );

    expect(result.current.value).toEqual('5678');
});

test("initial value is only calculated once", () => {
    const provider = jest.fn(() => 69);

    const hook = renderHook(() => useProp(provider));
    hook.rerender();
    hook.rerender();
    
    expect(provider).toBeCalledTimes(1);
})