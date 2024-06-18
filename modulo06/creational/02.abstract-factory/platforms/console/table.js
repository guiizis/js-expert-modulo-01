import TableComponent from "../../shared/base/tableComponent";

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    console.log('calls', data)
  }
}