const bcrypt = require("bcryptjs");

const db = require('../models/connect.js');
const User = db.Perfil;
const Ren = db.Reuniao;

let allrens = async (req, res, next) => {
    try {
        const { titulo, dat, page = 1, limit = 10 } = req.query;
        const where = {};

        if (dat) where.dat = {[Op.like]: `%${dat}`}

        if (titulo) where.titulo = { [Op.like]: `%${titulo}%` };

        if (isNaN(page) || page < 1)
            throw new ErrorHandler(400, `Invalid value for page: ${page}. It should be a positive integer.`);

        if (isNaN(limit) || limit < 1)
            throw new ErrorHandler(400, `Invalid value for limit: ${limit}. It should be a positive integer.`);

        const Acts = await Atividades.findAndCountAll({
            where,
            limit: +limit,
            offset: (+page - 1) * +limit,
            raw: true
        })

    } catch(err) {
        next(err);
    }
}

let addRen = async (req, res, next) => {
    try {
        const author = await db.Perfil.findByPk(req.id);
        if (!author.secretariado || !author.admin) {
            throw new ErrorHandler(403, `You are not alowed to do this action.`);
        } else { req.body.id_Users = req.id};

        if (req.body.dat === undefined) {
            let error = new Error(`è necessario uma data de inicio`);
            error.statusCode = 400;
            return next(error);
        };
    } catch { next(err) }
}


module.exports = {
    allrens, addRen
}