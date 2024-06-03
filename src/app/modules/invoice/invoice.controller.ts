import { Request, Response } from 'express';
import fs from 'fs';
import pdf from 'html-pdf';
import path from 'path';
import PdfInvoice from '../../../documents/invoice';
import catchAsync from '../../../shared/catchAsync';

// Define the directory where PDFs will be stored
const pdfDirectory = path.join(__dirname, '../../../documents/pdfs');

// Ensure the directory exists
if (!fs.existsSync(pdfDirectory)) {
  fs.mkdirSync(pdfDirectory, { recursive: true });
}

const createPdf = catchAsync(async (req: Request, res: Response) => {
  const filePath = path.join(pdfDirectory, 'invoice.pdf');
  try {
    pdf.create(PdfInvoice(req.body), {}).toFile(filePath, err => {
      if (err) {
        return res.status(500).send(`Error generating PDF: ${err}`);
      }
      res.send('PDF generated');
    });
  } catch (error) {
    res.status(500).send(`Unexpected error generating PDF: ${error}`);
  }
});

const getPdf = catchAsync(async (req: Request, res: Response) => {
  const filePath = path.join(pdfDirectory, 'invoice.pdf');
  try {
    res.sendFile(filePath, err => {
      if (err) {
        return res.status(500).send(`Error sending PDF file: ${err.message}`);
      }
    });
  } catch (error) {
    res.status(500).send(`Unexpected error sending PDF file: ${error}`);
  }
});

export const InvoiceController = {
  createPdf,
  getPdf,
};
