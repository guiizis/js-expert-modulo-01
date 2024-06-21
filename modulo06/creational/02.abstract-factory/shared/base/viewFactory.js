import NotImplementedException from "../notImplementedException.js";

export default class ViewFactory {
  createTable(data) {
    throw new NotImplementedException(this.createTable.name)
  }
}