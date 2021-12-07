const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = 'Pole powinno zawierać co najmniej ${err.local.limit} znaki';
                break;
            case "string.max":
                err.message = 'Pole powinno zawierać co najwyżej ${err.local.limit} znaki';
                break;
            default:
                break;
        }
    });
    return errors;
};

const klientSchema = Joi.object(
    {
        zakupyId:Joi.number().optional().allow(""),
        id_sklep: Joi.number().optional().allow(""),
        id_klient: Joi.number().optional().allow(""),
        DataVizytu: Joi.date().min("01-01-2000").max("now").required(errMessages),
        DataNastepnego: Joi.date().min("01-01-2000").max("now").required(errMessages),
        straczona_summa: Joi.number().min(0).max(1000000).required(errMessages)

    }
);

module.exports = klientSchema;