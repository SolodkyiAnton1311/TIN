const SklepRepository = require("../repository/mysql2/SklepRepository");
exports.showSklepList=(req,res,next) => {
        SklepRepository.getSklep()
        .then(skleps => {
            res.render('pages/Sklepy/list', {
                skleps:skleps,
                navLocation:'Sklep'
            });
        });
}
exports.showAddSkelpForm=(req,res,next) => {
    res.render('pages/Sklepy/form',{
            sklep:{},
            pageTitle:'Nowy Sklep',
            formMode:'createNew',
            btnLabel:'Dodaj sklep',
            formAction:'/skleps/add',
            navLocation:'sklep',
         validationErrors:[]

    });
}
exports.showSklepDetails=(req,res,next) => {
    const sklepId = req.params.sklepId;
    SklepRepository.getSklepById(sklepId).then(sklep =>{
        res.render('pages/Sklepy/form',{
            sklep: sklep,
            formMode:'showDetails',
            pageTitle:'Szegoly Sklepa',
            btnLabel:'Edytuj Sklep',
            formAction:'edit/sklepId',
            validationErrors:[]

        });})

}
exports.showEditSklepForm=(req, res, next) => {
    const sklepId = req.params.sklepId;
    SklepRepository.getSklepById(sklepId).then(sklep =>{
        res.render('pages/Sklepy/form',{
            sklep: sklep,
            formMode: 'edit',
            pageTitle: 'Edycja sklepa',
            btnLabel: 'Edytuj sklep',
            formAction: '/skleps/edit/',
            navLocation: 'skleps',
            validationErrors:[]
        });
    })

}
exports.addSklep =(req, res, next) => {
    const id_klient={...req.body};
    console.log(id_klient);
    SklepRepository.createSklep(id_klient).then(result =>{
        res.redirect('/skleps');
    }).catch(err =>{
        res.render('pages/Zakupy/form',{
            sklep:{},
            pageTitle:'Nowy Sklep',
            formMode:'createNew',
            btnLabel:'Dodaj sklep',
            formAction:'/skleps/add',
            navLocation:'skleps',
            validationErrors:err.details
        });
        console.log(err.details)
    });

};
exports.updateSklep =(req, res, next) => {
    const sklepId = req.body.sklepId;
    const sklepData ={...req.body};
    console.log(sklepId);
    console.log(sklepData);
    SklepRepository.updateSklep(sklepId,sklepData).then(result =>{
        res.redirect('/skleps');
    }).catch(err =>{
        res.render('pages/Zakupy/form',{
            sklep:{},
            pageTitle:'Nowy Sklep',
            formMode:'edit',
            btnLabel:'Dodaj sklep',
            formAction:'/skleps/edit',
            navLocation:'skleps',
            validationErrors:err.details
        });
        console.log(err.details)
    });
};
exports.deleteSklep =(req, res, next) => {
    const klientId = req.params.sklepId;
    SklepRepository.deleteSklep(klientId)
        .then(() => {
            res.redirect('/skleps');
        });
};