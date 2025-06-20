const bcrypt = require("bcryptjs");

const db = require('../models/connect.js');
const User = db.Perfil;
const ConvAct = db.inscrits_Act;
const Convren = db.convites_ren;

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
        let util = await User.findByPk(req.id);
        if (!id_Users) 
            throw new ErrorHandler(404,`Cannot find any USER with ID ${req.params.id}.`);

        if (util.admin && id_Users.id_Users != util.id_Users)
            throw new ErrorHandler(403,`This is not you.`);

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
        if (!req.body){
            throw new ErrorHandler(400, { success: false, msg: "You need to change something" });
        }
        let user = await User.findByPk(req.params.id ); //get user data from DB
        if (!user){ 
            throw new ErrorHandler(404, { success: false, msg: "esse Username não existe." });
        }
        if (!req.body.Username || req.body.Username === undefined ) {req.body.Username = user.Username};
        if (!req.body.Email || req.body.Email === undefined ) {req.body.Email = user.Email};
        if (!req.body.descricao || req.body.descricao === undefined ) {req.body.descricao = user.descricao};
        if (!req.body.P_W || req.body.P_W === undefined ) {req.body.P_W = user.P_W} 
        else {req.body.P_W = bcrypt.hashSync(req.body.P_W, 10)};
        let util = await User.findByPk(req.id);
        if (util.admin){
            if (!req.body.membro) {req.body.membro = user.membro};
            if (!req.body.secretariado) {req.body.secretariado = user.secretariado};
            if (!req.body.coordenador) {req.body.coordenador = user.coordenador};
            if (!req.body.admin) {req.body.admin = user.admin;};
        } else if(user.id_Users === util.id_Users){
            req.body.membro = user.membro;
            req.body.secretariado = user.secretariado;
            req.body.coordenador = user.coordenador;
            req.body.admin = user.admin;
        } else {
            throw new ErrorHandler(403, { success: false, msg: "Não está permitido a editrar este utilizador" });
        }
        // update the post with the new data
        await user.update({
            Username: req.body.Username, Email: req.body.Email, P_W: req.body.P_W,
            descricao: req.body.descricao, membro: req.body.membro,
            secretariado: req.body.secretariado, coordenador: req.body.coordenador,
            admin: req.body.admin
        });
        res.status(204).json({success: true, msg: "User was moded successfully!"});

    } catch (err) {
        next(err);
    };
}

let deleteUser = async (req, res, next) => {
    try {
        console.log(req.body)
        let user = await User.findOne({ where: { id_Users: req.params.id } }); //get user data from DB
        if (!user){ 
            throw new ErrorHandler(404, { success: false, msg: "esse Username não existe." });
        }
        let util = await User.findByPk(req.id);
        if (util.admin || user.id_Users === util.id_Users) {
            let result3 = await Convren.destroy({ where: { id_Users: req.params.id } });
            let result2 = await ConvAct.destroy({ where: { id_Users: req.params.id } });
            let result1 = await User.destroy({ where: { id_Users: req.params.id } });
        } else {
            throw new ErrorHandler(403, { success: false, msg: "Não está permitido a remover este utilizador" });
        }
        
        res.status(204).json();
    } catch(err) { next(err) };
}

let getId = async (req, res, next) => {
    console.log(req.id)
    try{
        let util = await User.findByPk(req.id);
        return res.status(200).json({
            data: util.id_Users
        });
    } catch(err) {
        next(err)
    };
}

module.exports = {
    getUser, create, geAllUsers, modUser, deleteUser, getId
}