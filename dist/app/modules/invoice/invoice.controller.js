"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const fs_1 = __importDefault(require("fs"));
const html_pdf_1 = __importDefault(require("html-pdf"));
const path_1 = __importDefault(require("path"));
const invoice_1 = __importDefault(require("../../../documents/invoice"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
// Define the directory where PDFs will be stored
const pdfDirectory = path_1.default.join(__dirname, '../../../documents/pdfs');
// Ensure the directory exists
if (!fs_1.default.existsSync(pdfDirectory)) {
    fs_1.default.mkdirSync(pdfDirectory, { recursive: true });
}
const createPdf = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(pdfDirectory, 'invoice.pdf');
    try {
        html_pdf_1.default.create((0, invoice_1.default)(req.body), {}).toFile(filePath, err => {
            if (err) {
                return res.status(500).send(`Error generating PDF: ${err}`);
            }
            res.send('PDF generated');
        });
    }
    catch (error) {
        res.status(500).send(`Unexpected error generating PDF: ${error}`);
    }
}));
const getPdf = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(pdfDirectory, 'invoice.pdf');
    try {
        res.sendFile(filePath, err => {
            if (err) {
                return res.status(500).send(`Error sending PDF file: ${err.message}`);
            }
        });
    }
    catch (error) {
        res.status(500).send(`Unexpected error sending PDF file: ${error}`);
    }
}));
exports.InvoiceController = {
    createPdf,
    getPdf,
};
