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
