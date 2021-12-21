import { renderHook, act } from '@testing-library/react-hooks';
import { useProp} from './useProp';

test('initial value can be set correctly', () => {
    const { result } = renderHook(() => {
        return useProp('1234');
    });

    expect(result.current.value).toEqual('1234');
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