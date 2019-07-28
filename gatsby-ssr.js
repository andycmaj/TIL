import React from 'react';

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  console.log('========analytics======');
  // if (process.env.NODE_ENV !== `production`) {
  //   return null;
  // }

  setHeadComponents([
    <script
      key="autotrack-error-handler"
      dangerouslySetInnerHTML={{
        __html: `
      addEventListener('error', window.__e=function f(e){f.q=f.q||[];f.q.push(e)});
    `,
      }}
    />,
    <script
      key="autotrack-ga-loader"
      dangerouslySetInnerHTML={{
        __html: `
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      `,
      }}
    />,
  ]);
};
