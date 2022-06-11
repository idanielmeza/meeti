const passport = require("passport");

const autenticado = passport.authenticate("local", {
    successRedirect: "/administracion",
    failureRedirect: "/auth/iniciar-sesion",
    failureFlash: true,
    badRequestMessage: "Todos los campos son obligatorios"
});

module.exports = {
    autenticado
};