import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import styled from '@emotion/styled';
import toHumanDate from '../utils/toHumanDate';
import { FaTag } from 'react-icons/fa';
import { whenAtLeast, whenSmallerThan } from '../utils/media';

const Tags = styled.small`
  ${whenSmallerThan.tablet} {
    display: none;
  }

  ${whenAtLeast.tablet} {
    float: right;
  }
`;

const TagIcon = styled(FaTag)`
  vertical-align: middle;
  margin-right: 0.25em;
`;

export default function Template({
  data: {
    contentfulTil: {
      title,
      subtitle,
      date,
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
      <article>
        <header>
          <small>
            {toHumanDate(date)} by {authorName}
          </small>
          <Tags>
            <TagIcon />
            {tags.join(', ')}
          </Tags>
          <h2>{title}</h2>
        </header>
        <section dangerouslySetInnerHTML={{ __html: summary }} />
        <header>
          <h3>Example</h3>
        </header>
        <div dangerouslySetInnerHTML={{ __html: example }} />
        <header>
          <h3>References</h3>
        </header>
        <section>
          <div dangerouslySetInnerHTML={{ __html: references }} />
        </section>
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulTil(slug: { eq: $slug }) {
      title
      subtitle
      date
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
