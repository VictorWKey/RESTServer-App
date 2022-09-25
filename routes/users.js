
const {Router} = require('express');
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateRole, emailExists, existsIdUser } = require('../helpers/db_validators.js');


const router = Router();

router.get('/', usersGet)

router.post('/',[ 
    check('email', 'Invalid email').isEmail(),
    check('email').custom(emailExists),
    check('name', 'Invalid name').not().isEmpty(),
    check('password', 'Password must have more of 6 letters').isLength({min: 6}),
    // check('role', 'This role isn´t on database').isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check('role').custom(validateRole),
    validateFields
] ,usersPost); //check().isEmail() es un middleware .Hay middlewares que son necesarios que pongamos como argumento del router, estos se ejecutan antes que todo. Se pone en [] por si queremos poner mas, sino sin problema podriamos poner solo 1 middleware. Como primer parametro del check() ponemos la propiedad del body que se requiere validar. Como segundo argumento ponemos el error que deberia tirar si su validacion no se cumple. isEmail() lo que hace es indicar que lo que va validar es un email. Asi de simple y sencillo. Poner solo el middleware aqui, no hara nada, lo unico que hace es preparar los errores si es que los hay. Para poder utilizarlos, se usa validationResult(req) en el controlador. Asi que ve y fijate que hiciste ahi. El error lo envia en forma de objeto junto con otras propiedades

//En el caso del put, al poncer check('id'), 'id' sera lo que esta en el parametro de la ruta, no lo que se envia en el body
router.put('/:id',[
    // check('id').isMongoId(), //Decidimos eliminar esto, por que en el custom de abajo ya hacemos lo que realiza esta. Esto para eliminar un error que daba al poner un id que no era de moongose con la funcion que fue remplazada por existsIdUser en el apartado de helpers.
    check('id').custom(existsIdUser), 
    check('password', 'Password must have more of 6 letters').optional().isLength({min: 6}), //El metodo optional() sirve para que no sea obligatorio que la contraseña venga en el body, si si viene hace la validacion, sino no. Si no tuviera el optional() y la password no se envia en el body, tomara la validacion como un error
    check('role').optional().custom(validateRole),
    validateFields
], usersPut);

router.patch('/', usersPatch);

router.delete('/', usersDelete);

module.exports = router;