import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/base/strategies/mongoDBStrategy.js"
import PostGresStrategy from "./src/base/strategies/postgresStrategy.js"

const postgresConnectionString = 'postgres://guiModa:senha0001@localhost:5432/heroes'
const postGresContext = new ContextStrategy(new PostGresStrategy(postgresConnectionString))
await postGresContext.connect()

const mongoDBConnectionString = 'mongodb://guiModa:senhaAdmin@localhost:27017/heroes'
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongoDBContext.connect()

const data = [
  {
    name: 'test',
  },
  {
    name: 'test2',
  }
]

await mongoDBContext.create(data[1])
console.log(await mongoDBContext.read())