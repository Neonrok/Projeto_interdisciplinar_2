const db = require('../models/connect.js');
const Atas_ren = db.Atas_ren;
const Ren = db.Reuniao;
const Atas_Ats = db.Atas_Ats;
const Atividades = db.Atividades;
const USER = db.Perfil;

const { Op } = require('sequelize');

const { ErrorHandler } = require("../utils/error.js");
const { post, get } = require('../routes/perfil.js');

let getAll = async (req, res, next) => {

    try {
        const util = await USER.findByPk(req.id);
        console.log(util)
        const {flitro, page = 1, limit = 10 } = req.query;
        const fill = {};

        if (flitro !== undefined) {
            // e identifica se é um dos dois valores possiveis se não for possivel vai retornar o erro
            if (flitro === 'rel'){
                fill.flitro = 'rel';
            }else if( flitro === 'act'){
                fill.flitro = 'act';
            } else{
                throw new ErrorHandler(400, `Invalid value for published: ${flitro}. It should be either 'rel' or 'act'.`);
            }
        }

        if (isNaN(page) || page < 1)
            throw new ErrorHandler(400, `Invalid value for page: ${page}. It should be a positive integer.`);

        if (isNaN(limit) || limit < 1)
            throw new ErrorHandler(400, `Invalid value for limit: ${limit}. It should be a positive integer.`);


        if (util.coordenador && util.admin)
            throw new ErrorHandler(403, `Invalid value for page: ${page}. It should be a positive integer.`);


        if (fill.flitro==='rel'){
            const atas = await Atas_ren.findAndCountAll(
                {
                    limit: +limit, 
                    offset: (+page - 1) * +limit, 
                    raw: true
                }
            )
        } else if (fill.flitro==='act'){
            const atas = await Atas_Ats.findAndCountAll(
                {
                    limit: +limit, 
                    offset: (+page - 1) * +limit, 
                    raw: true
                }
            )
        } else if (fill.flitro===undefined){
            const atas_ = {}
            let aact = Atas_Ats.findAll();
            console.log(aact)
            atas_.a = aact
            let aren = Atas_ren.findAll();
            console.log(aren)
            atas_.r = aren
            console.log(atas_)

            const atas = await atas_.findAndCountAll(
                {
                    limit: +limit, 
                    offset: (+page - 1) * +limit, 
                    raw: true
                }
            );
        } else {
            throw new ErrorHandler(400, `Invalid value for published: ${flitro}. It should be either 'act' or 'ren'.`);
        }

        res.status(200).json({
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

module.exports = {
    getAll
}