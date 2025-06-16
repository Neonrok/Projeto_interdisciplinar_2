const bcrypt = require("bcryptjs");

const db = require('../models/connect.js');
const User = db.Perfil;

const { ErrorHandler } = require("../utils/error.js");

/*
aqui será o local onde serão colodos todos os argonetos dos os acessos pelos
verbos
*/

let create = async (req, res, next) => {
    try{
        if (!req.body || !req.body.Username || !req.body.P_W || !req.body.Email){
            throw new ErrorHandler(400, { success: false, msg: "Email, username and password are mandatory" });
        }
        let user = await User.findOne({ where: { Username: req.body.Username } }); //get user data from DB
        if (user){ 
            throw new ErrorHandler(401, { success: false, msg: "esse Username já existe." });
        }
        
        // Save user to DB
        const utilizador = await User.create({
            Username: req.body.Username, Email: req.body.Email,
            // hash its password (8 = #rounds – more rounds, more time)
            P_W: bcrypt.hashSync(req.body.P_W, 10)
        });
        res.status(201).json({ success: true, msg: "User was registered successfully!" });
    } catch (err) {
        next(err);
    };
};

let getUser = async (req, res, next) => {

    try {
        const id_Users = await User.findByPk(req.params.id);
        //let int = await User.findByPk(id_Users.replace("/", ""), {attributes: ['id_Users', 'Username', 'descricao', 'membro', 'secretariado', 'coordenador', 'admin'],});
        if (!id_Users || !req.Ad) 
            throw new ErrorHandler(404,`Cannot find any USER with ID ${req.params.id}.`);

        return res.status(200).json({
            data: id_Users
        });
    }
    catch (err) {
        next(err);//Em caso do erro passará para o proximo
    }
};

let geAllUsers = async (req, res, next) => {
    try {
        let util = await User.findByPk(req.id);
        if (!util.admin)
            throw new ErrorHandler(403, { success: false, msg: "This request requires ADMIN role!" });
        // do not expose users' sensitive data
        let users = await User.findAll({attributes: {exclude: ['P_W']} })
        console.log("teste")
        res.status(200).json({ users: users });
    } catch (err) {
        next(err);
    };
};

let modUser = async (req, res, next) => {
    try {
        if (!req.body || !req.body.Username || !req.body.Email){
            throw new ErrorHandler(400, { success: false, msg: "Email and username are mandatory" });
        }
        let user = await User.findOne({ where: { Username: req.body.Username } }); //get user data from DB
        if (!user){ 
            throw new ErrorHandler(404, { success: false, msg: "esse Username não existe." });
        }
        if (!req.body.membro) {req.body.membro = false};
        if (!req.body.secretariado) {req.body.secretariado = false};
        if (!req.body.coordenador) {req.body.coordenador = false};
        if (!req.body.admin) {req.body.admin = false};
        // update the post with the new data
        await user.update({
            Username: req.body.Username, Email: req.body.Email, P_W: User.P_W,
            descricao: req.body.descricao, membro: req.body.membro,
            secretariado: req.body.secretariado, coordenador: req.body.coordenador,
            admin: req.body.admin
        });
        res.status(204).json();

    } catch (err) {
        next(err);
    };
}

module.exports = {
    getUser, create, geAllUsers, modUser
}