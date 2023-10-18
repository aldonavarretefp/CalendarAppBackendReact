const { Router } = require('express');
const { getEventos, crearEvento, editarEvento, borrarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(validarJWT); // Ocupa el middleware en todas las siguientes.

router.get("/", getEventos);

router.post("/", crearEvento);

router.put("/:id", editarEvento);

router.delete("/:id", borrarEvento);

module.exports = router