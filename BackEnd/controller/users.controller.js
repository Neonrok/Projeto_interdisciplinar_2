const db = require('../models/connect.js');
const Post = db.Post;

const { Op } = require('sequelize');
const { ErrorHandler } = require("../utils/error.js");

let getInfosFromUser = async (req, res, next) => {

    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'username', 'role'],
        });
        
        if (!user) 
            throw new ErrorHandler(404,`Cannot find any USER with ID ${req.params.id}.`);
        
        const posts = await user.getPosts({attributes: { exclude: ['author'] }})

        posts.forEach(post => {
            post.dataValues.links = [
                { rel: "self", href: `/`, method: "GET" }
            ]
        });

        user.dataValues.posts = posts;
        return res.status(200).json({
            data: user
        });
    }
    catch (err) {
        next(err);
    }
};
module.exports = {
    getInfosFromUser
}