import React from 'react';
import Helmet from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        keywords
        description
        siteUrl
      }
    }
  }
`;

const MetaData = ({ pageTitle, pagePath }) => {
  const {
    site: {
      siteMetadata: { description, siteUrl, keywords, title },
    },
  } = useStaticQuery(query);

  var base = {
    target: '_blank',
    // https://www.netlify.com/docs/continuous-deployment/#build-environment-variables
    href: process.env.DEPLOY_PRIME_URL,
  };

  return (
    <Helmet base={base} title={pageTitle} titleTemplate={`%s | ${title}`}>
      <html lang="en" />

      <link rel="canonical" href={`${siteUrl}${pagePath}`} />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />
      {/* <meta property="og:url" content={`${siteUrl}${pagePath}`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={`${siteUrl}/favicon.ico`} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" /> */}
      {/* <meta property="og:title" content={pageTitle} /> */}
      {/* <meta property="og:description" content={description} /> */}

      {/* <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitter} /> */}
    </Helmet>
  );
};

export default MetaData;
