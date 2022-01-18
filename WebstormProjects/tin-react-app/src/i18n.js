import {initReactI18next} from "react-i18next";
import translationEnglish from "./locales/en.json"
import translationPolish from "./locales/pl.json"
import i18n from "i18next";

const resources = {
    en: {translation: translationEnglish},
    pl: {translation: translationPolish}
};
i18n.use(initReactI18next).init({
    resources,
    lng:"pl",
    interpolation:{
        escapeValue:false

    }
});
export default i18n;