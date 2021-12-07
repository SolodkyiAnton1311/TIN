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
        klientId: Joi.number().optional().allow(""),
        Imie:Joi.string().min(2).max(20).required(errMessages),
        Nazwisko: Joi.string().min(2).max(20).required(errMessages),
        Wiek: Joi.number().min(5).max(120).required(errMessages),
        Plec: Joi.string().min(1).max(1).required(errMessages)
    }
);

module.exports = klientSchema;