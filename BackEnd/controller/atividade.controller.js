const db = require('../models/connect.js');
const Atividades = db.Atividades;
const Atas_Ats = db.Atas_Ats;

const { Op } = require('sequelize');

const { ErrorHandler } = require("../utils/error.js");
const { post } = require('../routes/perfil.js');

let All_Acts_get = async (req, res, next) => {

    try {
        const { titulo, aprovado, completo, page = 1, limit = 10 } = req.query;
        const where = {};

        if (aprovado !== undefined) {
            // e identifica se é um dos dois valores possiveis se não for possivel vai retornar o erro
            if (aprovado !== 'true' && aprovado !== 'false')
                throw new ErrorHandler(400, `Invalid value for published: ${aprovado}. It should be either 'true' or 'false'.`);

            where.aprovado = aprovado === 'true'; // converte para true ou false retutnado o resultado da conparação feita
        }

        if (completo !== undefined) {
            // e identifica se é um dos dois valores possiveis se não for possivel vai retornar o erro
            if (completo !== 'true' && completo !== 'false')
                throw new ErrorHandler(400, `Invalid value for published: ${completo}. It should be either 'true' or 'false'.`);

            where.completo = completo === 'true'; // converte para true ou false retutnado o resultado da conparação feita
        }

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

        Acts.rows.forEach(Acts => {
            post.links = [
                { rel: "self", href: `/Atividades/${Acts.id_atividade}`, method: "GET" },
                { rel: "delete", href: `/Atividades/${Acts.id_atividade}`, method: "DELETE" },
                { rel: "modify", href: `/Atividades/${Acts.id_atividade}`, method: "PUT" },
            ]
        });

        return res.status(200).json({
            totalPages: Math.ceil(Acts.count / limit),
            currentPage: page ? page : 0,
            total: Acts.count,
            data: Acts.rows,
            links: [
                { "rel": "add-post", "href": `/Atividades`, "method": "POST" },
                ...(page > 1 ? [{ "rel": "previous-page", "href": `/Atividades?limit=${limit}&page=${page - 1}`, "method": "GET" }] : []),
                ...(Acts.count > page * limit ? [{ "rel": "next-page", "href": `/Atividades?limit=${limit}&page=${+page + 1}`, "method": "GET" }] : [])
            ]
        })
    }
    catch (err) {
        next(err);
    }
}

let Act_Infus_get = async (req, res, next) => {

    try {
        const Acts = await Atividades.findByPk(req.params.id);
        if (!Acts)
            throw new ErrorHandler(404, `Cannot find any activity with ID ${req.params.id}.`);

        return res.status(200).json({
            data: Acts
        });
    }
    catch (err) {
        next(err);
    }
}

let Add_Act_post = async (req, res, next) => {
    try {
        if (req.body.id_Users === undefined) {
            let error = new Error(`Your access token has expired! Please login again.`);
            error.statusCode = 401;
            return next(error);
        }

        const author = await db.Perfil.findByPk(req.body.id_Users);

        if (author === null) {
            throw new ErrorHandler(404, `Cannot find any USER with ID ${req.body.id_Users}.`);
        }

        if (!author.membro && !author.admin) {
            throw new ErrorHandler(403, `You are not alowed to do this action.`);
        };

        if (req.body.d_inicio === undefined) {
            let error = new Error(`è necessario uma data de inicio`);
            error.statusCode = 400;
            return next(error);
        };

        if (req.body.d_fim === undefined) {
            let error = new Error(`è necessario uma data de final`);
            error.statusCode = 400;
            return next(error);
        };

        let dataI = new Date(req.body.d_inicio);
        let dataF = new Date(req.body.d_fim);
        if ((dataI == "Invalid Date") || (dataF == "Invalid Date")) {
            let error = new Error(`isso não é uma data.`);
            error.statusCode = 400;
            return next(error);
        }

        if (typeof req.body.titulo === undefined) {
            let error = new Error(`è necessario o titulo`);
            error.statusCode = 400;
            return next(error);
        } else if (typeof req.body.titulo != 'string') {
            let error = new Error(`O titulo tem que ser uma string.`);
            error.statusCode = 400;
            return next(error);
        }

        if (typeof req.body.body === undefined) {
            let error = new Error(`è necessario uma descrição`);
            error.statusCode = 400;
            return next(error);
        } else if (typeof req.body.body != 'string') {
            let error = new Error(`A descrição tem que ser uma string tem que ser uma string.`);
            error.statusCode = 400;
            return next(error);
        }

        const post = await Atividades.create(req.body);
        
        console.log(post.id_atividade)
        let ab = {id_atividade: post.id_atividade}
        const post_rel = await Atas_Ats.create(ab)

        res.status(201).json({
            msg: "Post successfully created.",
            //add HATEOAS links to the created post
            links: [
                { rel: "self", href: `/posts/${post.id}`, method: "GET" },
                { rel: "delete", href: `/posts/${post.id}`, method: "DELETE" },
                { rel: "modify", href: `/posts/${post.id}`, method: "PUT" },
                // NEW: link to add tags to the post
                { rel: "add-tags", href: `/posts/${post.id}/tags`, method: "POST" },

            ]
        });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    All_Acts_get, Act_Infus_get, Add_Act_post
}