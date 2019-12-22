import React from 'react';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import TilListItem from '../components/TilListItem';
import styled from '@emotion/styled';
import { whenAtLeast, whenSmallerThan } from '../utils/media';

const Intro = styled.section`
  position: relative;

  & > p {
    margin-bottom: 0;
  }
`;

const Badges = styled.div`
  ${whenAtLeast.tablet} {
    position: absolute;
    top: -3em;
    right: 5em;
  }

  ${whenSmallerThan.tablet} {
    text-align: center;
    iframe {
      margin-left: 30px;
    }
  }
`;

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
    <Intro style={{ textAlign: 'center' }}>
      <Badges>
        <iframe
          title="github-stars"
          src="https://ghbtns.com/github-btn.html?user=andycmaj&repo=TIL&type=star&count=true"
          frameborder="0"
          scrolling="0"
          width="100px"
          height="20px"
        ></iframe>
      </Badges>
      <p>Software developers learn one million things every day.</p>
      <p>
        Then we forget those things the next day while we're learning one
        million other things.
      </p>
      <p>
        Sometimes it's nice to slow down for a minute and reflect on a few of
        those things.
      </p>
    </Intro>
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
