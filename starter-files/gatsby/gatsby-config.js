import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `https://www.gatsby.pizza.com`,
    description: `best pizza in big bear lake ca`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      // this is the name of the plugin
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '6o783dcc',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
