const select = require(`unist-util-select`)
const path = require(`path`)
const isRelativeUrl = require(`is-relative-url`)
const _ = require(`lodash`)

const {transcode} = require(`./utils/transcode`)

const allowedFiletypes = ["gif"]
const defaults = {
  maxHeight: 480,
  maxWidth: 680,
}

module.exports = (
  {files, markdownNode, markdownAST, getNode, reporter},
  pluginOptions
) => {
  const options = _.defaults(pluginOptions, defaults)
  const pipelines = [
    {
      name: "h264",
      transcode: (chain) => chain.videoCodec("libx264"),
      fileExtension: "mp4",
    },
  ].map((pipeline) => ({...pipeline, ...options}))

  const markdownVideoNodes = select(markdownAST, `image`)

  // Takes a node and generates the needed videos and then returns
  // the needed HTML replacement for the video
  const generateVideosAndUpdateNode = async function (node, resolve) {
    // Check if this markdownNode has a File parent. This plugin
    // won't work if the video isn't hosted locally.
    const parentNode = getNode(markdownNode.parent)
    let videoPath
    if (parentNode && parentNode.dir) {
      videoPath = path.join(parentNode.dir, node.url)
    } else {
      return null
    }

    const videoNode = _.find(files, (file) => {
      if (file && file.absolutePath) {
        return file.absolutePath === videoPath
      }
      return null
    })

    if (!videoNode || !videoNode.absolutePath) {
      return resolve()
    }

    let transcodeResult = await transcode({
      file: videoNode,
      pipelines,
      reporter,
    })

    const sourceTags = transcodeResult.videos.map((video) => {
      return `<source src="${video.src}" type="video/${video.fileExtension}">`
    })

    let wrapperAspectStyle
    let videoAspectStyle

    // Portrait
    if (transcodeResult.aspectRatio < 1) {
      wrapperAspectStyle = `max-width: ${transcodeResult.presentationMaxWidth}px; max-height: ${transcodeResult.presentationMaxHeight}px; margin-left: auto; margin-right: auto;`
      videoAspectStyle = `height: 100%; width: 100%; margin: 0 auto; display: block; max-height: ${transcodeResult.presentationMaxHeight}px;`
    }
    // Landscape
    else {
      const ratio = `${(1 / transcodeResult.aspectRatio) * 100}%`

      wrapperAspectStyle = `position: relative; display: block; padding-top: ${ratio};`
      videoAspectStyle = `position: absolute; top: 0; left: 0; width: 100%; height: auto;`
    }

    const videoTag = `
    <video autoplay muted loop playsinline preload style="${videoAspectStyle}" >
      ${sourceTags.join("")}
    </video>
    `

    let rawHTML = `
      <div
      class="gatsby-video-aspect-ratio"
      style="${wrapperAspectStyle}"
      >${videoTag}</div>
    `

    return rawHTML
  }

  return Promise.all(
    markdownVideoNodes.map(
      (node) =>
        // eslint-disable-next-line
        new Promise(async (resolve) => {
          const fileType = node.url.split(".").pop()

          if (isRelativeUrl(node.url) && allowedFiletypes.includes(fileType)) {
            const rawHTML = await generateVideosAndUpdateNode(node, resolve)

            if (rawHTML) {
              // Replace the video node with an inline HTML node.
              node.type = `html`
              node.value = rawHTML
            }
            return resolve(node)
          } else {
            // Video isn't relative so there's nothing for us to do.
            return resolve()
          }
        })
    )
  ).then((markdownVideoNodes) => markdownVideoNodes.filter((node) => !!node))
}
