const db = require('../../config/mysql2/db');
const klientSchema = require('../../model/joi/Klient');

exports.getPracowniki = () =>{ return db.promise().query('SELECT * FROM Pracownik').then((results,fields) =>
{
    console.log(results[0]);
    return results[0];
})
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getPracownikById = (pracownikId) =>{
    const query = "SELECT e.id_pracownik as id_pracownik,e.imie,e.nazwisko,e.stawka, empl.id_pracownik AS id,empl.id_pracownik,empl.data_zatrudnienia,empl.id_sklep,dept.id_sklep AS id_sklep, dept.Adresa,dept.Data_otwarcia FROM Pracownik e LEFT JOIN sklep_pracownik empl ON empl.id = e.id_pracownik LEFT JOIN Sklep dept ON empl.id = dept.id_sklep WHERE e.id_pracownik = ?";
    return db.promise().query(query, [pracownikId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const emp = {
                id_pracownik: pracownikId,
                Imie: firstRow.imie,
                Nazwisko: firstRow.nazwisko,
                Stawka: firstRow.stawka
            };
            return emp;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });};
exports.createPracownik = (newPracownikData) => {

    console.log(newPracownikData)
    const sql = "INSERT INTO Pracownik ( imie, nazwisko, stawka) VALUES (?,?,?);"
    return  db.promise().execute(sql,[newPracownikData.imie,newPracownikData.nazwisko,newPracownikData.stawka]);

};

exports.updatePracownik = (pracownikId, newPracownikData)=> {
    console.log(newPracownikData)
    const sql = "UPDATE Pracownik SET id_pracownik=?, imie = ?, nazwisko = ?, stawka = ? WHERE id_pracownik = ?;"
    return   db.promise().execute(sql,[pracownikId,newPracownikData.imie,newPracownikData.nazwisko,newPracownikData.stawka,pracownikId]);

};
exports.deleteKlient = (pracownikId) => {
    const sql = "DELETE FROM Pracownik WHERE id_pracownik = ?";
    return db.promise().execute(sql, [pracownikId]);
}




