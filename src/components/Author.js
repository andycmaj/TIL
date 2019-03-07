import React from 'react';
import styled from '@emotion/styled';

const Container = styled.a`
  display: inline-block;
`;

const Avatar = styled.img`
  display: inline-block;
  height: 20px;
  margin: 0 5px;
  vertical-align: text-bottom;
`;

const Author = ({ withAvatar = false, name, avatarUrl, githubUrl }) => (
  <Container href={githubUrl}>
    {withAvatar && <Avatar alt={name} src={avatarUrl} />}
    <span>{name}</span>
  </Container>
);

export default Author;
