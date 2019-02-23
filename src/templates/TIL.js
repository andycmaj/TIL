import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

export default function Template({
  data: {
    contentfulTil: {
      title,
      subtitle,
      author: { name: authorName },
      summary: {
        childMarkdownRemark: { html: summary },
      },
      example: {
        childMarkdownRemark: { html: example },
      },
      references: {
        childMarkdownRemark: { html: references },
      },
      tags,
    },
  },
  location: { pathname },
}) {
  return (
    <Layout pageTitle={title} pagePath={pathname} description={subtitle}>
      <div>
        <h1>{title}</h1>
        <p>By: {authorName}</p>
        <p>
          {tags.map(tag => (
            <span>{tag} </span>
          ))}
        </p>
        <p dangerouslySetInnerHTML={{ __html: summary }} />
        <h2>Example</h2>
        <section dangerouslySetInnerHTML={{ __html: example }} />
        <h2>References</h2>
        <section dangerouslySetInnerHTML={{ __html: references }} />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulTil(slug: { eq: $slug }) {
      title
      subtitle
      author {
        name
      }
      summary {
        childMarkdownRemark {
          html
        }
      }
      example {
        childMarkdownRemark {
          html
        }
      }
      references {
        childMarkdownRemark {
          html
        }
      }
      tags
    }
  }
`;
