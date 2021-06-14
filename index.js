const select = require(`unist-util-select`)

const isRelativeUrl = require(`is-relative-url`)
const _ = require(`lodash`)

const {transformGifToVideo} = require(`./utils/transform-gif-to-video`)
const {defaults} = require(`./utils/options`)
const {getVideoHtml} = require(`./utils/get-video-html`)
const {getGifNode} = require(`./utils/get-gif-node`)

module.exports = (
  {files, markdownNode, markdownAST, getNode, reporter},
  pluginOptions
) => {
  const options = _.defaults(pluginOptions, defaults)

  const markdownVideoNodes = select(markdownAST, `image`)

  return Promise.all(
    markdownVideoNodes.map(
      (node) =>
        // eslint-disable-next-line
        new Promise(async (resolve) => {
          const fileType = node.url.split(".").pop()

          if (isRelativeUrl(node.url) && fileType === "gif") {
            const parentNode = getNode(markdownNode.parent)
            const gifNode = getGifNode({node, parentNode, files})

            if (!gifNode) return resolve()

            let video = await transformGifToVideo({
              file: gifNode,
              options,
              reporter,
            })

            const rawHTML = getVideoHtml({video, options})

            if (rawHTML) {
              node.type = `html`
              node.value = rawHTML
            }
            return resolve(node)
          } else {
            return resolve()
          }
        })
    )
  ).then((markdownVideoNodes) => markdownVideoNodes.filter((node) => !!node))
}
