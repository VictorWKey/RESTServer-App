const { Router } = require('express');
const { check } = require('express-validator');
const { upload, updateImage } = require('../controllers/upload');
const { validCollections } = require('../helpers');
const { validateFields } = require('../middlewares');

const router = Router();

router.post('/', upload);

router.put('/:collection/:id', [
    check('id', 'Enter a format id valid').isMongoId(),
    check('collection').custom( c => validCollections(c, ['users', 'products'])),
    validateFields
], updateImage);

module.exports = router;