import Typography from 'typography';
import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from 'typography-breakpoint-constants';
import theme from 'typography-theme-fairy-gates';

// https://github.com/KyleAMathews/typography.js#themes
const typography = new Typography({
  ...theme,
  headerWeight: '400',
  googleFonts: [
    {
      name: 'Work Sans',
      styles: ['400', '600'],
    },
    {
      name: 'Quattrocento Sans',
      styles: ['400', '400i', '700'],
    },
  ],
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    [TABLET_MEDIA_QUERY]: {
      // Make baseFontSize on mobile 17px.
      html: {
        fontSize: `${(17 / 16) * 100}%`,
      },
    },
    [MOBILE_MEDIA_QUERY]: {
      // Make baseFontSize on mobile 16px.
      html: {
        fontSize: `${(16 / 16) * 100}%`,
      },
    },
    a: {
      color: 'var(--textLink)',
      textDecoration: 'none',
    },
    'a:hover,a:active': {
      boxShadow: '0 2px 0 0 currentColor',
      textDecoration: 'none',
    },
    'h1 a': {
      color: 'inherit',
    },
    'h2 a, h3 a, h4 a, h5 a, h6 a': {
      color: 'var(--textLink)',
    },
    h3: {
      marginTop: rhythm(1),
    },
  }),
});

export default typography;

export const rhythm = typography.rhythm;
export const scale = typography.scale;
export const options = typography.options;
