export type Member = {
    id: string;
};

export const SPREADSHEET_ID_INSCRITS_2018 = "1nH6GwlCOI75WdwGLohSfTy5_8v9K0h0R9GImsAJsT24";
export const SHEET_NAME_INSCRITS_2018 = "Inscrits 2018";

export const SPREADSHEET_ID_PRE_INSCRITS_2019 = "1xNMvl3GLoPQia7L8-2yeXAyBWaRqLefsvNHsInboiWs";
export const SHEET_NAME_PRE_INSCRIT_2019 = "Preinscrits 2019";
export const SHEET_NAME_PRE_INSCRIT_SUMMARY_2019 = "Summary 2019";

export const SPREADSHEET_ID_INSCRITS_2019 = "1eenzFOUEF68Ro2_jCxKG-HQrbimyHEAblGMSpmpnDSA";
export const SHEET_NAME_INSCRITS_2019 = "Inscrits 2019";

export const SPREADSHEET_ID_PRE_INSCRITS_2020 = "1ut7t9avg9axGHu9ScqYD66-LqMkBELnJxudXOsLFeZU";
export const SHEET_NAME_PRE_INSCRIT_2020 = "Preinscrits 2020";
export const SHEET_NAME_PRE_INSCRIT_SUMMARY_2020 = "Summary 2020";

export const SPREADSHEET_ID_INSCRITS_2020 = "1iVQctHyZ3vVBMzCXdaPUTgQuOwuTkBACG2hSjj6oEi0";
export const SHEET_NAME_INSCRITS_2020 = "Inscrits 2020";

export const SPREADSHEET_ID_PRE_INSCRITS_2021 = "1JRK701D3hEs7-CvPrBzGVU2Yj8UH2JFSsv1g18xDNyU";
export const SHEET_NAME_PRE_INSCRIT_2021 = "Preinscrits 2021";
export const SHEET_NAME_PRE_INSCRIT_SUMMARY_2021 = "Summary 2021";

export const SPREADSHEET_ID_INSCRITS_2021 = "1Zq3Cfl9o2kNqw57Rsgn1qBIum9zjpVcs47j0oYHyj8g";
export const SHEET_NAME_INSCRITS_2021 = "Inscrits 2021";

export const SPREADSHEET_ID_INSCRITS_LIVE = "1zrsDnWthihdIAPpYffTa3WbIzq90AskoVDusEWPeG4w";
export const SHEET_NAME_INSCRITS_LIVE = "Inscrits";

export const SPREADSHEET_ID_INSCRITS_2022 = SPREADSHEET_ID_INSCRITS_LIVE;
export const SHEET_NAME_INSCRITS_2022 = SHEET_NAME_INSCRITS_LIVE;

export type MemberSummary = { firstname: string; lastname: string; birth: string };

export type MemberSheetProps = {
    spreadsheetId: string;
    sheetId: string;
    range: string;
    index: Index;
};
export const allYears = ["2018", "2019", "2020", "2021", "2022"] as const;
export type allYears = typeof allYears[number];
export type Index2022 = { [key in MemberProperties2022]: number };
export type Index2021 = { [key in MemberProperties2021]: number };
export type Index2020 = { [key in MemberProperties2020]: number };
export type Index2019 = { [key in MemberProperties2019]: number };
export type Index2018 = { [key in MemberProperties2018]: number };

export type Index = Index2018 | Index2019 | Index2020 | Index2021;

export type IndexYear = { [year: string]: Index };

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

export const InscritSheet: { [year in allYears]: MemberSheetProps } = {
    "2018": {
        spreadsheetId: SPREADSHEET_ID_INSCRITS_2018,
        sheetId: SHEET_NAME_INSCRITS_2018,
        range: "",
        index: IndexedProperties2018,
    },
    "2019": {
        spreadsheetId: SPREADSHEET_ID_INSCRITS_2019,
        sheetId: SHEET_NAME_INSCRITS_2019,
        range: "",
        index: IndexedProperties2019,
    },
    "2020": {
        spreadsheetId: SPREADSHEET_ID_INSCRITS_2020,
        sheetId: SHEET_NAME_INSCRITS_2020,
        range: "",
        index: IndexedProperties2020,
    },
    "2021": {
        spreadsheetId: SPREADSHEET_ID_INSCRITS_2021,
        sheetId: SHEET_NAME_INSCRITS_2021,
        range: "Inscrits 2021!A2:AI",
        index: IndexedProperties2021,
    },
    "2022": {
        spreadsheetId: SPREADSHEET_ID_INSCRITS_2022,
        sheetId: SHEET_NAME_INSCRITS_2022,
        range: "",
        index: IndexedProperties2022,
    },
};
