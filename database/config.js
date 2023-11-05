const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        // await mongoose.connect(process.env.DB_CNN, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // });
        await mongoose.connect(process.env.DB_CNN);
        console.log("Conectando a la base de datos...");
    } catch (error) {
        throw error;
    } finally {
        console.log("Conectado a la base de datos.");
    }
}

module.exports = {
    dbConnection
}
