import React from 'react';
import Link from 'gatsby-link';
import styled from '@emotion/styled';

const Header = styled.header``;

const SiteTitle = styled.h1`
  text-align: center;
  padding-top: 0.5em;
`;

export default props => (
  <Header>
    <SiteTitle>
      <Link to="/">The Daily TIL</Link>
    </SiteTitle>
  </Header>
);
