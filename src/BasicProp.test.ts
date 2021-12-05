import { BasicProp } from "./BasicProp"

test("initial value is correct", ()=> {
    const dut = new BasicProp('foo');
    expect(dut.value).toEqual('foo');
});

test("setting a new value works", () => {
    const dut = new BasicProp(1);
    dut.set(4);
    expect(dut.value).toEqual(4);
});
