module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            // resolve: "gatsby-remark-gifs",
            resolve: require.resolve(`..`),
          },
        ],
      },
    },
    "gatsby-plugin-slug",
  ],
}
