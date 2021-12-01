const db = require('../../config/mysql2/db');

exports.getSklep = () =>{
    return db.promise().query('SELECT * FROM Sklep').then((results,fields) =>
{
    console.log(results[0]);
    return results[0];
})
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getSklepById = (sklepId) =>{
    const query ="SELECT dept.id_sklep AS id_sklep, dept.Adresa,dept.Data_otwarcia,e.id_klient AS id_klient,e.Imie,e.Nazwisko,e.Wiek,e.Plec,empl.id_sklep_klient AS id_sklep_klient,empl.data_ostatniego_wizutu_klienta,empl.data_nastepnego_wizytu,empl.straczona_summa FROM Sklep dept LEFT JOIN sklep_klient empl ON empl.id_sklep_klient = dept.id_sklep LEFT JOIN Klient e ON e.id_klient = dept.id_sklep WHERE dept.id_sklep = ?";

    return db.promise().query(query, [sklepId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const emp = {
                id: sklepId,
                adres: firstRow.Adresa,
                date: firstRow.Data_otwarcia,
                skleps  : []
            };
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.id_klient) {
                    const zakpy = {
                        id: row.id_sklep_klient,
                        straczona_summa:row.straczona_summa,

                    };
                    emp.skleps.push(zakpy);
                }
            }

            return emp;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });};

exports.createSklep = (newSklepData) => {
    const id = newSklepData.id;
    const adresa = newSklepData.Adresa;
    const dataOtwarcia = newSklepData.Data_otwarcia;
    const sql = "INSERT INTO Sklep ( id_sklep,Adresa, Data_otwarcia) VALUES (?,?,?);"
    return  db.promise().execute(sql,[id,adresa,dataOtwarcia]);
};
exports.updateSklep = (sklepId,sklepData)=> {
    const adresa = sklepData.Adresa;
    const Data_otwarcia = sklepData.Data_otwarcia;
    const sql = "UPDATE Sklep SET Adresa = ?, Data_otwarcia = ? WHERE id_sklep = ?;"
    return   db.promise().execute(sql,[adresa,Data_otwarcia,sklepId]);
};
exports.deleteSklep = (sklepId) => {
    const sql = "DELETE FROM Sklep WHERE id_sklep = ?";
    return db.promise().execute(sql, [sklepId]);
}



