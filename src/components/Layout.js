import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../utils/theme';
import styled from '@emotion/styled';

import MetaData from './MetaData';
import Header from './Header';
import Footer from './Footer';

// import { StringsProvider } from '../utils/strings';
// import { FlagsProvider } from '../utils/featureFlags';

const Container = styled.div``;

const Main = styled.main`
  min-height: 400px;
`;

const Layout = ({ children, ...props }) => (
  <ThemeProvider theme={theme}>
    {/* <FlagsProvider>
      <StringsProvider> */}
    <Container>
      <MetaData {...props} />
      <Header />
      <Main>{children}</Main>
    </Container>
    {/* </StringsProvider>
    </FlagsProvider> */}
  </ThemeProvider>
);

export default Layout;
