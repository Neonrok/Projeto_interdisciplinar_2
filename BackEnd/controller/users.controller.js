const db = require('../models/connect.js');
const User = db.Perfil;

const { ErrorHandler } = require("../utils/error.js");

/*
aqui será o local onde serão colodos todos os argonetos dos os acessos pelos
verbos
*/

let getInfosFromUser = async (req, res, next) => {

    try {
        const id_Users = req.path;
        let int = await User.findByPk(id_Users.replace("/", ""), {
            attributes: ['id_Users', 'Username', 'descricao', 'membro', 'secretariado', 'coordenador', 'admin'],
        });
        console.log(User.findByPk(req.path));
        if (!id_Users) 
            throw new ErrorHandler(404,`Cannot find any USER with ID ${req.params.id}.`);

        return res.status(200).json({
            data: int
        });
    }
    catch (err) {
        next(err);//Em caso do erro passará para o proximo
    }
};
module.exports = {
    getInfosFromUser
}