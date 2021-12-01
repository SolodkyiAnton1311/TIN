const db = require('../../config/mysql2/db');
exports.getZakupy = () =>{
    const query ="SELECT empl.id_sklep_klient AS id_sklep_klient , empl.data_ostatniego_wizutu_klienta,empl.straczona_summa,empl.data_nastepnego_wizytu, dept.id_sklep as id_sklep ,  dept.Adresa,dept.Data_otwarcia, e.id_klient as id_klient, e.imie,e.nazwisko,e.wiek,e.plec     FROM sklep_klient empl     LEFT JOIN Klient e on empl.id_klient = e.id_klient     LEFT JOIN Sklep dept on empl.id_sklep = dept.id_sklep";
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
exports.getZakupyById = (zakupyId) =>{
    const query ="SELECT empl.id_sklep_klient AS id_sklep_klient , empl.data_ostatniego_wizutu_klienta,empl.straczona_summa,empl.data_nastepnego_wizytu, dept.id_sklep as id_sklep ,  dept.Adresa,dept.Data_otwarcia, e.id_klient as id_klient, e.imie,e.nazwisko,e.wiek,e.plec     FROM sklep_klient empl     LEFT JOIN Klient e on empl.id_klient = e.id_klient     LEFT JOIN Sklep dept on empl.id_sklep = dept.id_sklep   WHERE id_sklep_klient = ?";

    return db.promise().query(query, [zakupyId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const emp = {
                id: id_sklep_klient,
                DataVizytu: firstRow.data_ostatniego_wizutu_klienta,
                straczona_summa: firstRow.straczona_summa,
                DataNastepnego: firstRow.data_nastepnego_wizytu,
                id_sklep: firstRow.id_sklep,
                id_klient: firstRow.id_klient,
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
        });
};
exports.createZakupy = (newZakupyData) => {
    const id = newZakupyData.id;
    const id_sklep = newZakupyData.id_sklep;
    const id_klient = newZakupyData.id_klient;
    const DataVizytu = newZakupyData.DataVizytu;
    const DataNastepnego = newZakupyData.DataNastepnego;
    const straczona_summa = newZakupyData.straczona_summa;
    const sql = "INSERT INTO sklep_klient ( id_sklep_klient,id_sklep, id_klient,data_ostatniego_wizutu_klienta,data_nastepnego_wizytu,straczona_summa) VALUES (?,?,?,?,?,?);"
    return  db.promise().execute(sql,[id,id_sklep,id_klient,DataVizytu,DataNastepnego,straczona_summa]);
};

exports.updateZakupy = (zakupyId,zakupyData)=> {
    const id_sklep = zakupyData.id_sklep;
    const id_klient = zakupyData.id_klient;
    const DataVizytu = zakupyData.DataVizytu;
    const DataNastepnego = zakupyData.DataNastepnego;
    const straczona_summa = zakupyData.straczona_summa;
    const sql = "UPDATE sklep_klient SET id_sklep = ?, id_klient = ?,data_ostatniego_wizutu_klienta = ?,data_nastepnego_wizytu = ?,straczona_summa = ? WHERE id_sklep = ?;"
    return   db.promise().execute(sql,[id_sklep,id_klient,DataVizytu,DataNastepnego,straczona_summa,zakupyId]);
};
exports.deleteZakupy = (zakupyId) => {
    const sql = "DELETE FROM sklep_klient WHERE id_sklep_klient = ?";
    return db.promise().execute(sql, [zakupyId]);
}






