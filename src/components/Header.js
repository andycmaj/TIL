import React from 'react';
import Link from 'gatsby-link';
import styled from '@emotion/styled';

const SiteTitle = styled.h1`
  text-align: center;
  padding-top: 0.5em;
`;

const Header = props => (
  <header>
    <SiteTitle>
      <Link to="/">The Daily TIL</Link>
    </SiteTitle>
  </header>
);

export default Header;
