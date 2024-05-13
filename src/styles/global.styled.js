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
    --line-color: rgb(255 240 5);
    --line-rounding: 160px;
    --line-weight: 12px;
    --bullet-size: calc(var(--line-weight) * 1.5);
    --article-gutter: 2ch;
  }

  * { box-sizing: border-box; }

  html {
    background-attachment: fixed;
    background-color: white;
    /* background-image: linear-gradient(
      to bottom right,
      rgb(213 144 233),
      rgb(181 251 171),
      rgb(36 255 244),
      rgb(162 142 255),
      rgb(213 144 233)
    );
    background-size: 100vw 100vh; */
    font-size: 16px;
  }

  body {
    color: black;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.3;
    margin: 0;
    padding: 0;
    position: relative;
    text-wrap: balance;

    &::before,
    &::after {
      content: "";
      position: fixed;
    }

    &::before {
      background-image: url("${background}");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: max(100vh, 100vw);
      inset: 0;
      z-index: 0;
    }

    &::after {
      background-image: url("${noise}");
      background-size: 200px 200px;
      inset: 0;
      opacity: 1;
      pointer-events: none;
      z-index: 1;
    }

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
