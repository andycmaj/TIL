import css from '@emotion/css';
import { whenAtLeast, whenAtMost, whenSmallerThan } from './media';
import { rhythm } from './typography';

const globalStyles = css`
  body.light {
    --textNormal: #3d3836;
    --textSelection: #ccd59d;
    --textTitle: #016c58;
    --textLink: #3650bd;
    --hr: hsla(0, 0%, 0%, 0.2);
    --inlineCode-bg: #f4e5b7;
    --inlineCode-text: #1a1a1a;
    --blockCode-bg: #3d3836;
    --body-bg: #f4e5b7;
  }

  body {
    background-color: var(--body-bg);
  }

  ::selection {
    background-color: var(--textSelection);
  }

  ul,
  ol {
    list-style-position: inside;
  }

  section td {
    border-bottom: none;
  }

  h2 {
    font-size: 3em;
  }

  h3 {
    font-size: 2em;
  }

  h4 {
    font-size: 1.5em;
  }

  h5 {
    font-size: 1em;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: var(--textTitle);
    font-weight: 700;
  }

  header,
  section > table,
  section > h4,
  section > h5,
  section > p,
  section > ul,
  section > ol,
  section > blockquote,
  pre[class*='language-'] {
    margin: 0 20px;

    ${whenAtLeast.tablet} {
      width: 700px;
      margin: 0 auto;
    }

    ${whenAtLeast.desktop} {
      width: 900px;
      margin: 0 auto;
    }
  }

  section > p {
    margin-top: 0;
    margin-bottom: ${rhythm(0.5)};

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .gatsby-highlight {
    margin-top: 1em;
  }

  section > h3,
  section > h4,
  section > h5 {
    margin-top: ${rhythm(2)};
    margin-bottom: ${rhythm(1)};
  }

  pre[class*='language-'] {
    ${whenSmallerThan.tablet} {
      margin-right: 0;
      min-width: 100%;
      float: left;
    }
  }

  section > blockquote {
    margin-top: 1rem;
    margin-bottom: 1rem;

    p {
      border-left: 0.25rem solid var(--blockCode-bg);
      margin-left: -1.25rem;
      padding-left: 1rem;
      font-style: italic;
    }
  }

  /**
 * Based on copypasta from Remy Bach and Sarah Drasner
 */
  code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    background: none;
    font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New,
      monospace;
    font-feature-settings: normal;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    margin-bottom: 0;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    overflow: auto;
    padding: 1em 0;
  }

  pre[class*='language-']::-moz-selection {
    /* Firefox */
    background: hsl(207, 4%, 16%);
  }

  pre[class*='language-']::selection {
    /* Safari */
    background: hsl(207, 4%, 16%);
  }

  /* Text Selection color */
  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection {
    text-shadow: none;
    background: hsla(0, 0%, 100%, 0.15);
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    background: var(--inlineCode-bg);
    color: var(--inlineCode-text);
    padding: 0.15em 0.2em 0.05em;
    white-space: normal;
  }

  .token.attr-name {
    color: #b7b8b9;
  }

  .token.script {
    color: #ffffff;
  }

  .token.comment {
    color: #aaa;
  }

  .token.string,
  .token.url,
  .token.char {
    color: #97c39b;
  }

  .token.variable {
    color: rgb(214, 222, 235);
  }

  .token.number {
    color: rgb(247, 140, 108);
  }

  .token.punctuation {
    color: #ffd700;
  }

  .token.class-name {
    color: rgb(255, 203, 139);
  }

  .token.keyword,
  .token.builtin,
  .token.constant,
  .token.function {
    color: #e1e09a;
  }

  .token.tag,
  .token.tag .token.punctuation,
  .token.operator {
    color: #c98f62;
  }

  .token.boolean {
    color: rgb(255, 88, 116);
  }

  .token.property {
    color: rgb(128, 203, 196);
  }

  .token.namespace {
    color: rgb(178, 204, 214);
  }

  pre[data-line] {
    padding: 1em 0 1em 3em;
    position: relative;
  }

  .gatsby-highlight-code-line {
    background-color: #353b4a;
    display: block;
    margin-right: -1.25em;
    margin-left: -1.25rem;
    padding-right: 1em;
    padding-left: 1rem;
    border-left: 0.25rem solid #ffd700;

    ${whenAtMost.desktop} {
      margin-right: -20%;
    }
  }

  .gatsby-highlight {
    margin-bottom: 1.75rem;
    background: var(--blockCode-bg);
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }

  .gatsby-highlight pre[class*='language-'] {
    overflow: visible;
  }
`;

export default globalStyles;
