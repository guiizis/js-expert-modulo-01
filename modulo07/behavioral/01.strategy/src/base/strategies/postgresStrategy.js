import knex from 'knex'

export default class PostGresStrategy {
  #instance

  constructor(connectionString) {
    this.table = 'warriors'
    this.connectionString = connectionString
  }

  async connect() {
    this.#instance = knex({
      client: 'pg',
      connection: this.connectionString
    })

    return this.#instance.raw('select 1+1 as result')
  }

  async create(item) {
    return this.#instance
      .insert(item)
      .into(this.table)
  }

  async read(item) {
    return this.#instance
      .select()
      .from(this.table)
  }
}