import { BasicProp } from "./BasicProp"
import { EventProp, EventPropChangeArgs } from "./EventProp"

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
    const fn = jest.fn((pca: EventPropChangeArgs<number>) => undefined);
    const bp = new BasicProp(5);
    const sut = new EventProp(bp, fn);

    sut.set(99);
    sut.set(94);

    expect(fn).toBeCalledTimes(2);
    expect(fn.mock.calls[0][0].oldValue).toEqual(5);
    expect(fn.mock.calls[0][0].newValue).toEqual(99);
    expect(fn.mock.calls[1][0].oldValue).toEqual(99);
    expect(fn.mock.calls[1][0].newValue).toEqual(94);
    
});

test("cancelling a set event works", () => {
    const fn = jest.fn((pca: EventPropChangeArgs<number>) => {pca.cancel()});
    const bp = new BasicProp(5);
    const sut = new EventProp(bp, fn);

    sut.set(99);

    expect(sut.value).toEqual(5);
    expect(bp.value).toEqual(5);
});

test("changing the newValue on an event works", () => {
    const fn = jest.fn((pca: EventPropChangeArgs<number>) => { pca.newValue = 66 });
    const bp = new BasicProp(5);
    const sut = new EventProp(bp, fn);

    sut.set(99);

    expect(sut.value).toEqual(66);
    expect(bp.value).toEqual(66);
});