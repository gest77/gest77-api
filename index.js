
require('dotenv').config();
const cool = require('cool-ascii-faces');
const express = require('express')
const path = require('path')

console.log( "dot env : " + process.env.PORT)

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(process.env.PORT, () => console.log(`Listening on ${ process.env.PORT }`))
