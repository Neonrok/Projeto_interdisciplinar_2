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
        const id_Users = req.path;
        const where = {};
        let int = id_Users.replace("/", "")
        console.log(int)
        if ( Number(int) === NaN ) {
            throw new ErrorHandler(400, `Invalid value for published: ${published}. It should be either 'true' or 'false'.`);}
        where.id_Users  = { [Op.like]: `%${Number(int)}%`}
    }
    catch (err) {
        next(err);//Em caso do erro passará para o proximo
    }
};
module.exports = {
    getInfosFromUser
}