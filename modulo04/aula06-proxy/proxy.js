'use strict'
// 18:52
const Event = require('events')
const event = new Event()
const eventName = 'counter'
let interval = null

event.on(eventName, msg => console.log('counter', msg))
const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propKey, newValue) => {
    event.emit(eventName, {newValue, key: target[propKey]})
    target[propKey] = newValue
    return true
  },
  get: (object, prop) => {
    if (object.counter === 10) {
      console.log('ultima exec 😁')
      clearInterval(interval)
    }
    return object[prop]
  }
})

interval = setInterval(() => {
  proxy.counter ++
},2000)

setTimeout(() => {
    proxy.counter = 4
},100) //para n fzr essa gambiara eu posso utilizar o setImmediate

setImmediate(() => {
  proxy.counter = 3
})

//execute agora, dou uma prioridade maior para essa task
process.nextTick(() => {
  proxy.counter = 2
})

// regra de prioridade process.nextTick, setTimeout com valor 0, setInterval
// regra de prioridade process.nextTick, setImmediate, setTimeout com valor de verdade como 100, setInterval