exports.showKlientList=(req,res,next) => {
    res.render('pages/Klient/list',{});
}
exports.showAddKlientForm=(req,res,next) => {
    res.render('pages/Klient/form',{});
}
exports.showKlientDetails=(req,res,next) => {
    res.render('pages/Klient/details',{});
}
