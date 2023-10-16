const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
console.log( process.env );
const app = express();

// Lectura y parseo del body
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}.`);
});

app.use(express.static(__dirname + '/public'));

app.use('/api/v1/auth', require('./routes/auth'));
