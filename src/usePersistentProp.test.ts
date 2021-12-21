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

test('value is persisted from localStorage', () => {
    const randomString = new Date().toString();
    const otherString = randomString + 'wtffs';
    var key = 'usePersistentProp_Test_key_3';
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