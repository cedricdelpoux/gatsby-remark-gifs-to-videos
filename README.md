# gatsby-remark-gifs-to-videos

[![Npm version][badge-npm]][npm]
[![Npm downloads][badge-npm-dl]][npm]
[![MIT license][badge-licence]](./licence.md)
[![PRs welcome][badge-prs-welcome]](#contributing)

`gatsby-remark-gifs-to-videos` is a [Gatsby](https://www.gatsbyjs.org/) [remark](https://remark.js.org/) plugin to transform animated GIF to autoplay videos.

The main purpose is to [improve performances](https://www.smashingmagazine.com/2018/11/gif-to-video/).

## Usage

1. Download `gatsby-remark-gifs-to-videos` from the NPM registry:

```shell
yarn add gatsby-remark-gifs-to-videos
```

3. Add the plugin in your `gatsby-config.js` file

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-gifs-to-videos",
          //
          // --- Optional ---
          // "gatsby-remark-copy-linked-files",
        ],
      },
    },
  ],
}
```

| Option    | Required | Type   | Default |
| --------- | -------- | ------ | ------- |
| maxHeight | `false`  | Number | 480     |
| maxWidth  | `false`  | Number | 680     |

## Related

[Improve Animated GIF Performance With HTML5 Video](https://www.smashingmagazine.com/2018/11/gif-to-video/)

[badge-npm]: https://img.shields.io/npm/v/gatsby-remark-gifs-to-videos.svg?style=flat-square
[badge-npm-dl]: https://img.shields.io/npm/dt/gatsby-remark-gifs-to-videos.svg?style=flat-square
[badge-licence]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[badge-prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[npm]: https://www.npmjs.org/package/gatsby-remark-gifs-to-videos
[github-issue]: https://github.com/cedricdelpoux/gatsby-remark-gifs-to-videos/issues/new
