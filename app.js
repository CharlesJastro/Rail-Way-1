const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h3>Hello, Welcome to Rail-way app</h3>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})