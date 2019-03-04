import { mergeAll, map, prop, compose } from 'ramda';

// [{ node: { base: "image.jpg", childImageSharp: { fluid } } }] => { "image.jpg": fluid }
export default compose(
  // [{ base1: fluid1 }, { base2: fluid2 }] => { base1: fluid1, base2: fluid2 }
  mergeAll,
  // { base, childImageSharp: { fluid } } => { base: fluid }
  map(node => ({
    [node.slug]: node,
  })),
  // [{ node: { ... } }, { node: { ... } }] => [{ ... }. { ... }]
  map(prop('node'))
);
