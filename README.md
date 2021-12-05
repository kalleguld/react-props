# react-props

Offers a slightly better way of managing state in react.

Start by calling `const p = useProp('asdf')`, which returns a `Prop<string>`. Pass the prop to an `<Input>` with `<Input prop={p}>`.

Use `map()` to "slice" a big Prop into smaller pieces for easier consumption:

```ts
const person = useProp({
    name: "Santa Claus",
    email: "santa@northpole.net",
    socialMedia: {
        instagram: "theRealSanta",
        youtube: "@santa1",
    }
    isWatching: true
});

const name = map(person, 'name');
const email = map(person, 'email');
const youtube = map(person, 'socialMedia','youtube'):
```