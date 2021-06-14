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
            // resolve: "gatsby-remark-gifs-to-videos",
            resolve: require.resolve(`..`),
            options: {
              autoplay: false,
              loop: false,
              controls: true,
              preload: "metadata",
            },
          },
        ],
      },
    },
    "gatsby-plugin-slug",
  ],
}
