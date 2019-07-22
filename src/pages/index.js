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
      <p>Software developers learn one million things every day.</p>
      <p>
        Then we forget those things the next day while we're learning one
        million other things.
      </p>
      <p>
        Sometimes it's nice to slow down for a minute and reflect on a few of
        those things.
      </p>
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
            avatarUrl
            githubUrl
          }
        }
      }
    }
  }
`;
