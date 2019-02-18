# TIL

Repository for tracking what we're learning

## 2019/02/13

### [Barreling](https://basarat.gitbooks.io/typescript/docs/tips/barrel.html) (javascript, typescript)

> @andycunn

The practice of rolling up a bunch of ES modules in a directory into a single group of named exports, using `index.js`.

#### Example

if you have...
```javascript
// demo/foo.ts
export class Foo {}

// demo/bar.ts
export class Bar {}

// demo/baz.ts
export default Baz
```

...then instead of doing...
```javascript
import { Foo } from '../demo/foo';
import { Bar } from '../demo/bar';
import Baz from '../demo/baz';
```

...you can create a **Barrel** that rolls up all of these separate modules...
```javascript
// demo/index.ts
export * from './foo'; // re-export all of its exports
export * from './bar'; // re-export all of its exports
export { default as Baz } from './baz'; // re-export default export
```

...into a single module with multiple named exports...
```javascript
import { Foo, Bar, Baz } from './demo'; // demo/index.ts is implied
```

#### Reference

- [Blog](https://medium.com/@klauskpm/do-a-barrel-export-aa5b79b76b05)
- [Typescript documentation](https://basarat.gitbooks.io/typescript/docs/tips/barrel.html)

## 2019/02/14

### [`ReactDOM.hydrate()` is not `ReactDOM.render()`](https://stackoverflow.com/a/46516869) (javascript, react, ssr)

> @andycunn

When you're using React SSR, **initial** client-side-rendered **DOM structure** must EXACTLY 
match server-side-rendered DOM. Otherwise the client-side-render will not be what you expect.

You CAN change innerText of nodes on the initial render but NOT structure/attributes. This is because components' `render` funcs when in the context of `hydrate()` only attach event handlers. DOM reconciliation does not happen during `hydrate()`. 

So your React DOM will look like what you expect, but the browser DOM will not match the React DOM.

The correct way to do this, from [React docs](https://reactjs.org/docs/react-dom.html#hydrate):

> If you intentionally need to render something different on the server and the client, you can do a two-pass rendering. Components that render something different on the client can read a state variable like `this.state.isClient`, which you can set to true in `componentDidMount()`. This way the initial render pass will render the same content as the server, avoiding mismatches, but an additional pass will happen synchronously right after hydration. Note that this approach will make your components slower because they have to render twice, so use it with caution.

So basically, you need to force a state-triggered re-render right after `hydrate()` (using `componentDidMount()`.

**Caveat**: Watch out for UI flicker if you do this. You'll be able to see the original SSR'd content flash for a tick before 
re-render happens with client-side version.

#### Example

```javascript
const SplitTestingThing = ({ experimentName, base, experiment, isClient }) => (
  <>
    {isClient ? (
      // for client-side (post-didmount), render actual content
      <Experiment name={experimentName}>
        <Variant name={base.name}>{base.content}</Variant>
        <Variant name={experiment.name}>{experiment.content}</Variant>
      </Experiment>
    ) : (
      // for server-side and hydrate-pass, render skeleton/placeholder/default.
      base.content
    )}
  </>
);

const SplitTesting = compose(
  withState('isClient', 'setIsClient', false),
  lifecycle({
    componentDidMount() {
      // trigger a full render/reconcile pass once mounted in browser dom
      this.props.setIsClient(true);
    },
  })
)(SplitTestingThing);
```

#### Reference

* [SO answer on why `render` and `hydrate` are different](https://stackoverflow.com/questions/46516395/whats-the-difference-between-hydrate-and-render-in-react-16)
* [`If you call ReactDOM.hydrate() on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.`](https://reactjs.org/docs/react-dom-server.html#rendertostring)
* [`...we don't patch up the attributes.`](https://github.com/facebook/react/issues/10189#issue-243147750)

## 2019/02/15

### [Hooks](https://reactjs.org/docs/hooks-intro.html) are an official thing in React 16.8

The promise of hooks is that you can use React features, like state, without writing component classes. This allows you to separate your state logic from your components cleanly and in a reusable manner. The stateful logic exists as an independent function that can be tested in isolation and shared without changing component higherarchy.

#### Let's Compare

A basic example of a component that uses state to keep track of button clicks

```javascript
// class version using state
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

// hook version using state
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

#### References
* https://reactjs.org/docs/hooks-intro.html
