const sendmail = require('./sendmail')

module.exports = ( data ) =>{
  var date = Date.now()
  var attach = 'facture'+ date +'.pdf'
  const HummusRecipe = require('hummus-recipe');
  var rabat = parseFloat(data.price - data.place * 12.5)|0;
  var finalPrice = parseFloat(data.price, 2)
  var priceTTC = data.place * 12.5|parseFloat(data.price, 2)
  var place = data.place|'4'
  var prixUnit = data.active === 0 ? '12.50' : parseFloat(data.price, 2)


  const pdfDoc = new HummusRecipe('factures/template.pdf', 'factures/'+attach);
    pdfDoc
    .editPage(1)
    .text( data.depart+' vers '+data.arrive, 30, 354, { size : 7 } )
    .text( String(place), 450, 354, { size : 7 } )
    .text( String(prixUnit)+' €', 488, 354, { size : 7 } )
    .text( String(priceTTC)+' €', 540, 354, { size : 7 } )
    .text( String(rabat)+' €', 540, 365, { size : 7 } )
    .text( String(finalPrice)+' €', 540, 376, { size : 7 } )
    .endPage()
    // end and save
    .endPDF(() => { sendmail({...data, attach}) });
}
