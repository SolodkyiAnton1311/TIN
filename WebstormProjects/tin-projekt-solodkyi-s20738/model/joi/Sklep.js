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
        sklepId:Joi.number().optional().allow(""),
        Adresa:Joi.string().min(5).max(100).required(errMessages),
        Data_otwarcia: Joi.date().min("01-01-2000").max("now").required(errMessages)

    }
);

module.exports = klientSchema;