import { BasicProp } from "./BasicProp";
import { MapProp } from "./MapProp";

test("Get works", () => {
    const o = new BasicProp({
        a:"asdf",
        b: {
            a:'wasd'
        }
    });
    const dut = new MapProp(o, 'a');

    expect(dut.value).toEqual('asdf');
})

test("Set works", () => {
    const o = new BasicProp({
        a:"asdf",
        b: {
            a:'wasd'
        }
    });
    const dut = new MapProp(o, 'a');
    dut.set('bar');

    expect(dut.value).toEqual('bar');
    expect(o.value.a).toEqual('bar');
    expect(o.value.b.a).toEqual('wasd');
});

test("works with arrays", () => {
    const o = new BasicProp([0,1,2,3,4,5]);
    const dut = new MapProp(o, 3);
    dut.set(300);

    expect(dut.value).toEqual(300);
    expect(o.value[3]).toEqual(300);
    expect(o.value[2]).toEqual(2);
    
})

