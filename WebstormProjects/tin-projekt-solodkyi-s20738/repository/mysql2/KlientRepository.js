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
    const query = 'SELECT e.id as id_klient,e.imie,e.nazwisko,e.wiek,e.plec, empl.id AS id_sklep_klient,empl.data_ostatniego_wizutu_klientra,empl.data_nastepnego_wizytu,'+
    ' empl.straczona_summa' +
    'dept.id AS id_sklep, dept.adres,dept.Data_otwarcia'+
    'FROM Klient e'+
    'LEFT JOIN sklep_klient empl ON empl.id_sklep_klient = e.id_klient'+
    'LEFT JOIN Sklep dept ON empl.id_sklep_klient = dept.id_sklep'+
    ' WHERE e.id_klient = ?'

    return db.promise().query(query, [klientId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const emp = {
                id: parseInt(klientId),
                name: firstRow.imie,
                capacity: firstRow.nazwisko,
                klients  : []
            };
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.empl.id) {
                    const zakpy = {
                        id: row.id_sklep_klient,
                        date: row.data_ostatniego_wizutu,
                        date: row.data_nastepnego_wizutu,
                        Sklep:{
                            id: row.empl.id,
                            name: row.name,
                            date:row.data_otwarcia
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
exports.createKlient = (newKlientData) => { const firstName = newEmpData.imie;
    const lastName = newKlientData.Nazwisko;
    const wiek = newKlientData.Wiek;
    const plec = newKlientData.Plec;
    const sql = "INSERT INTO Klient ( `Imie`, `Nazwisko`, `Wiek`, `Plec`) VALUES (?,?,?,?);"
    return   db.promise().execute(sql,[firstName,lastName,wiek,plec]);};
exports.updateKlient =(klientId,klientDat)=> {
    const firstName = newEmpData.imie;
    const lastName = newEmpData.Nazwisko;
    const wiek = newEmpData.Wiek;
    const plec = newEmpData.Plec;
    const sql = "UPDATE Klient SET `Imie` = ?, `Nazwisko` = ?, `Wiek` = ?, `Plec` = ? WHERE Klient.`id_klient` = ?;"
    return   db.promise().execute(sql,[firstName,lastName,wiek,plec]);
};
exports.deleteKlient = (klientId) => {
    const sql1 = "DELETE FROM Klient WHERE Klient.`id_klient` = ?; "
    const sql2 = "DELETE FROM Klient WHERE id = ?; "
    return db.promise().execute(sql1,[klientId]).then(() => {
        return db.promise().execute(sql2[klientId])
    })};



