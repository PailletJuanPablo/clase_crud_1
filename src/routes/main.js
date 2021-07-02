// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const productsController = require('../controllers/productsController');

// *** Multer *** //

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {      
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


router.get('/', mainController.index);
router.get('/search', mainController.search);

router.get('/image', (req, res) => res.render('product-create-form'));
router.post('/image', upload.single('image'), productsController.uploadImage)

module.exports = router;

