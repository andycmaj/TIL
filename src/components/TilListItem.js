import React from 'react';
import toHumanDate from '../utils/toHumanDate';
import styled from '@emotion/styled';
import { rhythm } from '../utils/typography';
import { Link } from 'gatsby';

const Article = styled.article`
  margin-top: ${rhythm(2)};
  margin-bottom: ${rhythm(2)};

  h2 {
    margin: 0 0 ${rhythm(0.5)};
  }
`;

const TilListItem = ({ slug, title, subtitle, author: { name }, date }) => (
  <Article>
    <header>
      <small>
        {toHumanDate(date)} by {name}
      </small>
      <h2>
        <Link to={`/til/${slug}`}>{title}</Link>
      </h2>
    </header>
    <section>
      <p>{subtitle}</p>
    </section>
  </Article>
);

export default TilListItem;
