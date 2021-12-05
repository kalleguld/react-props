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


