const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((lastItem, currentItem) => (lastItem.likes > currentItem.likes)
  ? lastItem : currentItem, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}