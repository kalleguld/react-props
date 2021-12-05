import { BasicProp } from "./BasicProp";
import { map } from "./map";


test("Get works", () => {
    const o = new BasicProp({
        a:"asdf",
        b: {
            a:'wasd'
        }
    });
    
    const dut = map(o, 'a');

    expect(dut.value).toEqual('asdf');
});
test("Get works, 2 deep", () => {
    const o = new BasicProp({
        a:"asdf",
        b: {
            a:'wasd'
        }
    });

    const dut = map(o, 'b', 'a');

    expect(dut.value).toEqual('wasd');
});


test("Set works", () => {
    const o = new BasicProp({
        a:"asdf",
        b: {
            a:'wasd'
        }
    });
    const dut = map(o, 'a');

    dut.set('bar');

    expect(dut.value).toEqual('bar');
    expect(o.value.a).toEqual('bar');
    expect(o.value.b.a).toEqual('wasd');
});
test("Set works, 2 deep", () => {
    const o = new BasicProp({
        a:"asdf",
        b: {
            a:'wasd'
        }
    });
    const dut = map(o, 'b', 'a');

    dut.set('bar');

    expect(dut.value).toEqual('bar');
    expect(o.value.a).toEqual('asdf');
    expect(o.value.b.a).toEqual('bar');
});

test("Set works, 5 deep", () => {
    const o = new BasicProp({
        a:{
            b:{
                c:{
                    d:{
                        e:'ffr'
                    }
                },
                cc:'const'
            }
        },
        aa:'const'
    });
    const dut = map(o, 'a','b','c','d','e');

    dut.set('bar');

    expect(dut.value).toEqual('bar');
    expect(o.value.a.b.c.d.e).toEqual('bar');
    expect(o.value.aa).toEqual('const');
    expect(o.value.a.b.cc).toEqual('const');
});

test('using it on an array works',()=> {
    const o = new BasicProp([1,2,3,4,5]);
    const dut = map(o, 1);

    dut.set(300);

    expect(o.value[1]).toEqual(300);
    expect(dut.value).toEqual(300);
    expect(o.value[0]).toEqual(1);
    expect(o.value[2]).toEqual(3);
    expect(Array.isArray(o.value)).toBeTruthy();
});