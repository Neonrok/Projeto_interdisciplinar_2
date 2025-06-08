const db = require('../models/connect.js');
const User = db.Perfil;

const { Op } = require('sequelize');
const { ErrorHandler } = require("../utils/error.js");

/*
aqui será o local onde serão colodos todos os argonetos dos os acessos pelos
verbos
*/

let getInfosFromUser = async (req, res, next) => {

    try {
        const { Username, descricao, cargo_id } =req.query;
        const where = {};
        
        if (Username) where.Username = { [Op.like]: `%${Username}%`}
    }
    catch (err) {
        next(err);//Em caso do erro passará para o proximo
    }
};
module.exports = {
    getInfosFromUser
}