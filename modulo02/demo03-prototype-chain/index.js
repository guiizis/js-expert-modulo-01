const obj = {}
const arr = []
const fn = () => {}

//internamente objetos literais viram funcoes explicitas
// o js sempre busca no __proto__ do __proto__ do __proto__ ate achar o metodo que esta sendo procurado

console.log('new Object is {} ?' , new Object().__proto__ === obj.__proto__)
console.assert(new Object().__proto__ === obj.__proto__, 'assert  object proto')

console.log('obj.__proto__ === Object.proto', obj.__proto__ === Object.prototype)
console.assert(obj.__proto__ === Object.prototype, 'Object prototype is equal')

console.assert(arr.__proto__ === Array.prototype, 'array proto is equal Array proto')
console.assert(fn.__proto__ === Function.prototype, 'function proto is equal Function proto')

// todo mundo herda de null
console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null)

console.log('-----------')

function Employee() {}

Employee.prototype.salary = () => 'salary'

console.log(Employee.prototype.salary())

function Supervisor() {}

Supervisor.prototype = Object.create(Employee.prototype)
console.log(Supervisor.prototype.salary())

Supervisor.prototype.profitShare = () => 'profitShare'

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
console.log(Manager.prototype.salary())
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses'

// quando nao chamamos o new o prototype não é atualizado com as novas funções adicionads
// sendo assim prototype.__proto__ === ao prototype da classe pai
console.assert(Manager.prototype.__proto__ === Supervisor.prototype, 'proto in manager and supervisor are the same')

console.log('-----------')
// quando chamamos o new, __proto__ recebe o prototype e isso faz com que tenhamos acesso as funções custom
console.log('manager.__prototype__', new Manager().__proto__)
// nesse caso como manager extende de supervisor, o proto de manager é supervisor + funcoes manager\
// e o proto do proto do manager é supervisor.prototype
console.log(Supervisor.prototype === new Manager().__proto__.__proto__)
// sem o uso da palavra new, proto de supervisor não tem todas as funções que supervisor.prototype tem
console.log(Supervisor.prototype, Supervisor.__proto__)
console.assert(Supervisor.prototype === new Supervisor().__proto__, '')

console.log('-----------')
const manager = new Manager()
console.log(manager.salary())
console.log(manager.profitShare())
console.log(manager.monthlyBonuses())

console.log(manager.__proto__)

console.assert(manager.__proto__ === Manager.prototype, 'manager proto is equal manager proto instance?')
console.assert(manager.__proto__.__proto__ === Supervisor.prototype, 'manager proto proto is equal supervisor proto?')
console.assert(manager.__proto__.__proto__.__proto__ === Employee.prototype, 'manager proto proto proto is equal Employee proto?')
console.assert(manager.__proto__.__proto__.__proto__.__proto__ === Object.prototype, 'manager proto proto proto proto is equal Object proto?') 
console.assert(manager.__proto__.__proto__.__proto__.__proto__.__proto__ === null, 'manager proto proto proto proto proto is equal null?') 

console.log('-----------')

class T1 {
  ping() {return 'ping'}
}

class T2 extends T1{
  pong() {return 'pong'}
}

class T3 extends T2{
  shoot() {return 'shoot'}
}

const t3 = new T3()
console.log(t3.__proto__)
console.log(t3.ping())
console.log(t3.pong())
console.log(t3.shoot())

console.assert(t3.__proto__ === T3.prototype)
console.assert(t3.__proto__.__proto__ === T2.prototype)
console.assert(t3.__proto__.__proto__.__proto__ === T1.prototype)