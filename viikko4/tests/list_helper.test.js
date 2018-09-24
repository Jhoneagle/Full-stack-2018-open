const listHelper = require('../utils/list_helper')

describe('dummy calling', () => {
  test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const listOfBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 12
    }
  ]

  test('when list has 2 blogs', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    expect(result).toBe(17)
  })
})

describe('favorite blog', () => {
  const listOfBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 12
    }
  ]

  test('when list has 2 blogs', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    expect(result).toEqual(listOfBlogs[1])
  })
  
  test('when list has 0 blogs', () => {
    const result = listHelper.favoriteBlog({})
    expect(result).toEqual()
  })
})

describe('most blogs', () => {
  const listOfBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    },
    {
      title: 'Statements Of All Time',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Einstein',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 12
    }
  ]

  const twoBlogs = {
    author: "Edsger W. Dijkstra",
    blogs: 2
  }

  const empty = {
    author: "",
    blogs: 0
  }

  test('when list has 3 blogs', () => {
    const result = listHelper.mostBlogs(listOfBlogs)
    expect(result).toEqual(twoBlogs)
  })
  
  test('when list has 0 blogs', () => {
    const result = listHelper.mostBlogs({})
    expect(result).toEqual(empty)
  })
})

describe('most likes', () => {
  const listOfBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    },
    {
      title: 'Statements Of All Time',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Einstein',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 12
    }
  ]

  const treBlogs = {
    author: "Einstein",
    blogs: 12
  }

  const empty = {
    author: "",
    blogs: 0
  }

  test('when list has 3 blogs', () => {
    const result = listHelper.mostLikes(listOfBlogs)
    expect(result).toEqual(treBlogs)
  })
  
  test('when list has 0 blogs', () => {
    const result = listHelper.mostLikes({})
    expect(result).toEqual(empty)
  })
})