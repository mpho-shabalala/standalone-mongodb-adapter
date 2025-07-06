const User = require('../models/User');
const { findById, findByEmail, createOne } = require('../dbUtils/modelMethods');

exports.getUserById = findById(User);
exports.getUserByEmail = findByEmail(User);
exports.createUser = createOne(User);