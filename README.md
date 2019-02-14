# TIL

Repository for tracking what we're learning

## 2019/02/13

### [Barreling](https://basarat.gitbooks.io/typescript/docs/tips/barrel.html) (javascript, typescript)

> @andycunn

The practice of rolling up a bunch of ES modules in a directory into a single group of named exports, using `index.js`.

#### Example

```javascript
// demo/index.ts
export * from './foo'; // re-export all of its exports
export * from './bar'; // re-export all of its exports
export * from './baz'; // re-export all of its exports
```

```javascript
import { Foo, Bar, Baz } from '../demo'; // demo/index.ts is implied
```

#### Reference

- [Blog](https://medium.com/@klauskpm/do-a-barrel-export-aa5b79b76b05)
- [Typescript documentation](https://basarat.gitbooks.io/typescript/docs/tips/barrel.html)
