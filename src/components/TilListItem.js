import React from 'react';
import toHumanDate from '../utils/toHumanDate';
import styled from '@emotion/styled';
import { rhythm } from '../utils/typography';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Author from './Author';

const Article = styled.article`
  margin-top: ${rhythm(2)};
  margin-bottom: ${rhythm(2)};
`;

const LinkContainer = styled.p`
  font-size: 2em;
  margin: 0;
`;

const TilListItem = ({ slug, title, subtitle, author, date }) => (
  <Article>
    <header>
      <small>
        {toHumanDate(date)} by <Author {...author} />
      </small>
      <LinkContainer>
        <AniLink swipe top="exit" direction="left" to={`/til/${slug}`}>
          {title}
        </AniLink>
      </LinkContainer>
    </header>
    <section>
      <p>{subtitle}</p>
    </section>
  </Article>
);

export default TilListItem;
