const sendmail = require('./sendmail')

module.exports = ( data ) =>{
  var date = Date.now()
  var attach = 'facture'+ date +'.pdf'
  const HummusRecipe = require('hummus-recipe');
  var rabat = parseFloat(data.price - data.place * 12.5);
  const pdfDoc = new HummusRecipe('factures/template.pdf', 'factures/'+attach);
    pdfDoc
    .editPage(1)
    .text( data.depart+' vers '+data.arrive, 30, 354, { size : 7 } )
    .text( data.place, 450, 354, { size : 7 } )
    .text( '12.50', 488, 354, { size : 7 } )
    .text( String(data.place * 12.5), 540, 354, { size : 7 } )
    .text( String(rabat), 540, 365, { size : 7 } )
    .text( data.price, 540, 376, { size : 7 } )
    .endPage()
    // end and save
    .endPDF(() => { sendmail({...data, attach}) });
}
