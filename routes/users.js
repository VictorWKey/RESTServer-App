const {Router} = require('express');
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');
const {check} = require('express-validator');

const router = Router();

router.get('/', usersGet)

router.post('/',[ check('email', 'This is not a valid email').isEmail() ] ,usersPost); //check().isEmail() es un middleware .Hay middlewares que son necesarios que pongamos como argumento del router, estos se ejecutan antes que todo. Se pone en [] por si queremos poner mas, sino sin problema podriamos poner solo 1 middleware. Como primer propiedad del check() ponemos la propiedad del body que se requiere validar. Como segundo argumento ponemos el error que deberia tirar si su validacion no se cumple. isEmail() lo que hace es indicar que lo que va validar es un email. Asi de simple y sencillo. Poner solo el middleware aqui, no hara nada, lo unico que hace es preparar los errores si es que los hay. Para poder utilizarlos, se usa validationResult(req) en el controlador. Asi que ve y fijate que hiciste ahi. El error lo envia en forma de objeto junto con otras propiedades

router.put('/', usersPut);

router.patch('/', usersPatch);

router.delete('/', usersDelete);

module.exports = router;