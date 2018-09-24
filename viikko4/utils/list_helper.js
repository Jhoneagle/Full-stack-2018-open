const dummy = (blogs) => {
  const result = 1
  return result
}

const totalLikes = (blogs) => {
  let result = 0
  
  const length = blogs.length
  
  for (i = 0; i < length; i++) {
    result += blogs[i].likes
  }
  
  return result
}

const favoriteBlog = (blogs) => {
  let result = 0
  const length = blogs.length
  
  if (length === 0) {
    return None
  }
  
  let blog = blogs[0]
  
  for (i = 1; i < length; i++) {
    current = blogs[i]
    
    if (current.likes > result) {
	result = current.likes
	blog = current
    }
  }
  
  return blog
}

const mostBlogs = (blogs) => {
  let howMany = {}
  const length = blogs.length
  
  for (i = 0; i < length; i++) {
    const name = blogs[i].author
    
    if (howMany[name]) {
      howMany[name] += 1
    } else {
      howMany[name] = 1
    }
  }
  
  let amount = 0
  let authorName = ''
  
  for (let key in howMany) {
    if (howMany.hasOwnProperty(key)) {
        if (howMany[key] > amount) {
	  amount = howMany[key]
	  authorName = key
	}
    }
  }
  
  const result = {
	author: authorName,
	blogs: amount
  }
  
  return result
}

const mostLikes = (blogs) => {
  let howMany = {}
  const length = blogs.length
  
  for (i = 0; i < length; i++) {
    const name = blogs[i].author
    const thumps = blogs[i].likes
    
    if (howMany[name]) {
      howMany[name] += thumps
    } else {
      howMany[name] = thumps
    }
  }
  
  let amount = 0
  let authorName = ''
  
  for (let key in howMany) {
    if (howMany.hasOwnProperty(key)) {
        if (howMany[key] > amount) {
	  amount = howMany[key]
	  authorName = key
	}
    }
  }
  
  const result = {
	author: authorName,
	blogs: amount
  }
  
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
