const db = require('../../config/mysql2/db');
exports.getZakupy = () =>{
    const query = 'SELECT empl.id as sklep_klient.id_sklep_klient , empl.data_ostatniego_wizutu_klient,empl.straczonna_summa,empl.data_nastepnego_wizytu,dept.id as id_sklep , dept.adres,dept.data_otwarcia, e.id as Klient.id_klient, e.imie,e.nazwisko,e.wiek,e.plec\n' +
    'FROM sklep_klient\n' +
    'LEFT JOIN Klient e on sklep_klient.id_klient = e.id\n' +
    'LEFT JOIN Sklep e on sklep_klient.id_sklep = dept.id;'
    return db.promise().query(query)
        .then((results, fields) => {
                const zakups = [];
                for (let i = 0; i < results[0].length; i++)
                {
                    const row = results[0][i];
                    const employment =
                        {
                            id:row.sklep_klient.id_sklep_klient,
                            date_ostatniego_wizutu: row.date_ostatniego_wizutu,
                            date_nastepnego_wizytu: row.date_nastepnego_wizytu,
                            straczona_summa: row.straczona_summa,
                            Sklep:
                                {
                                    id:row.id_sklep,
                                    Adresa:row.Adresa,
                                    data_otwarcia:row.data_otwarcia
                                },
                            Klient:
                                {
                                    id:row.id_klient,
                                    imie:row.imie,
                                    wiek:row.wiek,
                                    plec:row.plec,
                                }

                        }
                    zakups.push(employment);
                }
                console.log(employment);
                return employment
            }
            ,).catch(err =>
        {
            console.log(err)
        });};
exports.getZakupyById = (zakupyId) =>{const query = 'SELECT empl.id as sklep_klient.id_sklep_klient , empl.data_ostatniego_wizutu_klient,empl.straczonna_summa,empl.data_nastepnego_wizytu,dept.id as id_sklep , dept.adres,dept.data_otwarcia, e.id as Klient.id_klient, e.imie,e.nazwisko,e.wiek,e.plec\n' +
    'FROM sklep_klient\n' +
    'LEFT JOIN Klient e on sklep_klient.id_klient = e.id\n' +
    'LEFT JOIN Sklep e on sklep_klient.id_sklep = dept.id;'
    return db.promise().query(query)
        .then((results, zakupyId) => {
                const zakups = [];
                for (let i = 0; i < results[0].length; i++)
                {
                    const row = results[0][i];
                    const employment =
                        {
                            id:row.sklep_klient.id_sklep_klient,
                            date_ostatniego_wizutu: row.date_ostatniego_wizutu,
                            date_nastepnego_wizytu: row.date_nastepnego_wizytu,
                            straczona_summa: row.straczona_summa,
                            Sklep:
                                {
                                    id:row.id_sklep,
                                    Adresa:row.Adresa,
                                    Data_otwarcia:row.Data_otwarcia
                                },
                            Klient:
                                {
                                    id:row.id_klient,
                                    imie:row.imie,
                                    wiek:row.wiek,
                                    plec:row.plec,
                                }

                        }
                    zakups.push(employment);
                }
                console.log(employment);
                return employment
            }
            ,).catch(err =>
        {
            console.log(err)
        });
};
exports.createZakupy = (newZakupyData) => {
   const  sql = 'INSERT INTO sklep_klient (`id_sklep_klient`, `id_sklep`, `id_klient`, `data_ostatniego_wizutu_klienta`, `data_nastepnego_wizytu`, `straczona_summa`) VALUES (?,?,?,?,?,?)'
       return   db.promise().execute(sql,[newZakupyData.id_sklep_klient,newZakupyData.id,newZakupyData.id,newZakupyData.date_ostatniego_wizutu,newZakupyData.date_nastepnego_wizytu,newZakupyData.straczona_summa]);};
exports.updateZakupy =(klientId,klientDat)=> {
    klientDat.date_nastepnego_wizytu ? data.date_nastepnego_wizytu:null;
    const sql = 'UPDATE sklep_klient SET `klient_id` = ?, `sklep_id` = ?, `Data_ostatniego_wizutu` = ?, `straczonna_summa` = ? WHERE `sklep_klient`.`id_klient` = ?;'
    return   db.promise().execute(sql,[firstName,lastName,wiek,plec]);
};
exports.deleteZakupy = (zakupyId) => {
    const sql = 'DELETE FROM sklep_klient WHERE id IN  (?); '
    return db.promise().execute(sql[zakupyId]);
}






