import * as i18n from "i18n";

// Default header is "accept-language", but to conforme other api (gse-cs), we stay at "Content-Language"

export default {
    locales: ["en", "fr", "ru", "ar"],
    defaultLocale: "fr",
    header: "content-language", // Lower case  !
    directory: __dirname + "/../resources/traductions", // relative to ./src/config
    objectNotation: true,
} as i18n.ConfigurationOptions;
