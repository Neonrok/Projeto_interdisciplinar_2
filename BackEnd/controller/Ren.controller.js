const bcrypt = require("bcryptjs");

const { ErrorHandler } = require("../utils/error.js");

const db = require('../models/connect.js');
const User = db.Perfil;
const Ren = db.Reuniao;
const Atas_ren = db.Atas_ren;
const convRen = db.convites_ren;

let allrens = async (req, res, next) => {
    try {
        let util = await User.findByPk(req.id);
        if (!util.admin && !util.secretariado)
            throw new ErrorHandler(403, { success: false, msg: "This request requires ADMIN and secretariado role!" });

        const { titulo, dat, page = 1, limit = 10 } = req.query;
        const where = {};

        if (dat) where.dat = {[Op.like]: `%${dat}`}

        if (titulo) where.titulo = { [Op.like]: `%${titulo}%` };

        if (isNaN(page) || page < 1)
            throw new ErrorHandler(400, `Invalid value for page: ${page}. It should be a positive integer.`);

        if (isNaN(limit) || limit < 1)
            throw new ErrorHandler(400, `Invalid value for limit: ${limit}. It should be a positive integer.`);

        const Rens = await Ren.findAndCountAll({
            where,
            limit: +limit,
            offset: (+page - 1) * +limit,
            raw: true
        })

        res.status(200).json({
            totalPages: Math.ceil(Rens.count / limit),
            currentPage: page ? page : 0,
            total: Rens.count,
            data: Rens.rows,
            links: [
                { "rel": "add-post", "href": `/Atividades`, "method": "POST" },
                ...(page > 1 ? [{ "rel": "previous-page", "href": `/Atividades?limit=${limit}&page=${page - 1}`, "method": "GET" }] : []),
                ...(Rens.count > page * limit ? [{ "rel": "next-page", "href": `/Atividades?limit=${limit}&page=${+page + 1}`, "method": "GET" }] : [])
            ]
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

let getRen = async (req, res, next) => {

    try {
        const Renn = await Ren.findByPk(req.params.id);
        if (!Renn)
            throw new ErrorHandler(404, `Não existe nelhuma reunião com esse ID ID ${req.params.id}.`);

        let util = await User.findByPk(req.id);
        let findConv = await convRen.findOne({ where: { id_reuniao: req.params.id, id_Users:req.id } });

        if (!util.admin && req.id===Renn.id_Users && findConv === null)
            throw new ErrorHandler(403, `Não Foste convidado para ésta reunião ${req.params.id}.`);

        return res.status(200).json({
            data: Renn
        });
    }
    catch (err) {
        next(err);
    }
}

let modRen = async (req, res, next) => {
    try{
        const Renn = await Ren.findByPk(req.params.id);
        if (!Renn)
            throw new ErrorHandler(404, `Não existe nelhuma reunião com esse ID ID ${req.params.id}.`);

        let util = await User.findByPk(req.id);

        if (!util.admin && req.id===Renn.id_Users)
            throw new ErrorHandler(403, `Não pode editar esta reunião ${req.params.id}.`);

        let missingFields = [];
        if (req.body.titulo === undefined) missingFields.push('titulo');
        if (req.body.body === undefined) missingFields.push('body');

        if (req.body.dat === undefined){
            missingFields.push('d_inicio');
        } else {
            let dataI = new Date(req.body.dat);
            
            if ((dataI == "Invalid Date")) {
                let error = new Error(`isso não é uma data.`);
                error.statusCode = 400;
                return next(error);
        }
        };

        if (missingFields.length > 0) 
           throw new ErrorHandler(400, `Missing required fields: ${missingFields.join(', ')}`);
        
        const Ron = await Ren.findByPk(req.params.id);
        if (!Ron) 
            throw new ErrorHandler(404, `Cannot find any reuniao with ID ${req.params.id}.`);

        await Ron.update(req.body);

        res.status(204).json();


    } catch (err) { next(err) }
}

let delRen =async (req, res, next) => {
    try{
        const author = await User.findByPk(req.id);
        const Renn = await Ren.findByPk(req.params.id);

        if (Renn === null) {
            throw new ErrorHandler(404, `Cannot find any Activity with ID ${req.params.id}.`);
        }

        if ( author.id_Users != Renn.id_Users && !author.admin) {
            throw new ErrorHandler(403, `You are not alowed to do this action.`);
        };

        
        let result1 = await Atas_ren.destroy({ where: { id_reuniao: req.params.id } });
        let result3 = await convRen.destroy({ where: { id_reuniao: req.params.id } });
        let result2 = await Ren.destroy({ where: { id_reuniao: req.params.id } });

        if (result1 == 0) 
           throw new ErrorHandler(404,`Cannot find any Ren with ID ${req.params.id}.`);
        
        if (result2 == 0) 
           throw new ErrorHandler(404,`Cannot find any Ren relatory with ID ${req.params.id}.`);
        
        // send 204 No Content respons
        res.status(204).json();

    } catch (err) { next(err) }
}

let getConv = async (req, res, next) => {
    try {
        const author = await User.findByPk(req.id);
        const Renn = await Ren.findOne({ where: { id_atividade: req.params.id } });

        if (Renn === null) {
            throw new ErrorHandler(404, `Cannot find any Ren with ID ${req.params.id}.`);
        }

        if ( author.id_Users != Renn.id_Users && !author.admin) {
            throw new ErrorHandler(403, `You are not alowed to do this action.`);
        };

        const {  page = 1, limit = 12 } = req.query;
        const where = {id_atividade: req.params.id};

        if (isNaN(page) || page < 1)
            throw new ErrorHandler(400, `Invalid value for page: ${page}. It should be a positive integer.`);

        if (isNaN(limit) || limit < 1)
            throw new ErrorHandler(400, `Invalid value for limit: ${limit}. It should be a positive integer.`);

        const Acts = await convRen.findAndCountAll({
            where,
            limit: +limit,
            offset: (+page - 1) * +limit,
            raw: true
        })

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

    } catch (err) {next(err);}
}

let AddConv = async (req, res, next) => {
    try{
        const author = await User.findByPk(req.id);
        const Renn = await Ren.findOne({ where: { id_atividade: req.body.id_atividade } });

        if (Renn === null) {
            throw new ErrorHandler(404, `Cannot find any Ren with ID ${req.body.id_atividade}.`);
        }

        if ( author.id_Users != Renn.id_Users && !author.admin) {
            throw new ErrorHandler(403, `You are not alowed to do this action.`);
        };

        let convi = await User.findByPk(req.body.id_Users);
        if (convi === null) {
            throw new ErrorHandler(404, `Cannot find any user with ID ${req.params.id}.`);
        }
        const found = await convRen.findOne({where: {id_atividade: req.body.id_atividade, id_Users:req.body.id_Users}});
        const vr = found.presente;
        if (found != null) {
            if(vr.presente != req.body.presente){
                let poster = await convRen.update(req.body)
                throw new ErrorHandler(204, `Editado`);
            }
            const post = await convRen.destroy({ where: {id_atividade: req.body.id_atividade, id_Users:req.body.id_Users} });

            throw new ErrorHandler(204, `Removido`);
        } 

        const post = await convRen.create(req.body);

        res.status(201).json(post);

    } catch (err) {next(err);}
}

module.exports = {
    allrens, addRen, getRen, modRen, delRen, getConv, AddConv
}