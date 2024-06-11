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
        background_color: 'rgb(255 240 5)',
        display: 'standalone',
        icon: 'src/images/favicon.svg',
        name: 'I Know Where I’ve Been — A 2SLGBTQIA+ Historical Timeline',
        short_name: 'I Know Where I’ve Been — A 2SLGBTQIA+ Historical Timeline',
        start_url: '/',
        theme_color: 'rgb(163 147 246)',
      },
      resolve: 'gatsby-plugin-manifest',
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-svgr',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
  ],
  siteMetadata: {
    siteUrl: 'https://timeline.susworld.org',
    title: 'I Know Where I’ve Been — A 2SLGBTQIA+ Historical Timeline',
  },
};
