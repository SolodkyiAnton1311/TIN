const db = require('../../config/mysql2/db');

exports.getKlients = () =>{ return db.promise().query('SELECT * FROM Klient').then((results,fields) =>
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
                capacity: firstRow.nazwisko,
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
    const id = newKlientData.id;
    const firstName = newKlientData.imie;
    const lastName = newKlientData.Nazwisko;
    const wiek = newKlientData.Wiek;
    const plec = newKlientData.Plec;
    const sql = "INSERT INTO Klient ( id_klient,Imie, Nazwisko, Wiek, Plec) VALUES (?,?,?,?,?);"
    return  db.promise().execute(sql,[id,firstName,lastName,wiek,plec]);
};

    exports.updateKlient = (klientId,klientDat)=> {
        const firstName = klientDat.imie;
        const lastName = klientDat.Nazwisko;
        const wiek = klientDat.Wiek;
        const plec = klientDat.Plec;
    const sql = "UPDATE Klient SET Imie = ?, Nazwisko = ?, Wiek = ?, Plec = ? WHERE id_klient = ?;"
    return   db.promise().execute(sql,[firstName,lastName,wiek,plec,klientId]);
};
exports.deleteKlient = (klientId) => {
    const sql = "DELETE FROM Klient WHERE id_klient = ?";
    return db.promise().execute(sql, [klientId]);
}




