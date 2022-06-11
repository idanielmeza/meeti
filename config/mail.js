module.exports = {
    host: 'smtp.mailtrap.io',
    port: process.env.PORTMAIL,
    auth: {
        user: process.env.USERMAIL,
        pass: process.env.PASSWORDMAIL
    }
}