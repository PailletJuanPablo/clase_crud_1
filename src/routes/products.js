// ************ Require's ************
const express = require('express');
const router = express.Router();

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



// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 

router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/
router.get('/create/', productsController.create); 
router.post('/', productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:identificador/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/
router.get('/:id/edit', productsController.edit); 
router.put('/:id', upload.single('imagen-producto'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
