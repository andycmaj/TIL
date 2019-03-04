import React from 'react';
import { graphql } from 'gatsby';
import TilListItem from '../components/TilListItem';
import Layout from '../components/Layout';
import flattenTils from '../utils/flattenTils';
import { FaTag } from 'react-icons/fa';
import styled from '@emotion/styled';

const TagIcon = styled(FaTag)`
  vertical-align: middle;
  margin-right: 0.25em;
`;

const TagIndexPage = ({
  pageContext: { tag, pages },
  data: {
    allContentfulTil: { edges },
  },
}) => {
  const allTils = flattenTils(edges);

  return (
    <Layout
      pageTitle={`All ${tag} TILs`}
      pagePath="/"
      description="Stuff I learned one day"
    >
      <header>
        <h2>
          <TagIcon />
          {tag}
        </h2>
      </header>
      {pages.map(({ slug }) => {
        const til = allTils[slug];

        return <TilListItem key={slug} {...til} />;
      })}
    </Layout>
  );
};

export default TagIndexPage;

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
