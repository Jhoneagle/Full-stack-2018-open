let token = null

const blogs = [
  {
    "title": "katoaako",
    "author": "admin",
    "url": "http://www.c.d",
    "likes": 4,
    "user": {
      "_id": "5bdb295fb326af3320fd14df",
      "username": "test",
      "name": "test"
    },
    "id": "5bdcb579b326af3320fd14e6"
  },
  {
    "title": "whynotupdate",
    "author": "admin",
    "url": "",
    "likes": 2,
    "user": {
      "_id": "5bdb295fb326af3320fd14df",
      "username": "test",
      "name": "test"
    },
    "id": "5bdcb60db326af3320fd14e7"
  },
  {
    "title": "fack",
    "author": "gurhe",
    "url": "http://w.w.w",
    "likes": 1,
    "user": {
      "_id": "5bdb295fb326af3320fd14df",
      "username": "test",
      "name": "test"
    },
    "id": "5be1e94822cd042058546027"
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken, blogs }