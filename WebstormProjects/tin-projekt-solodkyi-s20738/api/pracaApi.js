const PracaRepository = require('../repository/mysql2/Praca');
const PracownikRepositoru = require('../repository/mysql2/PracownikRepository');
const SklepRepositoru = require('../repository/mysql2/SklepRepository');

exports.getPraca = (reg, res, next) => {
    PracaRepository.getPraca()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getPracaById = (req, res, next) => {
    const empId = req.params.pracaId;
    let pracowniki,skleps;
    PracownikRepositoru.getPracowniki().then(pracownik =>{
        pracowniki=pracownik;
        return SklepRepositoru.getSklep()
    }).then(skep=>{
        skleps = skep;
        return   PracaRepository.getPracaById(empId)
    }).then(emp => {
        if (!emp) {
            res.status(404).json({
                message: 'Employee with id: ' + empId + ' not found'
            })
        } else {
            emp.allSkleps = skleps;
            emp.allPracowniki = pracowniki;
            console.log(emp)
            res.status(200).json(emp);
        }
    });
};
exports.createZakupy = (req, res, next) => {
    console.log( req.body)
    PracaRepository.createPraca(req.body)
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
    const empId = req.params.pracaId;
    PracaRepository.updatePraca(empId, req.body)
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
    const empId = req.params.pracaId;
    PracaRepository.deletePraca(empId)
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