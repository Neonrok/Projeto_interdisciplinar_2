const bcrypt = require("bcryptjs");

const db = require('../models/connect.js');
const User = db.Perfil;

const { ErrorHandler } = require("../utils/error.js");

let login = async (req, res, next) => {
    try {
        if (!req.body || !req.body.Username || !req.body.P_W)
            res.status(400).json({ success: false, msg: "Must provide username and password." })

        let user = await User.findOne({ where: { Username: req.body.Username } }); //get user data from DB

        if (!user){res.status(404).json({ success: false, msg: "User not found." })};

        const check = bcrypt.compareSync( req.body.P_W, user.P_W );
        
        if (!check) {res.status(401).json({ success:false, accessToken:null, msg:"Invalid credentials!" })};
        
        const token = jwt.sign(
            { id_Users: user.id_Users},
            process.env.SECRET, { expiresIn: '24h'});
        
        res.status(200).json({ success: true, accessToken: token });
    
    } catch (err) {
        next(err)
    }
};
let verifyToken = async (req, res, next) => {
    try {} catch(err) { next(err) }
}

module.exports = {
    login, verifyToken
}