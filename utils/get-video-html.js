const getVideoHtml = function (transcodeResult) {
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

exports.getVideoHtml = getVideoHtml
