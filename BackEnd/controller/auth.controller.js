const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const db = require('../models/connect.js');
const User = db.Perfil;

const { ErrorHandler } = require("../utils/error.js");

let login = async (req, res, next) => {
    try {
        if (!req.body || !req.body.Username || !req.body.P_W)
            throw new ErrorHandler(400, { success: false, msg: "Must provide username and password." })

        let user = await User.findOne({ where: { Username: req.body.Username } }); //get user data from DB

        if (!user){ throw new ErrorHandler(404, { success: false, msg: "User not found." })};

        const check = bcrypt.compareSync( req.body.P_W, user.P_W );
        
        if (!check) {throw new ErrorHandler(404, { success:false, accessToken:null, msg:"Invalid credentials!" })};
        
        const token = jwt.sign(
            { id: user.id_Users},
            process.env.SECRET, { expiresIn: '24h'});
        
        return res.status(200).json({ success: true, accessToken: token });
    
    } catch (err) {
        next(err)
    }
};

let verifyToken = async (req, res, next) => {
    const header = req.headers['x-access-token'] || req.headers.authorization;
    if (typeof header == 'undefined')
        throw new ErrorHandler(401, { success: false, msg: "No token provided!" });
    const bearer = header.split(' '); // Authorization header format: Bearer <token>
    const token = bearer[1];

    try {
        let decoded = jwt.verify(token, config.SECRET);
        req.id = decoded.id; // save user ID and role into request object
        next();

    } catch(err) { next(err) }
}

module.exports = {
    login, verifyToken
}