const SklepRepository = require('../repository/mysql2/SklepRepository');
const KlientRepository = require("../repository/mysql2/KlientRepository");
exports.getSklep = (reg, res, next) => {
    SklepRepository.getSklep()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getSklepById = (req, res, next) => {
    const empId = req.params.sklepId;
    SklepRepository.getSklepById(empId)
        .then(emp => {
            if (!emp) {
                res.status(404).json({
                    message: 'Employee with id: ' + empId + ' not found'
                })
            } else {
                res.status(200).json(emp);
            }
        });
};
exports.createSklep = (req, res, next) => {
    SklepRepository.createSklep(req.body)
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
exports.updateSklep = (req, res, next) => {
    const empId = req.params.sklepId;
    SklepRepository.updateSklep(empId, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Employee updated!',
                emp: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteSklep = (req, res, next) => {
    const empId = req.params.sklepId;
    SklepRepository.deleteSklep(empId)
        .then(result => {
            res.status(200).json({
                message: 'Removed employee',
                emp: result
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};