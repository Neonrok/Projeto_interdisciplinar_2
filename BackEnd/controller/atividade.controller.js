const db = require('../models/connect.js');
const Atividades = db.Atividades;

const { Op } = require('sequelize');

const { ErrorHandler } = require("../utils/error.js");
const { post } = require('../routes/perfil.js');

let All_Acts_get = async (req, res, next) => {

    try {
        const { titulo, aprovado, completo, page = 1, limit = 10} = req.query;
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

        const sortField = sort === 'views' ? 'views' : 'id';
        const sortOrder = order === 'desc' ? 'DESC' : 'ASC';


        if (isNaN(page) || page < 1) 
            throw new ErrorHandler(400, `Invalid value for page: ${page}. It should be a positive integer.`);
        
        if (isNaN(limit) || limit < 1) 
            throw new ErrorHandler(400, `Invalid value for limit: ${limit}. It should be a positive integer.`);
        
        const Acts = await Atividades.findAndCountAll({
            where,
            order: [[sortField, sortOrder]],
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
                // ... JS spread operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                // only add the previous page link if the current page is greater than 1
                ...(page > 1 ? [{ "rel": "previous-page", "href": `/Atividades?limit=${limit}&page=${page - 1}`, "method": "GET" }] : []),
                // only add the next page link if there are more pages to show
                ...(Acts.count > page * limit ? [{ "rel": "next-page", "href": `/Atividades?limit=${limit}&page=${+page + 1}`, "method": "GET" }] : [])
            ]
        })
    } 
    catch (err) {
        next(err);
    }
}


let Act_Infus_get = async (req, res, next) => {

    try {} 
    catch (err) {
        console.log("rota não inplumentada")
        next(err);
    }
}


module.exports = {
    All_Acts_get, Act_Infus_get
}