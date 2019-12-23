import React from 'react';

// auto track routes via `page()`
import('./src/analytics/base.js').then(analytics => analytics.init());

export const onRouteUpdate = ({ location }) => {};

export const onClientEntry = () => {
  if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React);
  }
};

// export const wrapPageElement = ({ element, props }) => {
//   // props provide same data to Layout as Page element will get
//   // including location, data, etc - you don't need to pass it
//   const {
//     location: { pathname, search, href },
//     pageContext: {
//       title = 'Today I Learned',
//       description = 'Stuff I learned one day',
//     },
//   } = props;

//   if (!window.analytics || typeof window.analytics.page !== 'function') {
//     console.warn('Unable to locate analytics.js');
//     return;
//   }

//   window.analytics.page({
//     path: pathname,
//     referrer: document.referrer,
//     search: search,
//     title: title,
//     url: href,
//   });

//   return element;
// };
