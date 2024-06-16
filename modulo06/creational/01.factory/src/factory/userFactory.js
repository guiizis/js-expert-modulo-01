const UserRepository = require("../repository/userRepository")
const UserService = require("../service/userService")
const DataBase = require("../utils/database")

class UserFactory {
  constructor() {}

  static async createInstance() {
    const db = new DataBase({connectionString: 'mongodb://localhost'})
    const dbConnection = await db.connect()
    const userRepository = new UserRepository({dbConnection})
    const userService = new UserService({userRepository})

    return userService
  }
}

module.exports = UserFactory