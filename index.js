
require('dotenv').config();
const express = require('express')
const path = require('path')
const PORT = process.env.NODE_PORT || 5000

console.log( process.env.NODE_PORT)

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
