/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  plugins: [
    {
      options: {
        apiToken: '0bd1e9bb656e42cbe430eb971c8ea9',
      },
      resolve: 'gatsby-source-datocms',
    },
    {
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
      resolve: 'gatsby-plugin-react-svg',
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
  ],
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'SUS Timeline',
  },
};
