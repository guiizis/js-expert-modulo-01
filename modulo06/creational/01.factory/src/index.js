const UserFactory = require("./factory/userFactory");

;(async () => {
  const userFactory = await UserFactory.createInstance()
  const result = userFactory.find({name: 'test*'})
  console.log(result)
})()