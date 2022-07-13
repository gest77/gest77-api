//#region list of Member properties, corresponding to sheet columns. SAME ORDER !

export const MemberProperties2022Names = [
    "isInscrit",
    "dossierComplet",
    "isLicenceOK",
    "id",
    "lastname",
    "firstname",
    "birthDate",
    "inscriptionDate",
    "certificatDate",
    "doctor",
    "scanCertif",
    "tarif",
    "modepaiement",
    "photo",
    "civilite",
    "sex",
    "addresse",
    "zipCode",
    "city",
    "cellPhone",
    "receiveSMS",
    "whatsapp",
    "email",
    "receiveEmails",
    "age",
    "ageLevel",
    "climbLevel",
    "creneau",
    "tarifType",
    "dateFirstInscription",
    "licenceRemark",
    "fsgtDemandDate",
    "fsgtNumber",
    "ffmeDemandDate",
    "ffmeNumber",
] as const;
export type MemberProperties2022 = typeof MemberProperties2022Names[number];

export const MemberProperties2021Names = [
    "isInscrit",
    "dossierComplet",
    "isLicenceOK",
    "id",
    "lastname",
    "firstname",
    "birthDate",
    "inscriptionDate",
    "certificatDate",
    "doctor",
    "scanCertif",
    "tarif",
    "modepaiement",
    "photo",
    "civilite",
    "sex",
    "addresse",
    "zipCode",
    "city",
    "cellPhone",
    "receiveSMS",
    "whatsapp",
    "email",
    "receiveEmails",
    "age",
    "ageLevel",
    "climbLevel",
    "creneau",
    "tarifType",
    "dateFirstInscription",
    "licenceRemark",
    "fsgtDemandDate",
    "fsgtNumber",
    "ffmeDemandDate",
    "ffmeNumber",
] as const;
export type MemberProperties2021 = typeof MemberProperties2021Names[number];

export const MemberProperties2020Names = [
    "isInscrit",
    "dossierComplet",
    "isLicenceOK",
    "id",
    "lastname",
    "firstname",
    "birthDate",
    "inscriptionDate",
    "certificatDate",
    "doctor",
    "scanCertif",
    "chequeValue",
    "scanCheque",
    "photo",
    "signature",
    "remarks",
    "legalRepresentant",
    "representantType",
    "civilite",
    "sex",
    "addresse",
    "zipCode",
    "city",
    "cellPhone",
    "receiveSMS",
    "whatsapp",
    "phone",
    "email",
    "receiveEmails",
    "age",
    "ageLevel",
    "climbLevel",
    "creneau",
    "tarifType",
    "dateFirstInscription",
    "licenceRemark",
    "fsgtDemandDate",
    "fsgtNumber",
    "ffmeDemandDate",
    "ffmeNumber",
] as const;
export type MemberProperties2020 = typeof MemberProperties2020Names[number];

export const MemberProperties2019Names = [
    "isInscrit",
    "dossierComplet",
    "isLicenceOK",
    "id",
    "lastname",
    "firstname",
    "birthDate",
    "inscriptionDate",
    "certificatDate",
    "doctor",
    "scanCertif",
    "chequeValue",
    "scanCheque",
    "photo",
    "signature",
    "remarks",
    "legalRepresentant",
    "representantType",
    "civilite",
    "sex",
    "addresse",
    "zipCode",
    "city",
    "cellPhone",
    "receiveSMS",
    "whatsapp",
    "phone",
    "email",
    "receiveEmails",
    "age",
    "ageLevel",
    "climbLevel",
    "creneau",
    "tarifType",
    "dateFirstInscription",
    "licenceRemark",
    "fsgtDemandDate",
    "fsgtNumber",
    "ffmeDemandDate",
    "ffmeNumber",
] as const;
export type MemberProperties2019 = typeof MemberProperties2019Names[number];

export const MemberProperties2018Names = [
    "isInscrit",
    "dossierComplet",
    "isLicenceOK",
    "id",
    "lastname",
    "firstname",
    "birthDate",
    "inscriptionDate",
    "certificatDate",
    "doctor",
    "scanCertif",
    "chequeValue",
    "scanCheque",
    "photo",
    "signature",
    "remarks",
    "legalRepresentant",
    "representantType",
    "civilite",
    "sex",
    "addresse",
    "zipCode",
    "city",
    "cellPhone",
    "receiveSMS",
    "phone",
    "email",
    "receiveEmails",
    "age",
    "ageLevel",
    "climbLevel",
    "creneau",
    "tarifType",
    "dateFirstInscription",
    "licenceRemark",
    "fsgtDemandDate",
    "fsgtNumber",
    "ffmeDemandDate",
    "ffmeNumber",
] as const;
export type MemberProperties2018 = typeof MemberProperties2018Names[number];

// #endregion

export type Index2018 = { [key in MemberProperties2018]: number };
export type Index2019 = { [key in MemberProperties2019]: number };
export type Index2020 = { [key in MemberProperties2020]: number };
export type Index2021 = { [key in MemberProperties2021]: number };
export type Index2022 = { [key in MemberProperties2022]: number };

export type Index = Index2018 | Index2019 | Index2020 | Index2021 | Index2022;

const IndexedProperties2018 = ((): Index => {
    const result: Partial<Index2018> = {};
    let i = 0;
    for (const key of MemberProperties2018Names) result[key] = i++;
    return result as Index2018;
})();
const IndexedProperties2019 = ((): Index => {
    const result: Partial<Index2019> = {};
    let i = 0;
    for (const key of MemberProperties2019Names) result[key] = i++;
    return result as Index2019;
})();
const IndexedProperties2020 = ((): Index => {
    const result: Partial<Index2020> = {};
    let i = 0;
    for (const key of MemberProperties2020Names) result[key] = i++;
    return result as Index2020;
})();
const IndexedProperties2021 = ((): Index => {
    const result: Partial<Index2021> = {};
    let i = 0;
    for (const key of MemberProperties2021Names) result[key] = i++;
    return result as Index2021;
})();
const IndexedProperties2022 = ((): Index => {
    const result: Partial<Index2022> = {};
    let i = 0;
    for (const key of MemberProperties2022Names) result[key] = i++;
    return result as Index2022;
})();

export const allYears = ["2018", "2019", "2020", "2021", "2022"] as const;
export type allYears = typeof allYears[number];

export type MemberSheetProps = {
    inscritSpreadsheetId: string;
    inscritSheetName: string;

    preInscritSpreadsheetId: string;
    preInscritSheetName: string;
    preInscritSummarySheetName: string;

    range: string;
    summaryRange: string;
    index: Index;
};

export const InscritSheetProperties: { [year in allYears]: MemberSheetProps } = {
    "2018": {
        inscritSpreadsheetId: "1nH6GwlCOI75WdwGLohSfTy5_8v9K0h0R9GImsAJsT24",
        inscritSheetName: "Inscrits 2018",
        preInscritSpreadsheetId: "",
        preInscritSheetName: "",
        preInscritSummarySheetName: "",
        range: "!A2:AM",
        summaryRange: "",
        index: IndexedProperties2018,
    },
    "2019": {
        inscritSpreadsheetId: "1eenzFOUEF68Ro2_jCxKG-HQrbimyHEAblGMSpmpnDSA",
        inscritSheetName: "Inscrits 2019",
        preInscritSpreadsheetId: "1xNMvl3GLoPQia7L8-2yeXAyBWaRqLefsvNHsInboiWs",
        preInscritSheetName: "Preinscrits 2019",
        preInscritSummarySheetName: "Summary 2019",
        range: "!A2:AN",
        summaryRange: "!A1:H",
        index: IndexedProperties2019,
    },
    "2020": {
        inscritSpreadsheetId: "1iVQctHyZ3vVBMzCXdaPUTgQuOwuTkBACG2hSjj6oEi0",
        inscritSheetName: "Inscrits 2020",
        preInscritSpreadsheetId: "1ut7t9avg9axGHu9ScqYD66-LqMkBELnJxudXOsLFeZU",
        preInscritSheetName: "Preinscrits 2020",
        preInscritSummarySheetName: "Summary 2020",
        range: "!A2:AN",
        summaryRange: "!A1:H",
        index: IndexedProperties2020,
    },
    "2021": {
        inscritSpreadsheetId: "1Zq3Cfl9o2kNqw57Rsgn1qBIum9zjpVcs47j0oYHyj8g",
        inscritSheetName: "Inscrits 2021",
        preInscritSpreadsheetId: "1JRK701D3hEs7-CvPrBzGVU2Yj8UH2JFSsv1g18xDNyU",
        preInscritSheetName: "Preinscrits 2021",
        preInscritSummarySheetName: "Summary 2021",
        range: "!A2:AI",
        summaryRange: "!A1:H",
        index: IndexedProperties2021,
    },
    "2022": {
        inscritSpreadsheetId: "1zrsDnWthihdIAPpYffTa3WbIzq90AskoVDusEWPeG4w",
        inscritSheetName: "Inscrits",
        preInscritSpreadsheetId: "1CW2tYVbG1iLQ-TDFrtSwQ2sqfNipIV23hpcdsN3ofac",
        preInscritSheetName: "Preinscrits",
        preInscritSummarySheetName: "Summary",
        range: "!A2:AI",
        summaryRange: "!A1:H",
        index: IndexedProperties2022,
    },
};

export type IndexYear = { [year in allYears]: Index };

export const fuckingYears: IndexYear = {
    "2018": IndexedProperties2018,
    "2019": IndexedProperties2019,
    "2020": IndexedProperties2020,
    "2021": IndexedProperties2021,
    "2022": IndexedProperties2022,
};
