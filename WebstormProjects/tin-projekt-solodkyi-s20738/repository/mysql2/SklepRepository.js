const db = require('../../config/mysql2/db');
exports.getSklep = () =>{ return db.promise().query('SELECT * FROM Sklep').then((results,fields) =>
{
    console.log(results[0]);
    return results[0];
})
    .catch(err => {
        console.log(err);
        throw err;
    });
    const query = 'SELECT '};

exports.getSklepById = (sklepId) =>{
    const query ='SELECT dept.id AS id_sklep, dept.adres,dept.Data_otwarcia,\n' +
        'e.id as id_klient,e.imie,e.nazwisko,e.wiek,e.plec, empl.id AS id_sklep_klient,empl.data_ostatniego_wizutu_klientra,empl.data_nastepnego_wizytu,\n' +
        'empl.straczona_summa\n' +
        'FROM Sklep dept\n' +
        ' LEFT JOIN sklep_klient empl ON empl.id_sklep_klient = dept.id_sklep\n' +
        ' LEFT JOIN Klient dept ON empl.id_sklep_klient = e.id_klient\n' +
        '     WHERE dept.id_sklep = ?';

    return db.promise().query(query, [sklepId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const emp = {
                id: parseInt(sklepId),
                name: firstRow.imie,
                capacity: firstRow.nazwisko,
                skleps  : []
            };
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.empl.id) {
                    const zakpy = {
                        id: row.id_sklep_klient,
                        date: row.data_ostatniego_wizutu,
                        date: row.data_nastepnego_wizutu,
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
exports.createSklep = (newSklepData) => { const firstName = newEmpData.imie;
    const Adres = newSklepData.Adresa;
    const data_otwarcia = newSklepData.data_otwarcia;
    const sql = 'INSERT INTO Sklep ( `Adresa`, `data_otwarcia`) VALUES (?,?);'
    return   db.promise().execute(sql,[Adres,data_otwarcia]);};
exports.updateSklep =(sklepId,SklepData)=> {
    const Adres = SklepData.Adresa;
    const data_otwarcia = SklepData.data_otwarcia;
    const sql = 'UPDATE Sklep SET `Adresa` = ?, `data_otwarcia` = ? WHERE `Sklep`.`id_sklep` = ?;'
    return   db.promise().execute(sql,[Adres,data_otwarcia]);
};
exports.deleteSklep = (sklepId) => {
    const sql1 = 'DELETE FROM `Sklep` WHERE `Sklep`.`id_sklep` = ?; '
    const sql2 = 'DELETE FROM `Sklep` WHERE id = ?; '
    return db.promise().execute(sql1,[sklepId]).then(() => {
        return db.promise().execute(sql2[sklepId])
    })};



