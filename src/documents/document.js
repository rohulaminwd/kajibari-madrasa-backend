module.exports = ({ name, price1, price2, price3, receipt, email }) => {
  const today = new Date();

  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
          <div style="border-bottom: 1px solid red;">
            <table>
               <tr class="item">
                  <td>
                     <h3 style="font-size: 28px; font-weight: 700; text-transform: capitalize; ">Red Shop</h3>
                  </td>
                  <td>
                     <h1 style="font-size: 40px; font-weight: 700; text-transform: uppercase;  ">Invoice</h1>  
                  </td>
               </tr>
            </table>
         </div>
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title">
                              <img  src="https://www.redshop.io/_next/static/media/redShop.01faed52.svg"
                               style="width:60px">
                               </td>
                            <td>
                            Date of Invoice: ${`${today.getDate()}. ${
                              today.getMonth() + 1
                            }. ${today.getFullYear()}.`}
                            <br/>
                            Email: ${`${email}`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Customer name: ${name}
                            </td>
                            <td>
                               Receipt number: ${receipt}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Invoice</td>
                   <td>Price</td>
                </tr>
                <tr class="item">
                   <td>First item:</td>
                   <td>${price1}$</td>
                </tr>
                <tr class="item">
                   <td>Second item:</td>
                   <td>${price2}$</td>
                </tr>
                <tr class="item">
                <td>Third item:</td>
                <td>${price3}$</td>
             </tr>
             </table>
             <br />
             <h3 class="justify-center">Total price: ${
               parseInt(price1) + parseInt(price2) + parseInt(price3)
             }$</h3>
             <footer>
             <p class="justify-center">Invoice was created on ${`${today.getDate()}. ${
               today.getMonth() + 1
             }. ${today.getFullYear()}.`}</p>
         </footer>
          </div>
       </body>
    </html>
    `;
};
