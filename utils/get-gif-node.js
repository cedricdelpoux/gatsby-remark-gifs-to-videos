const path = require(`path`)
const _ = require(`lodash`)

const getGifNode = ({node, parentNode, files}) => {
  if (!parentNode || !parentNode.dir) {
    return
  }

  const gifPath = path.join(parentNode.dir, node.url)
  const gifNode = _.find(files, (file) => {
    if (file && file.absolutePath) {
      return file.absolutePath === gifPath
    }
    return null
  })

  if (!gifNode || !gifNode.absolutePath) {
    return
  }

  return gifNode
}

exports.getGifNode = getGifNode
