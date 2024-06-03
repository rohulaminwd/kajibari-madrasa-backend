import express from 'express';
import { InvoiceController } from './invoice.controller';

const router = express.Router();

router.get('/', InvoiceController.getPdf);
router.post('/create', InvoiceController.createPdf);

export const InvoiceRoutes = router;
