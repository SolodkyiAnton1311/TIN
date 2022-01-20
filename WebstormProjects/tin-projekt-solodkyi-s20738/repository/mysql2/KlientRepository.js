const db = require('../../config/mysql2/db');
const klientSchema = require('../../model/joi/Klient');

exports.getKlients = () =>{
    return db.promise().query('SELECT * FROM Klient').then((results,fields) =>
{
    console.log(results[0]);
    return results[0];
})
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getKlientsById = (klientId) =>{
    const query = "SELECT e.id_klient as id_klient,e.imie,e.nazwisko,e.wiek,e.plec, empl.id_sklep_klient AS id_sklep_klient,empl.data_ostatniego_wizutu_klienta,empl.data_nastepnego_wizytu,empl.straczona_summa,dept.id_sklep AS id_sklep, dept.Adresa,dept.Data_otwarcia FROM Klient e LEFT JOIN sklep_klient empl ON empl.id_sklep_klient = e.id_klient LEFT JOIN Sklep dept ON empl.id_sklep_klient = dept.id_sklep WHERE e.id_klient = ?";
    return db.promise().query(query, [klientId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const emp = {
                id: klientId,
                name: firstRow.imie,
                lastName: firstRow.nazwisko,
                wiek: firstRow.wiek,
                plec: firstRow.plec,
                klients  : []
            };
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.id_klient) {
                    const zakpy = {
                        id: row.id_sklep_klient,
                        date: row.data_ostatniego_wizutu_klienta,
                        dateNext: row.data_nastepnego_wizytu,
                        Sklep:{
                            id: row.id_sklep,
                            name: row.Adresa,
                            date:row.Data_otwarcia
                        }
                    };
                    emp.klients.push(zakpy);
                }
            }

            return emp;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });};
exports.createKlient = (newKlientData) => {
    const vRes = klientSchema.validate(newKlientData,{abortEarly:false});
    if (vRes.error)
    {
        return Promise.reject(vRes.error);
    }

    const sql = "INSERT INTO Klient ( Imie, Nazwisko, Wiek, Plec) VALUES (?,?,?,?);"
    return  db.promise().execute(sql,[newKlientData.Imie,newKlientData.Nazwisko,newKlientData.Wiek,newKlientData.Plec]);

};

    exports.updateKlient = (klientId,newKlientData)=> {
        console.log(newKlientData);
        console.log(klientId);
        const vRes = klientSchema.validate(newKlientData,{abortEarly:false});
        if (vRes.error)
        {
            return Promise.reject(vRes.error);
        }
    const sql = "UPDATE Klient SET Imie = ?, Nazwisko = ?, Wiek = ?, Plec = ? WHERE id_klient = ?;"
    return   db.promise().execute(sql,[newKlientData.Imie,newKlientData.Nazwisko,newKlientData.Wiek,newKlientData.Plec,klientId]);

};


exports.deleteKlient = (klientId) => {
    const sql = "DELETE FROM Klient WHERE id_klient = ?";
    return db.promise().execute(sql, [klientId]);
}




