const KlientRepository = require("../repository/mysql2/KlientRepository");

exports.showKlientList = (req, res, next) => {
    KlientRepository.getKlients()
        .then(klientId => {
            res.render('pages/Klient/list', {
                klienci:klientId,
                navLocation:'klient'
            });
        });
}

exports.showAddKlientForm=(req,res,next) => {
    res.render('pages/Klient/form',{
        klient:{},
        pageTitle:'Nowy Klient',
        formMode:'createNew',
        btnLabel:'Dodaj klienta',
        formAction:'/klients/add',
        navLocation:'klient',
        validationErrors:[]
    });
}
exports.showKlientDetails=(req,res,next) => {
    const klientId = req.params.klientId;
    KlientRepository.getKlientsById(klientId).then(klient =>{
        res.render('pages/Klient/form',{
            klient: klient,
        formMode:'showDetails',
        pageTitle:'Szegoly Klienta',
            btnLabel:'Edytuj Klient',
            formAction:'edit/klientId',
            validationErrors:[]
    });})

};
exports.showKlientEditForm=(req, res, next) => {
    const id_klient = req.params.klientId;
    KlientRepository.getKlientsById(id_klient).then(klientId =>{
        res.render('pages/Klient/form',{
            klient: klientId,
            formMode: 'edit',
            pageTitle: 'Edycja klienta',
            btnLabel: 'Edytuj klienta',
            formAction: '/klients/edit/',
            navLocation: 'klient',
            validationErrors:[]
        });
    })

};
exports.addKlient =(req, res, next) => {
    const id_klient={...req.body};
    KlientRepository.createKlient(id_klient).then(result =>{
        res.redirect('/klients');
    }).catch(err =>{
        res.render('pages/Klient/form',{
            klient:id_klient,
            pageTitle:'Nowy Klient',
            formMode:'createNew',
            btnLabel:'Dodaj klienta',
            formAction:'/klients/add',
            navLocation:'klient',
            validationErrors :err.details
        });
        console.log(err.details)
    })
};
exports.updateKlient =(req, res, next) => {
    const klientId = req.body.klientId;
    const klientData ={...req.body};
    console.log(klientId);
    console.log(klientData);

    KlientRepository.updateKlient(klientId,klientData).then(result =>{
        res.redirect('/klients');
    }).catch(err =>{
        res.render('pages/Klient/form',{
            klient: klientId,
            pageTitle:'Edytuj Klient',
            formMode:'edit',
            btnLabel:'Dodaj klienta',
            formAction:'/klients/edit',
            navLocation:'klient',
            validationErrors :err.details
        });
    });
};
exports.deleteKlient =(req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.deleteKlient(klientId)
        .then(() => {
            res.redirect('/klients');
        });
};
