import styled, { css } from 'styled-components';

// Breakpoints
import breakpoints from '../lib/breakpoints';

export const Main = styled.main`
  margin: 0 auto;
  max-width: var(--max-app-width);
  min-height: 100vh;
  padding: var(--app-padding-y) 0;

  @media (${breakpoints.xs}) {
    padding: var(--app-padding-y) var(--app-padding-x-sm);
  }

  @media (${breakpoints.md}) {
    padding: var(--app-padding-y) var(--app-padding-x);
  }
`;

export const Grid = styled.div`
  box-shadow: 0 0 0 1px rgb(0 0 255/0.2);
  display: flex;
  inset: 0 var(--app-padding-x-sm);
  max-width: var(--max-app-width);
  pointer-events: none;
  position: absolute;
  z-index: 10;

  @media (${breakpoints.md}) {
    inset: 0 var(--app-padding-x);
  }

  @media (${breakpoints.xl}) {
    inset: 0 auto 0 50%;
    transform: translate3d(-50%, 0, 0);
    width: calc(var(--max-app-width) - var(--app-padding-x) * 2);
  }
`;

export const Column = styled.div`
  box-shadow: 0 0 0 0.5px rgb(0 0 255/0.4);
  flex-grow: 1;
`;

export const Timeline = styled.section`
  /* align-items: start; */
  display: flex;
  flex-direction: row;
  padding: 3px var(--app-padding-x-sm);
  position: relative;

  @media (${breakpoints.xs}) {
    box-shadow: none;
    flex-direction: column;
    padding: 0;
  }
`;

export const Row = styled.div`
  align-items: start;
  display: flex;
  box-shadow: inset 0 var(--line-weight) 0 var(--line-color);
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
  }

  &:first-of-type::after,
  &:last-of-type::after {
    border-top: solid var(--line-weight) var(--line-color);
    width: var(--app-padding-x);
  }

  &:first-of-type::after {
    inset: 0 100% auto auto;
  }

  @media (${breakpoints.xs}) {
    align-items: stretch;
    box-shadow: inset 0 var(--line-weight) 0 var(--line-color),
      inset 0 calc(var(--line-weight) * -1) 0 var(--line-color);

    & + & {
      margin-top: calc(var(--line-weight) * -1);
    }

    &:nth-of-type(1) {
      justify-content: end;
    }

    &::before {
      border-bottom: solid var(--line-weight) var(--line-color);
      border-top: solid var(--line-weight) var(--line-color);
      width: calc((var(--app-padding-x-sm) / 2) - (var(--line-weight) / 2));
    }

    &:nth-child(odd) {
      &::before {
        border-bottom-right-radius: var(--line-rounding);
        border-right: solid var(--line-weight) var(--line-color);
        border-top-right-radius: var(--line-rounding);
        inset: 0 auto 0 100%;
      }
    }

    &:nth-child(even) {
      &::before {
        border-bottom-left-radius: var(--line-rounding);
        border-left: solid var(--line-weight) var(--line-color);
        border-top-left-radius: var(--line-rounding);
        inset: 0 100% 0 auto;
      }
    }

    &:first-of-type::after,
    &:last-of-type::after {
      width: var(--app-padding-x-sm);
    }

    &:last-of-type:after {
      inset: 0 auto auto 100%;
    }

    &:last-of-type:is(:nth-child(even)):after {
      inset: auto auto 0 100%;
    }

    &:last-of-type:is(:nth-child(odd)):after {
      inset: auto 100% 0 auto;
    }
  }

  @media (${breakpoints.md}) {
    &::before {
      width: calc((var(--app-padding-x) / 2) - (var(--line-weight) / 2));
    }

    &:first-of-type::after,
    &:last-of-type::after {
      width: var(--app-padding-x);
    }
  }

  @media (${breakpoints.xl}) {
    &:first-of-type::after,
    &:last-of-type::after {
      width: calc(((100vw - var(--max-app-width)) / 2) + var(--app-padding-x));
    }
  }
`;

export const H3 = styled.h3`
  font-size: inherit;
  font-weight: 700;
  line-height: inherit;
  margin: 0;
  text-transform: uppercase;
`;

export const Article = styled.article`
  box-shadow: ${({ $debug }) => ($debug ? 'inset 0.5px 0 0 red, inset -0.5px 0 0 red' : 'none')};
  hyphens: auto;
  padding: calc(var(--line-weight) * 2) var(--article-gutter) calc(var(--line-weight) * 3) 0;
  position: relative;
  z-index: 1;
  width: 400px;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 1rem;
  }

  ${({ $callout }) =>
    $callout
      ? css`
          color: var(--callout-color);
          font-family: 'flood-std', sans-serif;
          font-size: 2.4rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1;
          /* mix-blend-mode: multiply; */
          padding-right: 1ch;
          word-break: break-word;

          @media (${breakpoints.xs}) {
            font-size: 1.5rem;
          }

          @media (${breakpoints.sm}) {
            font-size: 1.8rem;
          }

          @media (${breakpoints.md}) {
            font-size: 1.8rem;
          }

          @media (${breakpoints.lg}) {
            font-size: 2.1rem;
          }
        `
      : css`
          &::before {
            background-color: rgb(204 57 43);
            border-radius: 50%;
            content: '';
            height: var(--bullet-size);
            inset: calc((var(--bullet-size) - var(--line-weight)) / 2 * -1) auto auto 0;
            position: absolute;
            width: var(--bullet-size);
          }
        `}

  @media (${breakpoints.xs}) {
    flex-basis: ${({ $span }) => `calc(var(--column-width) * ${$span})`};
    width: auto;

    &:last-child {
      padding-right: 0;
    }
  }

  @media (${breakpoints.md}) {
    &:last-child {
      padding-right: var(--article-gutter);
    }
  }
`;

export const Logo = styled(Article)`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: calc(var(--line-weight) * 4) 0;
  position: relative;

  &::before {
    display: none;
  }

  & > svg {
    inset: 50% auto auto calc(var(--app-padding-x-sm) / 2 * -1);
    position: absolute;
    transform: translate3d(0, -50%, 0);
    width: calc(100% + (var(--app-padding-x-sm) / 2) - 36px);
  }

  @media (${breakpoints.md}) {
    & > svg {
      inset: 50% auto auto calc(var(--app-padding-x) / 2 * -1);
      width: calc(100% + (var(--app-padding-x) / 2) - 36px);
    }
  }
`;
