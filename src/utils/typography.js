import Typography from 'typography';
import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from 'typography-breakpoint-constants';
import theme from 'typography-theme-fairy-gates';
import './global.css';

// https://github.com/KyleAMathews/typography.js#themes
const typography = new Typography({
  ...theme,
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
      color: '#007acc',
      textDecoration: 'none',
    },
    'a:hover,a:active': {
      boxShadow: '0 1px 0 0 currentColor',
      textDecoration: 'none',
    },
  }),
});

export default typography;

export const rhythm = typography.rhythm;
export const scale = typography.scale;
export const options = typography.options;
