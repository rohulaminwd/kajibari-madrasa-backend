const PdfInvoice = ({ invoice, orderData, subtotal, taxs, total }: any) => {
  const orders = orderData ? orderData : [];
  const tax = taxs ? taxs : [];

  const date = invoice?.date ? new Date(invoice.date) : new Date();

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
      <!doctype html>
      <html>
         <head>
            <meta charset="utf-8">
            <title>PDF Result Template</title>
            <style>
            body {
              font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
            }
            .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 40px;
            }
            .w-full{
                width: 100%;
            }
            .border{
              border: 1px solid #eee;
            }
            .mt-10 {
              margin-top: 10px;
            }
            .mt-24 {
              margin-top: 24px;
            }
            .border-b {
              border-bottom: 1px solid #eee;
            }
            .pb-3 {
              padding-bottom: 3px;
            }
            .mt-5 {
              margin-top: 5px;
            }
            .text-end {
              text-align: end;
            }
            .text-start {
              text-align: start;
            }
            .p-4 {
              padding: 4px;
            }
            .w-full {
              width: 100%;
            }
            .rounded-lg {
              border-radius: 8px;
            }
            .capitalize {
              text-transform: capitalize;
            }
            .uppercase {
              text-transform: uppercase;
            }
            .px-2 {
              padding-left: 2px;
              padding-right: 2px;
            }
            .py-1-5 {
              padding-top: 1.5px;
              padding-bottom: 1.5px;
            }
            .py-2 {
              padding-top: 5px;
              padding-bottom: 5px;
            }
            .relative {
              position: relative;
            }
            .bg-f5f3f3 {
              background: #f5f3f3;
            }
            .bg-f7f7f7 {
              background: #f7f7f7;
            }
            .text-blue-400 {
              color: #60a5fa;
            }
            .text-red-500 {
              color: #ef4444;
            }
            .outline-none {
              outline: none;
            }
            .focus-border {
              border: 1px solid #60a5fa;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 5px;
              text-align: left;
            }
            th {
              background: #f5f3f3;
            }
            .font-bold {
              font-weight: bold;
            }
            .font-medium {
              font-weight: 500;
            }
            .font-semibold {
              font-weight: 600;
            }
          </style>
         </head>
         <body>
            <div class="invoice-box">
            <table style="width: 100%;">
               <tr class="w-full">
                  <td>
                     <h3 style="font-size: 28px; font-weight: 700; text-transform: capitalize; ">${
                       invoice?.companyName
                     }</h3>
                  </td>
                  <td>
                     <h1 class="text-end" style="font-size: 36px; font-weight: 700; text-transform: uppercase;  ">${
                       invoice?.invoiceName
                     }</h1>  
                  </td>
               </tr>
               <tr class="w-full">
                  <td>
                     <div style="">
                     <p>Date: ${formattedDate}</p>
                     <p class="">${invoice?.invoiceNo}</p>
                     <p class="px-2">${invoice?.email}</p>
                     </div>
                  </td>
                  <td>
                     <div style="">
                     <p class="px-2 text-end">${invoice?.name}</p>
                    <p class="text-end">${invoice?.address}</p>
                    <p class="text-end">${invoice?.city}</p>
                    <p class="text-end">${invoice?.PhoneNumber}</p>
                     </div>  
                  </td>
               </tr>
            </table>
            <hr style="border: 1px solid #eee; background: #eee;" />
              <div class="mt-24">
                <p class="w-full p-2" style="line-height: 32px;">${
                  invoice?.des
                }</p>
              </div>
              <div class="w-full mt-24" style="margin-top: 30px;">
                <table class="w-full border">
                  <thead>
                    <tr class="font-bold text-start bg-f5f3f3">
                      <td style="text-align: start;" class="text-start py-2 pl-2">Item Description</td>
                      <td style="text-align: start;" class="text-start py-2">Quantity</td>
                      <td style="text-align: start;" class="text-start py-2">${
                        invoice?.unitPrice
                      }</td>
                      <td style="text-align: end;" class="text-end py-2 pr-2">Line Total</td>
                    </tr>
                  </thead>
                  <tbody>
                  ${orders
                    ?.map(
                      (item: any, index: any) => `
                    <tr style="border: 1px solid #eee;" class="py-3 relative border-t ${
                      index % 2 !== 0 ? 'bg-f7f7f7' : ''
                    }">
                      <td class="py-1 pl-2">${item.itemDes}</td>
                      <td>${item.quantity}</td>
                      <td>${item.price}</td>
                      <td class="text-end pr-2">৳ ${
                        item.price * item.quantity
                      }</td>
                    </tr>
                  `
                    )
                    .join('')}
                  </tbody>
                </table>
              </div>

              <div class="mt-24" style="margin-top: 40px;">
                <table style="width: 100%;" class="border">
                    <thead>
                        <tr class="font-bold ">
                            <td class="text-start py-2 pl-2">Subtotal</td>
                            <td class="text-end py-2">৳ ${subtotal}</td>
                        </tr>
                    </thead>
                <tbody>
                    ${tax
                      .map(
                        (item: any, index: any) => `
                            <tr style="border: 1px solid #eee;" key=${index} class="w-full border-t">
                            <td>
                            <span>${item.name} (${item.percent}%)</span>
                            </td>
                            <td class="text-end">
                            <span>৳ ${(subtotal / 100) * item.percent}</span>
                            </td>
                        </tr>
                `
                      )
                      .join('')}
                </tbody>
                <thead>
                    <tr class="font-bold border-t">
                        <td style="font-size: 20px; font-weight: 700; text-transform: uppercase;" class="text-start py-12 pl-2">Total</td>
                        <td style="font-size: 20px; font-weight: 700;" class="text-end py-2">৳ ${total}</td>
                    </tr>
                </thead>
                    
                </table>
            </div>
              
              <div class="mt-24">
                <p class="w-full p-2" style="line-height: 32px;">${
                  invoice?.footer
                }</p>
              </div>
            </div>
          </body>
      </html>
      `;
};

export default PdfInvoice;
