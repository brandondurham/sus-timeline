import { createGlobalStyle } from 'styled-components';

// Breakpoints
import breakpoints from '../lib/breakpoints';

// Images
import background from '../images/pride-background.png';
import noise from '../images/noise.png';

const GlobalStyle = createGlobalStyle`
  :root {
    --max-columns: 16;
    --max-app-width: 2000px;
    --column-width: calc((1 / var(--max-columns)) * 100%);
    --app-padding-x: 200px;
    --app-padding-x-sm: calc(var(--app-padding-x) / 4);
    --app-padding-x-md: calc(var(--app-padding-x) / 2);
    --app-padding-y: 42px;
    --callout-color: rgb(163 147 246);
    --line-color: rgb(255 240 5);
    --line-rounding: 160px;
    --line-weight: 12px;
    --bullet-size: calc(var(--line-weight) * 1.5);
    --article-gutter: 2ch;
  }

  * { box-sizing: border-box; }

  html {
    background-color: white;
    font-size: 16px;
  }

  body {
    background-attachment: fixed;
    background-image: url("${noise}"), url("${background}");
    background-repeat: repeat, no-repeat;
    background-size: 200px 200px, 100% 100%;
    color: black;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.3;
    margin: 0;
    padding: 0;
    position: relative;
    text-wrap: balance;

    /* &::before {
      background-image: url("${noise}"), url("${background}");
      background-attachment: fixed, fixed;
      background-repeat: repeat, no-repeat;
      background-size: 200px 200px, 100% 100%;
      content: "";
      height: max(100vh, 100vw);
      inset: 0;
      pointer-events: none;
      position: fixed;
      z-index: 0;
    } */

    @media (${breakpoints.xs}) {
      font-size: 0.85rem;
    }

    @media (${breakpoints.sm}) {
      font-size: 1rem;
    }
  }

  ::selection {
    background: var(--line-color);
  }
`;

export default GlobalStyle;
