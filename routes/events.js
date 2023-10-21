const { Router } = require('express');
const { check } = require('express-validator');

const { getEventos, crearEvento, borrarEvento, actualizarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validarJWT); // Ocupa el middleware en todas las siguientes.

router.get("/", getEventos);

router.post("/", [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha de terminación obligatoria').custom(isDate),
    fieldValidator
], crearEvento);

router.put("/:id", actualizarEvento);

router.delete("/:id", borrarEvento);

module.exports = router