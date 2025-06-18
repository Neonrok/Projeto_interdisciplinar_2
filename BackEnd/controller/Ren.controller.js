const bcrypt = require("bcryptjs");

const db = require('../models/connect.js');
const User = db.Perfil;
const Ren = db.Reuniao;
const Atas_ren = db.Atas_ren;

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
        if (!author.secretariado && !author.admin) {
            throw new ErrorHandler(403, `You are not alowed to do this action.`);
        } else { req.body.id_Users = req.id};

        let data = new Date(req.body.dat);

        if (req.body.dat === undefined) {
            let error = new Error(`è necessario uma data de inicio`);
            error.statusCode = 400;
            return next(error);
        } else if((data == "Invalid Date")){
            let error = new Error(`isso não é uma data.`);
            error.statusCode = 400;
            return next(error);
        };

        if (typeof req.body.titulo === undefined) {
            let error = new Error(`è necessario o titulo`);
            error.statusCode = 400;
            return next(error);
        } else if (typeof req.body.titulo != 'string') {
            let error = new Error(`O titulo tem que ser uma string.`);
            error.statusCode = 400;
            return next(error);
        };

        if (typeof req.body.body === undefined) {
            let error = new Error(`è necessario uma descrição`);
            error.statusCode = 400;
            return next(error);
        } else if (typeof req.body.body != 'string') {
            let error = new Error(`A descrição tem que ser uma string.`);
            error.statusCode = 400;
            return next(error);
        };

        const Reuni = await Ren.create(req.body);

        let ab = {id_reuniao: Reuni.id_reuniao}
        const Ren_rel = await Atas_ren.create(ab)

        res.status(201).json({
            msg: "Reunião successfully created.",
            links: [
                { rel: "self", href: `/ren/${Reuni.id}`, method: "GET" },
                { rel: "delete", href: `/ren/${Reuni.id}`, method: "DELETE" },
                { rel: "modify", href: `/ren/${Reuni.id}`, method: "PUT" }
            ]
        });
    } catch(err) { next(err) }
}


module.exports = {
    allrens, addRen
}