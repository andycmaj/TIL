import React from 'react';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';

import MetaData from './MetaData';
import Header from './Header';
import globalStyles from '../utils/globalStyles';

// import { StringsProvider } from '../utils/strings';
// import { FlagsProvider } from '../utils/featureFlags';

const Container = styled.div``;

const Main = styled.main``;

const Layout = ({ children, ...props }) => (
  <Container>
    <MetaData foo={false} {...props} />
    <Global styles={globalStyles} />
    <Header />
    <Main>{children}</Main>
  </Container>
);

export default Layout;
