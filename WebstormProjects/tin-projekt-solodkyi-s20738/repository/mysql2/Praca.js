const db = require('../../config/mysql2/db');
exports.getPraca = () =>{
    const query ="SELECT empl.id AS id , empl.data_zatrudnienia, dept.id_sklep as id_sklep ,  dept.Adresa, e.id_pracownik as id_pracownik, e.imie,e.nazwisko,e.stawka FROM sklep_pracownik empl LEFT JOIN Pracownik e on empl.id_pracownik = e.id_pracownik     LEFT JOIN Sklep dept on empl.id_sklep = dept.id_sklep ";
    return db.promise().query(query)
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });

};
exports.getPracaById = (pracaId) =>{
    const query ="SELECT empl.id AS id , empl.data_zatrudnienia, dept.id_sklep as id_sklep ,  dept.Adresa, e.id_pracownik as id_pracownik, e.imie,e.nazwisko,e.stawka FROM sklep_pracownik empl LEFT JOIN Pracownik e on empl.id_pracownik = e.id_pracownik     LEFT JOIN Sklep dept on empl.id_sklep = dept.id_sklep \n   WHERE empl.id = ?";

    return db.promise().query(query, [pracaId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const emp = {
                id: pracaId,
                data_zatrudnienia: firstRow.data_zatrudnienia,
                id_sklep: firstRow.id_sklep,
                id_pracownik: firstRow.id_pracownik,
                imie: firstRow.imie,
                nazwisko: firstRow.nazwisko,
                stawka: firstRow.stawka,
                adres: firstRow.Adresa,
                allPracowniki:[],
                allSkleps:[]
            };
            return emp;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};
exports.createPraca = (newPracaData) => {
    console.log(newPracaData)
    var data_zatrudnienia = newPracaData.data_zatrudnienia
    const sql = "INSERT INTO sklep_pracownik ( id_sklep, id_pracownik,data_zatrudnienia) VALUES (?,?,?);"
    return  db.promise().execute(sql,[newPracaData.id_sklep,newPracaData.id_pracownik,data_zatrudnienia]);
};

exports.updatePraca = (pracaId,pracaData)=> {
    //const vRes = klientSchema.validate(pracaData,{abortEarly:false});
    //if (vRes.error)
    //{
    //    return Promise.reject(vRes.error);
    //}
    var date = new Date(pracaData.data_zatrudnienia),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day = ("0" + (date.getDate()+1)).slice(-2);
    pracaData.data_zatrudnienia = [date.getFullYear(), mnth, day].join("-");
    console.log(pracaData)
    console.log(pracaId)
    const sql = "UPDATE sklep_pracownik SET  id_sklep = ?,id_pracownik = ?,data_zatrudnienia = ? WHERE id = ?;"
    return db.promise().execute(sql,[pracaData.id_sklep,pracaData.id_pracownik,pracaData.data_zatrudnienia,pracaId]);
};
exports.deletePraca = (pracaId) => {
    const sql = "DELETE FROM sklep_pracownik WHERE id = ?";
    return db.promise().execute(sql, [pracaId]);
}






