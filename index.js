require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Adopt-a-Pet</title>
        </head>
        <body>
          <h1>Hello, World!</h1>
          <p>This is the start of Kudos Baord</p>
        </body>
      </html>
    `)
  })

app.get('/hello-world', (req, res) => {
    res.send('Hello, world! ')
})

app.get('/hello-pet', (req, res) =>{
    res.send('hello, pet!')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
