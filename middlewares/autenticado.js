const passport = require("passport");

const login = passport.authenticate("local", {
    successRedirect: "/administracion",
    failureRedirect: "/auth/iniciar-sesion",
    failureFlash: true,
    badRequestMessage: "Todos los campos son obligatorios"
});

const autenticado = (req, res, next) => {
    // si el usuario esta autenticado

    if(req.isAuthenticated()){
        return next();
    }

    // si no esta autenticado
    return res.redirect("/auth/iniciar-sesion");
}

module.exports = {
    login,
    autenticado
};