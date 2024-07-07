import http from 'http'
import { InjectHttpInterceptor } from '../src/agent.js'

InjectHttpInterceptor()

function handleRequest(request, response) {
  response.end('Hello World')
}

const server = http.createServer(handleRequest)
const port = 3000
server.listen(port, () => `server is running at ${port}`)