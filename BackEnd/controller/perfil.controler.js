const db = require('../models/connect.js');
const Post = db.Post;

const { Op } = require('sequelize');
const { ErrorHandler } = require("../utils/error.js");

let getPostsFromUser = async (req, res, next) => {

    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'username', 'role'],
        });
        
        if (!user) 
            throw new ErrorHandler(404,`Cannot find any USER with ID ${req.params.id}.`);
        
        const posts = await user.getPosts({attributes: { exclude: ['author'] }})

        posts.forEach(post => {
            post.dataValues.links = [
                { rel: "self", href: `/posts/${post.id}`, method: "GET" },
                { rel: "delete", href: `/posts/${post.id}`, method: "DELETE" },
                { rel: "modify", href: `/posts/${post.id}`, method: "PUT" },
                // link to add tags to the post
                { rel: "add-tags", href: `/posts/${post.id}/tags`, method: "POST" },
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