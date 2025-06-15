const db = require('../models/connect.js');
const User = db.Perfil;

const { ErrorHandler } = require("../utils/error.js");

exports.login = async (req, res) => {
    try {
        if (!req.body || !req.body.Username || !req.body.P_W)
            return res.status(400).json({ success: false, msg: "Must provide username and password." })
        let user = await User.findOne({ where: { Username: req.body.Username } }); //get user data from DB
        if (!user) return res.status(404).json({ success: false, msg: "User not found." });

        const check = bcrypt.compareSync( req.body.P_W, user.P_W );
        if (!check) return res.status(401).json({ success:false, accessToken:null, msg:"Invalid credentials!" });
        const token = jwt.sign(
            { id_Users: user.id_Users},
            config.SECRET, { expiresIn: '24h'});
        return res.status(200).json({ success: true, accessToken: token });
    }
    catch (err) {
        if (err instanceof ValidationError)
            res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            res.status(500).json({ success: false, msg: err.message || "Some error occurred at login."});
    }
}