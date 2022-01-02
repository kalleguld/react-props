import { BasicProp } from "./BasicProp"
import { EventProp } from "./EventProp"

test("getting a value works", () => {
    const bp = new BasicProp(4);
    const sut = new EventProp(bp, jest.fn());

    expect(sut.value).toEqual(4);
})

test("setting a value works", () => {
    const bp = new BasicProp(5);
    const sut = new EventProp(bp, jest.fn());

    sut.set(8);

    expect(sut.value).toEqual(8);
    expect(bp.value).toEqual(8);
})

test("setting a value calls the event handler", () => {
    const fn = jest.fn((newValue: number, oldValue: number) => undefined);
    const bp = new BasicProp(5);
    const sut = new EventProp(bp, fn);

    sut.set(99);
    sut.set(94);

    expect(fn).toBeCalledTimes(2);
    expect(fn.mock.calls[0]).toEqual([99, 5]);
    expect(fn.mock.calls[1]).toEqual([94, 99]);
    
});