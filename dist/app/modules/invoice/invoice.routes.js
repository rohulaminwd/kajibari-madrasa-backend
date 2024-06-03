"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const invoice_controller_1 = require("./invoice.controller");
const router = express_1.default.Router();
router.get('/', invoice_controller_1.InvoiceController.getPdf);
router.post('/create', invoice_controller_1.InvoiceController.createPdf);
exports.InvoiceRoutes = router;
