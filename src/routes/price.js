import express from 'express';
import * as controller from '../controllers/priceController'

//CRUD

const router = express.Router();

router.get('/all',controller.getPrice)

export default router