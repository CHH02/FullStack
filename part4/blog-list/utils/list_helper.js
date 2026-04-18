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

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return {}
  
  const freq = {}

  for (const item of blogs) {
    freq[item.author] = (freq[item.author] || 0) + 1
  }

  result = Object.entries(freq).reduce((lastItem, currentItem) => {
    return currentItem[1] > lastItem[1] ? currentItem : lastItem
  })

  return {
    author: result[0],
    blogs: result[1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}
  
  const freq = {}

  for (const item of blogs) {
    freq[item.author] = (freq[item.author] || 0) + item.likes
  }

  result = Object.entries(freq).reduce((lastItem, currentItem) => {
    return currentItem[1] > lastItem[1] ? currentItem : lastItem
  })

  return {
    author: result[0],
    likes: result[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}