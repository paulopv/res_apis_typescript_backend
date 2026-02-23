import { Router } from "express"
import {body, param} from 'express-validator'
import { createProduct, getProducts, getProductsById, updatedProduct, updateAvailability, deleteProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

//routing
router.get ('/', getProducts)

router.get ('/:id', 
    param('id')
        .isInt().withMessage('Id no valido'),
        handleInputErrors,
        getProductsById)

router.post ('/', 
     //validacion
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
            
    body('price')
            .isNumeric().withMessage('el precio debe ser numerico')
            .notEmpty().withMessage('el precio es obligatorio')
            .custom(value => value > 0).withMessage('el precio debe ser mayor que 0'),
            
    handleInputErrors,
    
    createProduct
)

router.put ('/:id', 
    param('id')
        .isInt().withMessage('Id no valido'),
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
            
    body('price')
            .isNumeric().withMessage('el precio debe ser numerico')
            .notEmpty().withMessage('el precio es obligatorio')
            .custom(value => value > 0).withMessage('el precio debe ser mayor que 0'),
    body('availability').isBoolean().withMessage('no valido'),
    
        handleInputErrors,
        updatedProduct)


router.patch('/:id', 
    param('id')
        .isInt().withMessage('Id no valido'),
        handleInputErrors,
        updateAvailability)


router.delete('/:id',
    param('id').isInt().withMessage('Id no valido'),
    handleInputErrors,
    deleteProduct
)

export default router