const db = require('../models/connect.js');
const Post = db.Post;

const { Op } = require('sequelize');
const { ErrorHandler } = require("../utils/error.js");

