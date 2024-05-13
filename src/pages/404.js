// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'gatsby';

const NotFoundPage = () => {
  return (
    <main>
      Not found. <Link to="/">Go home</Link>.
    </main>
  );
};

export default NotFoundPage;

export const Head = () => <title>Not found</title>;
