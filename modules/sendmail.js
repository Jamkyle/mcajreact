const nodemailer = require('nodemailer');
const serviceMail = require('../secret/secret-sendmailjet.json')
var swig = require('swig-email-templates');
const path = require('path')

module.exports = (data) => {
  let client = data.email

  //-- create transport --
  const transporter = nodemailer.createTransport({
   host: 'in-v3.mailjet.com',
   port: '587',
   auth: serviceMail
  });

  // -- create template --
  const templates = new swig({
    root: __dirname
  });

  templates.render('template.html', data, function(err, html, text) {
    const mailOptions = {
      from: 'Vroomcab <contact@vroomcab.fr>', // sender address
      to: client, // list of receivers
      subject: 'Récapitulatif de votre course Vroomcab', // Subject line
      generateTextFromHTML: true,
       html: html,
       text: text,
       attachments: [{
         filename: data.attach,
         path: path.join(__dirname, '../factures/'+data.attach),
         contentType: 'application/pdf'
       }],
       function (err, info) {
         if(err){
           console.error(err);
           res.send(err);
         }
         else{
           console.log(info);
           res.send(info);
         }
       }
    };

      transporter.sendMail(mailOptions, function (err, info) {
       if(err)
         console.log(err)
       else
         console.log(info);
       });
  });

}
