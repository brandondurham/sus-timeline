// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from 'react';
import { Fragment } from 'react';

// Styles
import GlobalStyle from '../styles/global.styled';
import * as Styled from '../styles/index.styled';

// Content
import Content from '../content';

const IndexPage = () => {
  const [isGridVisible, setIsGridVisible] = useState(false);
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
          {Content.map((row) => (
            <Styled.Row key={`row-${row[0].id}`}>
              {row.map(({ columns = 4, content, id, label, type }) => (
                <Styled.Article $debug={isGridVisible} $span={columns} $type={type} key={id} lang="en">
                  <Styled.H3>{label}</Styled.H3>
                  {content}
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
    <title>Home Page</title>
    <link href="https://use.typekit.net/nhe5ogp.css" rel="stylesheet"></link>
  </Fragment>
);
