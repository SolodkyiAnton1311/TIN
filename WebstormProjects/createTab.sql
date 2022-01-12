
CREATE SCHEMA 'tin-example';

CREATE TABLE Klient (
    id_klient integer  NOT NULL AUTO_INCREMENT,
    Nazwisko varchar(20)  NOT NULL,
    Wiek integer  NOT NULL,
    Plec char(1)  NOT NULL,
    CONSTRAINT Klient_pk PRIMARY KEY (id_klient)
) ;


CREATE TABLE Sklep (
    id_sklep integer  NOT NULL AUTO_INCREMENT,
    Adresa varchar(20)  NOT NULL,
    Data_otwarcia date  NOT NULL,
    CONSTRAINT Sklep_pk PRIMARY KEY (id_sklep)
) ;

-- Table: sklep_klientCREATE TABLE sklep_klient (
    id_sklep_klient integer  NOT NULL AUTO_INCREMENT,
    id_sklep integer  NOT NULL,
    id_klient integer  NOT NULL,
    data_ostatniego_wizutu_klienta date  NOT NULL,
    data_nastepnego_wizytu date  NULL,
    straczona_summa integer  NOT NULL,
    CONSTRAINT sklep_klient_pk PRIMARY KEY (id_sklep_klient)
) ;


-- Reference: sklep_klient_Klient (table: sklep_klient)
ALTER TABLE sklep_klient ADD CONSTRAINT sklep_klient_Klient
    FOREIGN KEY (id_klient)
    REFERENCES Klient (id_klient);

-- Reference: sklep_klient_Sklep (table: sklep_klient)
ALTER TABLE sklep_klient ADD CONSTRAINT sklep_klient_Sklep
    FOREIGN KEY (id_sklep)
    REFERENCES Sklep (id_sklep);

-- End of file.