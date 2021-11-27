exports.showKlientList=(req,res,next) => {
    res.render('pages/Zakupy/list',{});
}
exports.showAddKlientForm=(req,res,next) => {
    res.render('pages/Zakupy/form',{});
}
exports.showKlientDetails=(req,res,next) => {
    res.render('pages/Zakupy/details',{});
}