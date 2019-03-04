import React from 'react';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import TilListItem from '../components/TilListItem';

const Page = ({
  data: {
    allContentfulTil: { edges: pages },
  },
}) => (
  <Layout
    pageTitle="Today I Learned"
    pagePath="/"
    description="Stuff I learned one day"
  >
    <section style={{ textAlign: 'center' }}>
      <p>
        As software engineers, we figure out how to do lots of things every day.
      </p>
      <p>Writing them down helps us actually learn and remember.</p>
    </section>
    {pages.map(({ node }) => (
      <TilListItem key={node.slug} {...node} />
    ))}
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
