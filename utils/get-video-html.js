const getStyle = (video) => {
  const style = {
    wrapper: "",
    video: "",
  }

  // Portrait
  if (video.aspectRatio < 1) {
    style.wrapper = `max-width:${video.presentationMaxWidth}px; max-height:${video.presentationMaxHeight}px; margin-left:auto; margin-right:auto;`
    style.video = `height:100%; width:100%; margin:0 auto; display:block; max-height:${video.presentationMaxHeight}px;`
  } else {
    // Landscape
    const ratio = (1 / video.aspectRatio) * 100
    style.wrapper = `position: relative; display: block; padding-top: ${ratio}%;`
    style.video = `position:absolute; top:0; left:0; width:100%; height:auto;`
  }

  return style
}

const getVideoHtml = function ({video, options}) {
  const sources = video.versions.map((version) => {
    return `<source src="${version.src}" type="video/${version.fileExtension}">`
  })

  const style = getStyle(video)
  let attrs = []

  if (options.autoplay) attrs.push("autoplay")
  if (options.controls) attrs.push("controls")
  if (options.muted) attrs.push("muted")
  if (options.loop) attrs.push("loop")
  if (options.playsinline) attrs.push("playsinline")
  if (options.preload) attrs.push(`preload="${options.preload}"`)

  attrs.push(`style="${style.video}"`)

  return `
    <div class="gatsby-video-aspect-ratio" style="${style.wrapper}">
      <video ${attrs.join(" ")}>
        ${sources.join("")}
      </video>
    </div>
  `
}

exports.getVideoHtml = getVideoHtml
