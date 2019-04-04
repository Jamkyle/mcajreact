const sendmail = require('./sendmail')
module.exports = ( data ) =>{
  var date = Date.now()
  var attach = 'facture'+ date+'.pdf'
  const HummusRecipe = require('hummus-recipe');
  const pdfDoc = new HummusRecipe('factures/template.pdf', 'factures/'+attach);
    pdfDoc
    .editPage(1)
    .text('Denfert Rochereau vers Orly', 30, 354, { size : 7})
    .endPage()
    // end and save
    .endPDF(() => { sendmail({...data, attach}) });
}
