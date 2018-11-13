const logger = (request, response, next) => {
  if ( process.env.NODE_ENV === 'test' ) {
    return next()
  }
  
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  return next()
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    request.token = token
  } else {
    const token = undefined
    request.token = token
  }
  
  return next()
}

module.exports = {
  logger,
  error,
  tokenExtractor
}
