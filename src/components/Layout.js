import React from 'react';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';

import MetaData from './MetaData';
import Header from './Header';
import globalStyles from '../utils/globalStyles';

const Container = styled.div`
  background-color: var(--body-bg);
`;

const Main = styled.main``;

const Layout = ({ children, ...props }) => (
  <Container>
    <MetaData {...props} />
    <Global styles={globalStyles} />
    <Header />
    <Main>{children}</Main>
  </Container>
);

export default Layout;
