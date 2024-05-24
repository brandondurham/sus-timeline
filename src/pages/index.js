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
import opengraph from '../images/opengraph.png';

const transition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1],
};

const MAX_COLUMNS_PER_ROW = 16;

const IndexPage = ({ data = {} }) => {
  const { entries } = data.allDatoCmsTimeline.edges[0].node;

  const getDefinedRowRecords = useCallback(
    (rowStartId = 0, recordStartId = 0) => {
      let columns = [];
      let columnCount = 0;
      let rowId = rowStartId;
      for (let i = recordStartId; i < entries.length; i++) {
        columnCount += entries[i].columnSpan;
        if ((rowId === 0 && columnCount > 8) || (rowId > 0 && columnCount > MAX_COLUMNS_PER_ROW)) {
          rowId += 1;
          break;
        }
        columns.push(entries[i]);
      }
      return columns;
    },
    [entries],
  );

  const getAllRowRecords = useMemo(() => {
    let rows = [];
    let rowIndex = 0;
    let columnIndex = 0;
    while (columnIndex < entries.length) {
      const records = getDefinedRowRecords(rowIndex, columnIndex);
      rows.push(records);
      rowIndex += 1;
      columnIndex = columnIndex + records.length;
    }
    return rows;
  }, [entries.length, getDefinedRowRecords]);

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

  // Motion components
  const Article = useMemo(() => motion(Styled.Article), []);
  const Marker = useMemo(() => motion(Styled.Marker), []);

  return (
    <Fragment>
      <GlobalStyle />
      <Styled.Main>
        {isGridVisible && (
          <Styled.Grid>
            {[...Array(MAX_COLUMNS_PER_ROW).keys()].map((_, index) => (
              <Styled.Column key={`column-${index}`} />
            ))}
          </Styled.Grid>
        )}
        <Styled.Timeline>
          {getAllRowRecords.map((entries, rowIndex) => (
            <Styled.Row key={`row-${entries[0].id}`}>
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
                      initial={{ opacity: 0, x: 42 }}
                      transition={{
                        ...transition,
                        delay: (articleIndex + rowIndex) * 0.03,
                      }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, x: 0 }}
                    />
                  ) : null}
                  <motion.div
                    initial={{ opacity: 0, x: 42 }}
                    transition={{
                      ...transition,
                      delay: (articleIndex + rowIndex) * 0.03 + 0.1,
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
      <Styled.Footer>
        Copyright &copy; {new Date().getFullYear()} <a href="https://susworld.org">SUS</a>. All rights
        reserved 501(c)(3) nonprofit.
      </Styled.Footer>
    </Fragment>
  );
};

export default IndexPage;

export const Head = () => (
  <Fragment>
    <title>I Know Where I’ve Been — A 2SLGBTQIA+ Historical Timeline</title>
    <link href="https://use.typekit.net/nhe5ogp.css" rel="stylesheet"></link>
    <meta content="I Know Where I’ve Been — A 2SLGBTQIA+ Historical Timeline" property="og:title" />
    <meta content="https://sustimeline.netlify.app/" property="og:url" />
    <meta content={opengraph} property="og:image" />
    <meta content="article" property="og:type" />
    <meta content="" property="og:description" />
    <meta content="en_GB" property="og:locale" />
  </Fragment>
);

export const query = graphql`
  query MyQuery {
    allDatoCmsTimeline {
      edges {
        node {
          entries {
            callout
            content
            columnSpan
            id
            label
          }
        }
      }
    }
  }
`;
