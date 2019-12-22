import React from 'react';
import { graphql } from 'gatsby';
import TilListItem from '../components/TilListItem';
import Layout from '../components/Layout';
import flattenTils from '../utils/flattenTils';
import { FaTag } from 'react-icons/fa';
import styled from '@emotion/styled';
import { contains } from 'ramda';

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
  // Use allTills as that's already sorted.
  const flattenedTils = flattenTils(edges);
  const indexedTils = flattenedTils.filter(til => contains(til.slug, pages));

  return (
    <Layout
      pageTitle={`All ${tag} TILs`}
      pagePath="/"
      description="Stuff I learned one day"
    >
      <header>
        <h3>
          <TagIcon />
          {tag}
        </h3>
      </header>
      {indexedTils.map(til => (
        <TilListItem key={til.slug} {...til} />
      ))}
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
            avatarUrl
            githubUrl
          }
        }
      }
    }
  }
`;
