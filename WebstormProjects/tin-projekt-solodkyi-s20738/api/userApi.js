const userRepository = require("../repository/mysql2/UserRepository");

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    userRepository.deleteUser(userId)
        .then(result => {
            res.status(200).json({
                message: 'Removed user',
                emp: result
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })};
exports.createUser = (req, res, next) => {
    userRepository.createUser(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};