const encoders = [
  {
    name: "h264",
    transcode: (chain) => chain.videoCodec("libx264"),
    fileExtension: "mp4",
  },
]

exports.encoders = encoders
