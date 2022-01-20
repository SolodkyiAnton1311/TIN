const KlientRepository = require('../repository/mysql2/KlientRepository');
exports.getKlients = (reg, res, next) => {
    KlientRepository.getKlients()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getKlientsById = (req, res, next) => {
    const empId = req.params.klientId;
    KlientRepository.getKlientsById(empId)
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
exports.createKlient = (req, res, next) => {
    KlientRepository.createKlient(req.body)
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
exports.updateKlient = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.updateKlient(klientId, req.body)
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
exports.deleteKlient = (req, res, next) => {
    const empId = req.params.klientId;
    KlientRepository.deleteKlient(empId)
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