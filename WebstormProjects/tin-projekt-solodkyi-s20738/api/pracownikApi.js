const PracownikRepository = require('../repository/mysql2/PracownikRepository');
exports.getKlients = (reg, res, next) => {
    PracownikRepository.getPracowniki()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getKlientsById = (req, res, next) => {
    const empId = req.params.pracownikId;
    PracownikRepository.getPracownikById(empId)
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
    PracownikRepository.createPracownik(req.body)
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
    const klientId = req.params.pracownikId;
    PracownikRepository.updatePracownik(klientId, req.body)
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
    const empId = req.params.pracownikId;
    PracownikRepository.deleteKlient(empId)
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