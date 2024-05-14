/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import Markdown from 'react-markdown';

// Styles
import GlobalStyle from '../styles/global.styled';
import * as Styled from '../styles/index.styled';

// Images
import Logo from '../images/logo.inline.svg';

const IndexPage = ({ data = {} }) => {
  const [isGridVisible, setIsGridVisible] = useState(false);

  const rows = useMemo(() => {
    if (data.allDatoCmsRow && data.allDatoCmsRow.edges) {
      return data.allDatoCmsRow.edges.map(({ node }) => ({
        entries: node.entries,
        id: node.id,
      }));
    }
    return [];
  }, [data]);

  const handleKeyDown = useCallback(
    (event) => {
      const wasAnyKeyPressed = ['Escape'].some((key) => event.key === key);
      if (wasAnyKeyPressed) {
        setIsGridVisible(!isGridVisible);
      }
    },
    [isGridVisible],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Fragment>
      <GlobalStyle />
      <Styled.Main>
        {isGridVisible && (
          <Styled.Grid>
            {[...Array(16).keys()].map((_, index) => (
              <Styled.Column key={`column-${index}`} />
            ))}
          </Styled.Grid>
        )}
        <Styled.Timeline>
          {rows.map(({ entries, id }, index) => (
            <Styled.Row key={id}>
              {index === 0 && (
                <Styled.Logo $span={8}>
                  <Logo />
                </Styled.Logo>
              )}
              {entries.map(({ callout, columnSpan, content, id, label }) => (
                <Styled.Article
                  $callout={callout}
                  $debug={isGridVisible}
                  $span={columnSpan}
                  key={id}
                  lang="en"
                >
                  <Styled.H3>{label}</Styled.H3>
                  <Markdown>{content}</Markdown>
                </Styled.Article>
              ))}
            </Styled.Row>
          ))}
        </Styled.Timeline>
      </Styled.Main>
    </Fragment>
  );
};

export default IndexPage;

export const Head = () => (
  <Fragment>
    <title>I Know Where I’ve Been — A 2SLGBTQIA+ Historical Timeline</title>
    <link href="https://use.typekit.net/nhe5ogp.css" rel="stylesheet"></link>
  </Fragment>
);

export const query = graphql`
  query MyQuery {
    allDatoCmsRow(sort: { position: ASC }) {
      edges {
        node {
          entries {
            content
            callout
            columnSpan
            id
            label
          }
          id
        }
      }
    }
  }
`;
