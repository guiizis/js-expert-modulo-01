export default class PaymentSubject {

  #observers = new Set()

  notify(data) {
    this.#observers.forEach(observers => observers.update(data))
    console.log(`A payment occurred from ${data.userName}`)
  }

  unsubscribe(observable) {
    this.#observers.delete(observable)
  }

  subscribe(observable) {
    this.#observers.add(observable)
  }
}