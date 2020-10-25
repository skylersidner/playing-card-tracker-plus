const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const staticPath = path.join(__dirname, '/src');
app.use(express.static(staticPath));

app.listen(port, () => {
  console.log(`Playing-card-tracker-plus listening at http://localhost:${port}`)
})