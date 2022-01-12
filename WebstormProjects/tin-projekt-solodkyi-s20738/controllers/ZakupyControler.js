const ZakupyConroller = require("../repository/mysql2/ZakupyRepository");
const KlientRepository = require("../repository/mysql2/KlientRepository");
const SklepRepository = require("../repository/mysql2/SklepRepository");



exports.showZakupyList=(req,res,next) => {
    ZakupyConroller.getZakupy()
        .then(zakups => {
            res.render('pages/Zakupy/list', {
                zakups:zakups,
                navLocation:'Zakupy'
            });
        });
}
exports.showAddZakupyForm=(req,res,next) => {
   let allKlient,allSklep;
   KlientRepository.getKlients().then(klienci => {
       allKlient = klienci;
       return SklepRepository.getSklep();
   }).then(skleps => {
       allSklep = skleps;
       res.render("pages/Zakupy/form",
           {
               zakups:{},
               formMode:'createNew',
               allKlient:allKlient,
               allSklep:allSklep,
               pageTitle:req.__('zakupy.fields.list.pageTitle'),
               btnLabel:req.__('shop.fields.list.addNew'),
               formAction:'/zakups/add',
               navLocation:'Zakupy',
               validationErrors:[]
           });
   })


}
exports.showZakupyDetails=(req,res,next) => {
    const klientId = req.params.zakupyId;
    let allKlient,allSklep,zatar;
    KlientRepository.getKlients().then(klienci => {
        allKlient = klienci;
        return SklepRepository.getSklep();
    }).then(skleps => {
        allSklep = skleps;
        return ZakupyConroller.getZakupyById(klientId);

    }).then(zakupy => {
        zatar = zakupy;
        res.render("pages/Zakupy/form",
            {
                zakups:zatar,
                formMode:'showDetails',
                allKlient:allKlient,
                allSklep:allSklep,
                pageTitle:req.__('shop.fields.list.detailsTitle'),
                btnLabel:req.__('shop.fields.list.editTitle'),
                formAction:'zakups/edit/:sklepId',
                navLocation:'Zakupy',
                validationErrors:[]
            });
    })
    console.log(zatar)

}
exports.showEditZakupyFrom=(req,res,next) => {
    const klientId = req.params.zakupyId;
    let allKlient,allSklep,zatar;
    KlientRepository.getKlients().then(klienci => {
        allKlient = klienci;
        return SklepRepository.getSklep();
    }).then(skleps => {
        allSklep = skleps;
        return ZakupyConroller.getZakupyById(klientId);
    }).then(zakupy => {
        zatar = zakupy;
        res.render("pages/Zakupy/form",
            {
                zakups:zatar,
                formMode:'edit',
                allKlient:allKlient,
                allSklep:allSklep,
                pageTitle:req.__('shop.fields.list.editTitle'),
                btnLabel:req.__('form.actions.edit'),
                formAction:'/zakups/edit/',
                navLocation:'Zakupy',
                validationErrors:[]
            });
    })

    }
exports.addZakupy =(req, res, next) => {

    const id_klient={...req.body};
    ZakupyConroller.createZakupy(id_klient).then(result =>{
        res.redirect('/zakups');
    }).catch(err =>{
        let allKlient,allSklep;
        KlientRepository.getKlients().then(klienci => {
            allKlient = klienci;
            return SklepRepository.getSklep();
        }).then(skleps => {
            allSklep = skleps;
            res.render("pages/Zakupy/form",
                {
                    zakups:{},
                    formMode:'createNew',
                    allKlient:allKlient,
                    allSklep:allSklep,
                    pageTitle:'Nowe Zakupy',
                    btnLabel:'Dodaj zakupy',
                    formAction:'/zakups/add',
                    navLocation:'Zakupy',
                    validationErrors:err.details
                });
            console.log(err.details)
        })
    });

};
exports.updateZakupy =(req, res, next) => {
    const zakupyId = req.body.zakupyId;
    const zakupyData ={...req.body};
    console.log(zakupyData)
    console.log(zakupyId)
    ZakupyConroller.updateZakupy(zakupyId,zakupyData).then(result =>{
        res.redirect('/zakups');
    }).catch(err =>{
        const klientId = req.params.zakupyId;
        let allKlient,allSklep,zatar;
        KlientRepository.getKlients().then(klienci => {
            allKlient = klienci;
            return SklepRepository.getSklep();
        }).then(skleps => {
            allSklep = skleps;
            return ZakupyConroller.getZakupyById(klientId);
        }).then(zakupy => {
            zatar = zakupy;
            res.render("pages/Zakupy/form",
                {
                    zakups:zatar,
                    formMode:'createNew',
                    allKlient:allKlient,
                    allSklep:allSklep,
                    pageTitle:'Edytuj Zakupy',
                    btnLabel:'Edytuj zakupy',
                    formAction:'/zakups/edit/',
                    navLocation:'Zakupy',
                    validationErrors:err.details
                });
        })

        });

};
exports.deleteZakupy =(req, res, next) => {
    const klientId = req.params.zakupyId;
    ZakupyConroller.deleteZakupy(klientId)
        .then(() => {
            res.redirect('/zakups');
        });
};