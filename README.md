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

> @daveymeyer

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

## 2019/02/18

### [Arrow functions don't really have a `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Arrow_functions_used_as_methods) (javascript)

> @andycunn

An arrow function does not have its own `this`. When you use `this` in an arrow function, the `this` value of the enclosing [lexical scope](https://spin.atomicobject.com/2014/10/20/javascript-scope-closures/) is used.

Because of this difference between arrow functions and `function` functions, arrow functions are best suited for non-method functions (functions that are not part of a class).

#### Example

As stated previously, arrow function expressions are best suited for non-method functions. Let's see what happens when we try to use them as methods:

```javascript
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log(this.i, this);
  }
}


obj.b(); // prints undefined, Window {...} (or the global object, which is the closest enclosing scope)

obj.c(); // prints 10, Object {...}
```

#### Reference

* [MDN Arrow Function docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this)
* [`arrow function expressions are best suited for non-method functions`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Arrow_functions_used_as_methods)

### Hooks are great, but they probably aren't worth a full transition yet

> @daveymeyer

This line from the documentation straightforward enough:

> Hooks don’t work inside classes — they let you use React without classes.

Cool, so use hooks in a function component. Everything seems to be working great when testing the component locally. But when inserted into a production environment, the terrifying 

> Hooks can only be called inside the body of a function component.

error is seen. In my case, this was due to the fact that Netlify CMS is using an older version of React and [does not yet support hooks](https://github.com/netlify/netlify-cms/issues/2026) for custom CMS components. So even though the code I had written was hook-complient, it did not work when combined with the rest of the ecosystem.

But all is not lost. I attempted to refactor my CMS widget to use hooks because I had created a confusing mess of nested components. Using hooks, the components seemed to be much cleaner:

```javascript
// With Hooks
export const SliderComponent = props => {
  const [values, setValues] = useState([33, 66]);

  const handleChange = value => {
    ...
  };

  return (
    ...
    <Slider values={values} handleChange={handleChange} />
  );
};
```

After realizing that hooks would not work with the current Netlify CMS version, I had to update my refactored components to once again use `recompose`. This was quite trivial. And the result was almost just as clean. So even though I probably did and am still missing some obvious simplifications/improvements, this process showed me the power of approaching a problem differently. By trying to apply hooks, a concept that seemed more intuitive on the surface, I better understood more general approaches for structuring and combining components. So that's pretty cool.

#### References

* [The Netlify CMS bug](https://github.com/netlify/netlify-cms/issues/2026)
* [Hooks don't work in classes](https://reactjs.org/docs/hooks-overview.html#but-what-is-a-hook)

## 2019/02/19

### You can use multiple github accounts with multiple SSH keys in same environment (git, ssh)

> @andycunn

I have 2 github accounts. My work account and my personal account. In the past, i've had trouble working 
with both accounts on one laptop. This is mainly because my personal account has an old SSH-key created 
on a different laptop.

I don't want to add both SSH keys to both accounts on github, so on my work laptop, i used to use HTTPS git 
with my personal account and SSH git with my work account. This got super annoying so i figured out how to
use multiple git-ssh keys on one environment.

Basically, you need both ssh keys, and a modified ssh config.

#### Walkthrough

##### SSH config

assuming i have 2 ssh keys, one for work, and one for personal...

```
Personal key: `id_personal`/`id_personal.pub`
Work key: `id_work`/`id_work.pub`
```

... this is my `~/.ssh/config`

```bash
Host github-work
 HostName github.com
 AddKeysToAgent yes
 UseKeychain yes
 User git
 IdentityFile ~/.ssh/id_work

Host github-personal
 HostName github.com
 AddKeysToAgent yes
 UseKeychain yes
 User git
 IdentityFile ~/.ssh/id_personal
```

##### Cloning repos

```bash
# cloning using your personal account

$ git clone git@github-personal:personalandy/project.git 
$ cd project
$ git config user.name personalandy
$ git config user.email personalandy@gmail.com
```

... or you can use `ssh://` prototol, which skips the `git@` user...

```bash
# cloning using your work account

$ git clone ssh://github-work/workandy/project.git 
$ cd project
$ git config user.name workandy
$ git config user.email workandy@gmail.com
```

#### References

* https://medium.com/@trionkidnapper/ssh-keys-with-multiple-github-accounts-c67db56f191e
* https://gist.github.com/jexchan/2351996


### Email preheader hack

```html
<div style="display: none; max-height: 0px; overflow: hidden;">
        <!-- Preheader message here -->
    </div>
    <div style="display: none; max-height: 0px; overflow: hidden;">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
```

another treatment:

```html
        <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->

        <!-- Preview Text Spacing Hack : BEGIN -->

        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">

        &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; 

        </div>

        <!-- Preview Text Spacing Hack : END -->

```

The above code inserts non-breaking spaces and zero width non-joiner half-spaces in a visually hidden div. This is added to "theoretically" push content down so that the preheader text is not encroached on by the body copy, or worse, an alt-tag from an image.

#### References
https://litmus.com/blog/the-little-known-preview-text-hack-you-may-want-to-use-in-every-email

### Styling custom Netlify CMS widgets is confusing (javascript, netlify-cms, css)

> @daveymeyer

Netlify gives you the ability to extend their out of the box CMS widgets by adding your own. One option for doing this is registering custom React components to handle the `Control` (editing content) and the `Preview` for the custom datatype. The custom components are then registered using the [registerWidget](https://www.netlifycms.org/docs/custom-widgets/#registerwidget) extension on the global `CMS` object.

```javascript
CMS.registerWidget('experiment', Editor, Preview);
```

What isn't clear from this seemingly simple process, is the difference in how the two components are consumed and the implications that has on things like styles.

* The Editor (Control) Component

This component is loaded directly on the `/admin/collections/myWidget/new` page. Styles applied inline via `emotion` are correctly applied, but styles that rely on class names and stylesheets are missing. When Netlify consumes the component, it doesn't load the custom CSS without being explicitly told to. So the class names exist, but there are no styles to map to.

This issue can be resolved by explicitly providing the stylesheet to the Control widget. One way to do this is to load the stylesheet in the header of the component:

```javascript
const Editor = props => (
  <>
    <Helmet>
      <link rel="stylesheet" href="/admin/cms.css" />
    </Helmet>
    <SplitTestsControl {...props} />
  </>
);
```

Now when Netlify loads the component, all of the inline styles and the custom stylesheet styles are available and correctly applied.

* Preview Component

The Preview component is loaded in an iframe alongside the Control widget. The issue here is that the styles exist in the head of the page, but the iframe does not have access to those styles. So we need to explicitly inject the styles into the frame for consumption by our component:

```javascript
class CSSInjector extends React.Component {
  constructor() {
    super();
    const iframe = document.getElementsByTagName('iframe')[0];
    const iframeHead = iframe.contentDocument.head;
    this.cache = createCache({ container: iframeHead });
  }

  render() {
    return (
      <CacheProvider value={this.cache}>{this.props.children}</CacheProvider>
    );
  }
}

const Preview = props => (
  <CSSInjector>
    <SplitTestsPreview {...props} />
  </CSSInjector>
);
```

The `CSSInjector` takes the contents of the `head` and passes it to the iframe. So wrapping the Preview component in this injector gives us all of the missing styles.

#### References
* https://www.netlifycms.org/docs/custom-widgets/
* https://github.com/netlify/netlify-cms/issues/793
* https://github.com/netlify/netlify-cms/issues/793#issuecomment-457873402

## 2019-02-20

### Three Wins or Rule of 3 (productivity)

> @andycunn

I have a ton of shit to do, and it's often hard to focus on one for any amount of time without thinknig about one of the others. To-do lists don't really help because the amount of things i WANT to do grows faster than the amount of things 
i get done. 

The Three Wins technique is one of the simplest time-management techniques I've found, and seems to be working for 
me so far. The gist is this: 

> Essentially you define (and actually write down) what three things you want to get done. ... Wins can be defined for whatever timeframe you want (weekly, monthly, etc.).

#### Example

I use a Trello board with 3 color levels: this week (green), this month (yellow), this year (red).

![my board](./ScreenCapture%20at%20Thu%20Feb%2021%2010%3A37%3A51%20PST%202019.png)

Here's how i use the board:
* Start every day by figuring out what to focus on for the day.
* Test myself throughout the day – am I doing things that are actually getting me closer to my wins? 
* If new things come up, i ask myself if they align with my goals. If so, great. If not, i'll asses whether they deserve to be added as a future week/month/year win.


#### References

* [Getting Results the Agile Way: A Personal Results System for Work and Life](https://www.amazon.com/Getting-Results-Agile-Way-ebook/dp/B005X0MFD2)
* [Three Wins Technique Review - a Simple Productivity Hack to Deliver What Matters](http://dontcodetired.com/blog/post/Three-Wins-Technique-Review-a-Simple-Productivity-Hack-to-Deliver-What-Matters)
* [Rule of Three](https://alifeofproductivity.com/rule-of-three/)

## 2019-02-21

### Connecting the Netlify CMS Widget

> @daveymeyer

Creating a custom Netlify CMS widget has been more work than I expected. In retrospect, it pretty much makes sense. But the journey to figuring it out was longer than it should have been. As someone who likes to figure out how something works by "try this, see what happens", the iteration process was slow because I was waiting for deploy previews to test CMS.

As it turns out, you can test this locally quite easily. Netlify offers multiple backend options for your CMS, and one of them is for local testing:

```yml
backend:
  # for testing locally
  name: test-repo

  # for using git
  name: git-gateway
```

When you specify `test-repo`, you use an in-memory CMS. So there is no existing data, you can only "add" new data. This presented an interesting problem because I specifically wanted to avoid creating content via CMS. But we'll get back to that later.

For my initial POC, I was circumnavigating the `/admin` page altogether. I was simply displaying my widget on a random page with test data. This is how I tested the logic and styling of the widget. This involved keeping track of state within the widget. This worked fine with my test data, but once I started to consume the data from the git backend I ran into another issue. Netlify provides each of the two components, `Control` and `Preview`, with a prop called `value`. This is supposed to be the value of the CMS field being handled by the custom widget. But when I started to consume it, it was in an unexpected format. Instead of the expected array of objects:

```javascript
[
  {
    name: 'someName', value: 20
  },
  {
    name: 'otherName', value: 80
  }
]
```

I was seeing some strange construct of deeply nested objects that contained the data. @andycunn kindly pointed out that this was because Netlify was using `immutable-js` on their end to store state. To convert the data from their format, you can simply apply the `toJS` extension method to the data provided.

The final missing piece was replacing the "test data" and "component state" with only Netlify data. In a real CMS widget, Netlify is the source of state. They provide the current value and a way to update the current value. So instead of using test data as "input" and using that to set component state, I consumed the Netlify data and derived all of the needed data from that.

The next piece was handling changes to data. This was simply a matter of switching my change handler from updating my component state to reporting back the values to Netlify via the provided `onChange` callback (remembering to convert to to an immutable structure first with `fromJS`).

Now Netlify is the source of state for both components. The `Control` component is able to both display the current value as well as update the current value. The `Preview` component only shows the current value.

As mentioned above, I was still having issues testing this locally. Since I only wanted to modify existing data, I didn't have a good story around starting with no data. So I found a way to simulate Netlify's remote data store locally. Instead of using the `value` prop directly, I used a pseudo remote state by changing the input to test data again. This resulted accessing state the same way (via `value` and `handleChange`), but instead of using Netlify data I was using local data:

```
var testData = [
  { name: 'test1', percentage: 20 },
  { name: 'test2', percentage: 80 },
];

const getValue = props => {
  // how we would normally access Netlify data
  var raw = props.value ? props.value : '';
  return List.isList(raw) ? raw.toJS() : raw;

  // how we can use local test data
  return testData;
};

const handleChange = value => {
  var variants = getValue(props);

  variants.forEach((variant, index) => {
    variant.percentage = value[index];
  });
  props.onChange(fromJS(variants));
};
```

Because both `getValue` and `handleChange` are using the same data, this works whether you are using Netlify or your own test data. Dumb, but cool.

#### References

* https://immutable-js.github.io/immutable-js/docs/#/List/toJS
* https://github.com/netlify/netlify-cms/blob/master/packages/netlify-cms-widget-select/src/SelectControl.js
* https://www.netlifycms.org/docs/custom-widgets/
* https://www.netlifycms.org/docs/authentication-backends/
