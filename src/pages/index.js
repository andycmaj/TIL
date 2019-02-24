import React from 'react';
import Layout from '../components/Layout';
import { graphql, Link } from 'gatsby';
import toHumanDate from '../utils/toHumanDate';
import styled from '@emotion/styled';
import { rhythm } from '../utils/typography';

const Article = styled.article`
  margin-top: ${rhythm(2)};
  margin-bottom: ${rhythm(2)};

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
    <section style={{ textAlign: 'center' }}>
      <p>
        As software engineers, we figure out how to do lots of things every day.
      </p>
      <p>Writing them down helps us actually learn and remember.</p>
    </section>
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
            <small>
              {toHumanDate(date)} by {name}
            </small>
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
    allContentfulTil(sort: { fields: [date], order: DESC }) {
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
