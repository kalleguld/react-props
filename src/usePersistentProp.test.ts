/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react-hooks';
import * as dut from './usePersistentProp';

test('initial value can be set correctly', () => {
    const randomString = new Date().toString();
    var key = 'usePersistentProp_Test_key_1';
    window.localStorage.removeItem(key);

    const { result } = renderHook(() => 
        dut.usePersistentProp(key, randomString)
    );

    expect(result.current.value).toEqual(randomString);
});

test('value can be updated correctly', () => {
    const randomString = new Date().toString();
    var key = 'usePersistentProp_Test_key_2';
    window.localStorage.removeItem(key);

    const { result } = renderHook(() => 
        dut.usePersistentProp(key, randomString)
    );

    act(() => result.current.set('asdf'))

    expect(result.current.value).toEqual('asdf');
});


test('initial value is not persisted', () =>{
    const randomString = new Date().toString();
    const otherString = randomString + 'wtffs';
    var key = 'usePersistentProp_Test_key_3';
    window.localStorage.removeItem(key);

    const r1 = renderHook(() => 
        dut.usePersistentProp(key, randomString)
    );
    r1.unmount();

    const r2 = renderHook(() => 
        dut.usePersistentProp(key, otherString)
    );

    expect(r2.result.current.value).toEqual(otherString);
});

test('value is persisted after being set', () => {
    const randomString = new Date().toString();
    const otherString = randomString + 'wtffs';
    var key = 'usePersistentProp_Test_key_4';
    window.localStorage.removeItem(key);
    
    const r1 = renderHook(() => 
        dut.usePersistentProp(key)
    );
    act(() =>r1.result.current.set(randomString))
    r1.unmount();

    const r2 = renderHook(() => 
        dut.usePersistentProp(key, otherString)
    );

    expect(r2.result.current.value).toEqual(randomString);
});


test('initial value can be set using a function', () => {
    const randomString = new Date().toString();
    var key = 'usePersistentProp_Test_key_5';
    window.localStorage.removeItem(key);

    const { result } = renderHook(() => 
        dut.usePersistentProp(key, () => randomString)
    );

    expect(result.current.value).toEqual(randomString);
});

test('initial value is only calculated once', () => {
    const provider = jest.fn(() => 69);
    var key = 'usePersistentProp_Test_key_7';
    window.localStorage.removeItem(key);
    
    const hook = renderHook(() => 
        dut.usePersistentProp(key, provider)
    );
    expect(hook.result.current.value).toEqual(69);
    hook.rerender();
    hook.rerender();
    
    expect(hook.result.current.value).toEqual(69);
    expect(provider).toBeCalledTimes(1);
});

test('initial value is not calculated if value is already set', () => {
    var key = 'usePersistentProp_Test_key_8';
    window.localStorage.removeItem(key);
    const warmupHook = renderHook(() => dut.usePersistentProp(key, 45));
    act(() => warmupHook.result.current.set(48));
    warmupHook.unmount();

    const provider = jest.fn(() => 69);
    const hook = renderHook(() => 
        dut.usePersistentProp(key, provider)
    );
    hook.rerender();
    hook.rerender();

    expect(provider).toBeCalledTimes(0);
});