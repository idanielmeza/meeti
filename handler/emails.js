const nodemailer = require('nodemailer');
const config = require('../config/mail');
const fs = require('fs');
const util = require('util');
const ejs = require('ejs');

let transport = nodemailer.createTransport(config);

const enviarEmail = async(opciones)=>{
    const archivo = __dirname + `/../views/emails/${opciones.archivo}.ejs`;

    //compilar archivo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));

    //renderizar html
    const html = compilado({url: opciones.url,});

    //opciones de envio
    const opcionesEmail = {
        from: "Meeti <noreply@meeti.com>",
        to: opciones.usuario.email,
        subject: opciones.subject,	
        html
    }

    //enviar email
    const sendEmail = util.promisify(transport.sendMail, transport);

    return sendEmail.call(transport, opcionesEmail);

}

module.exports = {
    enviarEmail
}