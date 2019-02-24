import React from 'react';
import Layout from '../components/Layout';
import { graphql, Link } from 'gatsby';
import toHumanDate from '../utils/toHumanDate';
import styled from '@emotion/styled';
import { rhythm } from '../utils/typography';

const Article = styled.article`
  width: 600px;
  margin: ${rhythm(2)} auto;

  h2 {
    margin: 0 0 ${rhythm(0.5)};
  }
`;

const Page = ({
  data: {
    allContentfulTil: { edges: pages },
  },
}) => (
  <Layout pageTitle="Home" pagePath="/" description="Stuff I learned one day">
    {pages.map(
      ({
        node: {
          slug,
          title,
          subtitle,
          author: { name },
          date,
        },
      }) => (
        <Article>
          <header>
            <small>{toHumanDate(date)} by Andy</small>
            <h2>
              <Link to={`til/${slug}`}>{title}</Link>
            </h2>
          </header>
          <p>{subtitle}</p>
        </Article>
      )
    )}
  </Layout>
);

export default Page;

export const pageQuery = graphql`
  {
    allContentfulTil {
      edges {
        node {
          slug
          title
          subtitle
          date
          author {
            name
          }
        }
      }
    }
  }
`;
