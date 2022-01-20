const ZakupyRepository = require('../repository/mysql2/ZakupyRepository');
const KlientRepositoru = require('../repository/mysql2/KlientRepository');
const SklepRepositoru = require('../repository/mysql2/SklepRepository');

exports.getZakupy = (reg, res, next) => {
    ZakupyRepository.getZakupy()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getZakupyById = (req, res, next) => {
    const empId = req.params.zakupyId;
    let klients,skleps;
    KlientRepositoru.getKlients().then(klient =>{
        klients=klient;
        return SklepRepositoru.getSklep()
    }).then(skep=>{
        skleps = skep;
        return   ZakupyRepository.getZakupyById(empId)
    }).then(emp => {
            if (!emp) {
                res.status(404).json({
                    message: 'Employee with id: ' + empId + ' not found'
                })
            } else {
                emp.allSkleps = skleps;
                emp.allKlients = klients;
                console.log(emp)
                res.status(200).json(emp);
            }
        });
};
exports.createZakupy = (req, res, next) => {
    ZakupyRepository.createZakupy(req.body)
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
exports.updateZakupy = (req, res, next) => {
    const empId = req.params.zakupyId;
    ZakupyRepository.updateZakupy(empId, req.body)
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
exports.deleteZakupy = (req, res, next) => {
    const empId = req.params.zakupyId;
    ZakupyRepository.deleteZakupy(empId)
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