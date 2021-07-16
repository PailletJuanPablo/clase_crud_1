// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const authController = require('../controllers/authController');

const { body } = require('express-validator');


// localhost:3000/auth/register
router.get('/register', authController.registerCreate);
router.post('/register',

    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('Debe tener al menos 6 caracteres'),
    body('name').isString().isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres'),

    authController.registerStore);

router.get('/login', authController.loginCreate);
router.post('/login', authController.loginStore);


module.exports = router;

