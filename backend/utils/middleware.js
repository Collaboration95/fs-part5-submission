const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({
      error: 'expected `username` to be unique'
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token HEHEHE'
    })

  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const getTokenFrom = request=>{
  const authorization = request.get('authorization')

  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
      return authorization.replace('Bearer ','')
  }
  return null
}

const tokenExtractor = (request, response, next) => {

  const unverifiedToken = getTokenFrom(request);
  if (!unverifiedToken) {
    console.log("no token provided");
    next();
  } else {
    try {
      const decodedToken = jwt.verify(unverifiedToken, process.env.SECRET);
      request.token = decodedToken;
      next();
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  }
};


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}