import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import styled from '@emotion/styled';
import toHumanDate from '../utils/toHumanDate';
import { FaTag } from 'react-icons/fa';
import { whenAtLeast, whenSmallerThan } from '../utils/media';
import { Link } from 'gatsby';

const Tags = styled.small`
  ${whenSmallerThan.tablet} {
    display: none;
  }

  ${whenAtLeast.tablet} {
    float: right;
    margin-top: 4px;
  }

  a {
    margin: 0 5px;
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
      example,
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
            {tags.map(tag => (
              <Link key={tag} to={`/tag/${tag}`}>
                {tag}
              </Link>
            ))}
          </Tags>
          <h2>{title}</h2>
        </header>
        <section dangerouslySetInnerHTML={{ __html: summary }} />
        {example && (
          <>
            <header>
              <h3>Example</h3>
            </header>
            <section
              dangerouslySetInnerHTML={{
                __html: example.childMarkdownRemark.html,
              }}
            />
          </>
        )}
        <header>
          <h3>References</h3>
        </header>
        <section dangerouslySetInnerHTML={{ __html: references }} />
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
