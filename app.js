const express = require('express');
const bodyParser = require('body-parser');

const reservationRoute = require('./app/routes/reservation')
const tableRoute = require('./app/routes/table')

const app = express();

app
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json());

app
  .use('/api/reservation', reservationRoute)
  .use('/api/table', tableRoute)

app.listen('3000', () => {
    console.log('Server started on port 3000');
})  



