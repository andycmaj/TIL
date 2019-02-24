import { mapObjIndexed } from 'ramda';
import {
  LARGER_DISPLAY_WIDTH,
  LARGE_DISPLAY_WIDTH,
  DEFAULT_WIDTH,
  TABLET_WIDTH,
  MOBILE_WIDTH,
} from 'typography-breakpoint-constants';

export const breakPoints = {
  larger: 1600,
  large: 1280,
  desktop: 980,
  tablet: 768,
  mobile: 480,
};

export const whenAtLeast = mapObjIndexed(
  width => `@media (min-width: ${width}px)`,
  breakPoints
);

export const whenAtMost = mapObjIndexed(
  width => `@media (max-width: ${width}px)`,
  breakPoints
);

export const whenSmallerThan = mapObjIndexed(
  width => `@media (max-width: ${width - 1}px)`,
  breakPoints
);
