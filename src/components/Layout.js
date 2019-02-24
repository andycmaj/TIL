import React from 'react';
import styled from '@emotion/styled';

import MetaData from './MetaData';
import Header from './Header';

// import { StringsProvider } from '../utils/strings';
// import { FlagsProvider } from '../utils/featureFlags';

const Container = styled.div``;

const Main = styled.main`
  min-height: 400px;
`;

const Layout = ({ children, ...props }) => (
  <Container>
    <MetaData {...props} />
    <Header />
    <Main>{children}</Main>
  </Container>
);

export default Layout;
