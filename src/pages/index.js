import React from 'react';
import Layout from '../components/Layout';
import { graphql, Link } from 'gatsby';
import toHumanDate from '../utils/toHumanDate';

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
        <article>
          <small>{toHumanDate(date)} by Andy</small>
          <header>
            <Link to={`til/`}>{title}</Link>
          </header>
          <p>{subtitle}</p>
        </article>
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
