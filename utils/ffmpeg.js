const util = require("util")
const ffmpeg = require("fluent-ffmpeg")
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path
const ffprobePath = require("@ffprobe-installer/ffprobe").path

ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath)

const ffprobe = util.promisify(ffmpeg.ffprobe)

exports.ffmpeg = ffmpeg
exports.ffprobe = ffprobe
