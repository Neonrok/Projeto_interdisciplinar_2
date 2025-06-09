const db = require('../models/connect.js');
const Atividades = db.Atividades;

const { Op } = require('sequelize');

const { ErrorHandler } = require("../utils/error.js");

let All_Acts_get = async (req, res, next) => {

    try {
        const {id_atividade, titulo, aprovado, completo, page = 1, limit = 10} = req.query;
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

        return res.status(200).json({})
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