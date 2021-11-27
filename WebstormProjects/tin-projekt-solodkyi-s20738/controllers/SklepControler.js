exports.showKlientList=(req,res,next) => {
    res.render('pages/Sklepy/list',{});
}
exports.showAddKlientForm=(req,res,next) => {
    res.render('pages/Sklepy/form',{});
}
exports.showKlientDetails=(req,res,next) => {
    res.render('pages/Sklepy/details',{});
}