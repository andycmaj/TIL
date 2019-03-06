import { mergeAll, map, prop, compose } from 'ramda';

// [{ node: { slug: "entry-1", title: "entry one", ... } }] => { "entry-1": { title: "entry one", ... } }
export default compose(
  // // [{ slug1: entry1 }, { slug2: entry2 }] => { slug1: entry1, slug2: entry2 }
  // mergeAll,
  // // [entry] => [{ slug: entry }]
  // map(node => ({
  //   [node.slug]: node,
  // })),
  // [{ node: { ... } }, { node: { ... } }] => [{ ... }. { ... }]
  map(prop('node'))
);
