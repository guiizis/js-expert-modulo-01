import http from 'http'

function netSalary({discount, salary}) {
  const percent = (discount/100)
  const cost = salary * percent
  const result = salary - cost
  return result
}

http.createServer((req, res) => {
  const url = req.url.replace('/', '')
  const params = new URLSearchParams(url)
  const data = Object.fromEntries(params)
  const result = netSalary(data)
  res.end('seu salario após os descontos é ' + result)

}).listen(3000, () => 'API IS WORKING')