"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Default header is "accept-language", but to conforme other api (gse-cs), we stay at "Content-Language"
exports.default = {
    locales: ["en", "fr", "ru", "ar"],
    defaultLocale: "fr",
    header: "content-language",
    directory: __dirname + "/../resources/traductions",
    objectNotation: true,
};
//# sourceMappingURL=i18nConfig.js.map