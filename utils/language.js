import I18n from "react-native-i18n"
import en from "../config/language/en"
import fr from "../config/language/fr"

I18n.fallbacks = true;
I18n.missingBehaviour = "guess";
I18n.defaultLocale = "en";
I18n.locale = "fr";

I18n.translations = {
    fr,
    en
};

export const setLocale = (locale) => {
    I18n.locale = locale;
};

export const getCurrentLocale = () => I18n.locale;

export const translateHeaderText = (langKey) => ({screenPops}) => {
    const title = I18n.translate(langKey, screenPops.language);
    return {title};
};

export default I18n.translate.bind(I18n);