
require('dotenv').config();
const express = require('express')
const path = require('path')

console.log( "dot env : " + process.env.PORT)

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/times', (req, res) => res.send(showTimes()))
  .listen(process.env.PORT, () => console.log(`Listening on ${ process.env.PORT }`))


  showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
      result += i + ' ';
    }
    return result;
  }