import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from '@emotion/styled';

const Header = styled.header``;

const SiteTitle = styled.h1`
  text-align: center;
  padding-top: 0.5em;
`;

export default props => (
  <Header>
    <SiteTitle>
      <AniLink top="entry" direction="right" swipe to="/">
        The Daily TIL
      </AniLink>
    </SiteTitle>
  </Header>
);
