const util = require("util")
const ffmpeg = require("fluent-ffmpeg")
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path

ffmpeg.setFfmpegPath(ffmpegPath)

const ffprobe = util.promisify(ffmpeg.ffprobe)

exports.ffmpeg = ffmpeg
exports.ffprobe = ffprobe
