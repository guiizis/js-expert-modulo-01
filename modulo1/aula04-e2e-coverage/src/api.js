const { once } = require('events')
const http = require('http')

const DEFAULT_USER = {
  userName: 'teste',
  password: '123'
}

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  '/login:post': async (request, response) => {
    const data = JSON.parse(await once(request, "data"))

    if(data.userName !== DEFAULT_USER.userName || data.password !== DEFAULT_USER.password ) {
        response.writeHead(401)
        response.end('Login Failed')
        return
    }
    
    return response.end('ok')
  },
  default: (request, response) => {
    response.writeHead(404)
    return response.end('not found')
  }
}

function handler(request, response) {
  const {url, method} = request
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default
  
  return chosen(request, response)
}

const app = http.createServer(handler)
  .listen('3000', () => {console.log('running at 3000')})

module.exports = app