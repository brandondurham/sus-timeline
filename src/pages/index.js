/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import Markdown from 'react-markdown';
import { motion } from 'framer-motion';

// Styles
import GlobalStyle from '../styles/global.styled';
import * as Styled from '../styles/index.styled';

// Images
import { ReactComponent as Logo } from '../images/logo.inline.svg';

const transition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1],
};

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

  // Motion components
  const Article = useMemo(() => motion(Styled.Article), []);
  const Marker = useMemo(() => motion(Styled.Marker), []);

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
          {rows.map(({ entries, id }, rowIndex) => (
            <Styled.Row key={id}>
              {rowIndex === 0 && (
                <Styled.Logo $span={8}>
                  <Logo />
                </Styled.Logo>
              )}
              {entries.map(({ callout, columnSpan, content, id, label }, articleIndex) => (
                <Article $callout={callout} $debug={isGridVisible} $span={columnSpan} key={id} lang="en">
                  {isGridVisible ? <Styled.DebugColumn>{columnSpan}</Styled.DebugColumn> : null}
                  {!callout ? (
                    <Marker
                      initial={{ opacity: 0, scale: 2 }}
                      transition={{
                        ...transition,
                        delay: (articleIndex + rowIndex) * 0.03,
                      }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, scale: 1 }}
                    />
                  ) : null}
                  <motion.div
                    initial={{ opacity: 0, x: 42 }}
                    transition={{
                      ...transition,
                      delay: (articleIndex + rowIndex) * 0.03,
                    }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <Styled.H3>{label}</Styled.H3>
                    <Markdown>{content}</Markdown>
                  </motion.div>
                </Article>
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
