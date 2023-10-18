const jwt = require('jsonwebtoken');

const generarJWT = ( uid = "", name = "") => {
    return new Promise( (resolve, reject) => {
        if(uid === "" || name === "") 
            resolve("Es necesario el uid y el nombre del usuario");
        
        const payload = { uid, name };
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, decoded) => {
            if (error) {
                reject(error);
            }
            resolve(decoded);
        });
    });
};

module.exports = {
    generarJWT
}

