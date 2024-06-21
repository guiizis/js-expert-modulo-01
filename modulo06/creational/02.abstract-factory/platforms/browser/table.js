import TableComponent from "../../shared/base/tableComponent.js";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data)
    document.body.insertAdjacentHTML('afterBegin', template)
    
  }

  prepareData(data) {
    const [firstItem] = data
    const tHeader = Object.keys(firstItem).map(text => `<th scope=col>${text}</th>`)
    const joinList = list => list.join('')
    const tBody = data.map(item => Object.values(item))
                      .map(item => item.map(value => `<td>${value}</td>`))
                      .map(tds => `<tr>${joinList(tds)}</tr>`)
    const template = `
    <table class="table">
      <thead>
        <tr>
          ${joinList(tHeader)}
        </tr>
      </thead>
      <tbody>
        ${joinList(tBody)}
      </tbody>
    </table>
    `

    return template
  }
}