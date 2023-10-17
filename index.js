const express = require('express');
const dotenv = require('dotenv');

const { dbConnection } = require('./database/config');

dotenv.config({ path: '.env' });

const app = express();

// Base de datos
try {
    dbConnection();
} catch (error) {
    throw new Error('Error al iniciar la base de datos');
}


// Lectura y parseo del body
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}.`);
});

app.use(express.static(__dirname + '/public'));

app.use('/api/v1/auth', require('./routes/auth'));
