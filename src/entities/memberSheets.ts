export const AllYears = ["2018", "2019", "2020", "2021", "2022"] as const;
export type AllYears = typeof AllYears[number];
export const minYear: AllYears = "2018";

//#region list of Member properties, corresponding to sheet columns. SAME ORDER !
type Writable<T> = {
    -readonly [K in keyof T]: T[K];
};

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
export const WritableMemberProperties2022Names = MemberProperties2022Names as Writable<typeof MemberProperties2022Names>;
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
export const WritableMemberProperties2021Names = MemberProperties2021Names as Writable<typeof MemberProperties2021Names>;
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
export const WritableMemberProperties2020Names = MemberProperties2020Names as Writable<typeof MemberProperties2020Names>;
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
export const WritableMemberProperties2019Names = MemberProperties2019Names as Writable<typeof MemberProperties2019Names>;
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
export const WritableMemberProperties2018Names = MemberProperties2018Names as Writable<typeof MemberProperties2018Names>;
export type MemberProperties2018 = typeof MemberProperties2018Names[number];

// #endregion

//#region list of Member properties, corresponding to sheet columns. SAME ORDER !

//#region indexedProperties for all years. saying what column index of google sheet

export type Index2018 = { [key in MemberProperties2018]: number };
export type Index2019 = { [key in MemberProperties2019]: number };
export type Index2020 = { [key in MemberProperties2020]: number };
export type Index2021 = { [key in MemberProperties2021]: number };
export type Index2022 = { [key in MemberProperties2022]: number };

export type Index = Index2018 | Index2019 | Index2020 | Index2021 | Index2022;

const buildIndexedProperties = <INDEX_YEAR, K extends keyof INDEX_YEAR>(names: Array<K>): Index => {
    const result: { [k in K]?: number } = {};
    let i = 0;
    for (const key of names) result[key] = i++;
    return result as Index;
};

const buildIndexedProperties_2 = <INDEX_YEAR, K extends keyof INDEX_YEAR>(names: ReadonlyArray<K>): Index => {
    const result: { [k in K]?: number } = {};
    let i = 0;
    for (const key of names) result[key] = i++;
    return result as Index;
};
const IndexedProperties2018_2: Index = buildIndexedProperties_2<Index2018, keyof Index2018>(MemberProperties2018Names);

const IndexedProperties2018: Index = buildIndexedProperties<Index2018, keyof Index2018>(WritableMemberProperties2018Names);
const IndexedProperties2019: Index = buildIndexedProperties<Index2019, keyof Index2019>(WritableMemberProperties2019Names);
const IndexedProperties2020: Index = buildIndexedProperties<Index2020, keyof Index2020>(WritableMemberProperties2020Names);
const IndexedProperties2021: Index = buildIndexedProperties<Index2021, keyof Index2021>(WritableMemberProperties2021Names);
const IndexedProperties2022: Index = buildIndexedProperties<Index2022, keyof Index2022>(WritableMemberProperties2022Names);

//#endregion

export type MemberSheetProps = {
    inscritSpreadsheetId: string;
    inscritSheetName: string;
    preInscritSpreadsheetId: string;
    preInscritSheetName: string;
    preInscritSummarySheetName: string;
    membersRange: string;
    memberRange: (index: number) => string;
    headerRange: string;
    summaryRange: string;
    props: Index;
};

export const allSheetProperties: { [year in AllYears]: MemberSheetProps } = {
    "2018": {
        inscritSpreadsheetId: "1nH6GwlCOI75WdwGLohSfTy5_8v9K0h0R9GImsAJsT24",
        inscritSheetName: "Inscrits 2018",
        preInscritSpreadsheetId: "",
        preInscritSheetName: "",
        preInscritSummarySheetName: "",
        membersRange: "!A2:AM",
        memberRange: (index: number): string => {
            return "!A" + index + ":AM" + index;
        },
        headerRange: "!A1:AM1",
        summaryRange: "",
        props: IndexedProperties2018,
    },
    "2019": {
        inscritSpreadsheetId: "1eenzFOUEF68Ro2_jCxKG-HQrbimyHEAblGMSpmpnDSA",
        inscritSheetName: "Inscrits 2019",
        preInscritSpreadsheetId: "1xNMvl3GLoPQia7L8-2yeXAyBWaRqLefsvNHsInboiWs",
        preInscritSheetName: "Preinscrits 2019",
        preInscritSummarySheetName: "Summary 2019",
        membersRange: "!A2:AN",
        memberRange: (index: number): string => {
            return "!A" + index + ":AN" + index;
        },
        headerRange: "!A1:AN1",
        summaryRange: "!A1:H",
        props: IndexedProperties2019,
    },
    "2020": {
        inscritSpreadsheetId: "1iVQctHyZ3vVBMzCXdaPUTgQuOwuTkBACG2hSjj6oEi0",
        inscritSheetName: "Inscrits 2020",
        preInscritSpreadsheetId: "1ut7t9avg9axGHu9ScqYD66-LqMkBELnJxudXOsLFeZU",
        preInscritSheetName: "Preinscrits 2020",
        preInscritSummarySheetName: "Summary 2020",
        membersRange: "!A2:AN",
        memberRange: (index: number): string => {
            return "!A" + index + ":AN" + index;
        },
        headerRange: "!A1:AN1",
        summaryRange: "!A1:H",
        props: IndexedProperties2020,
    },
    "2021": {
        inscritSpreadsheetId: "1Zq3Cfl9o2kNqw57Rsgn1qBIum9zjpVcs47j0oYHyj8g",
        inscritSheetName: "Inscrits 2021",
        preInscritSpreadsheetId: "1JRK701D3hEs7-CvPrBzGVU2Yj8UH2JFSsv1g18xDNyU",
        preInscritSheetName: "Preinscrits 2021",
        preInscritSummarySheetName: "Summary 2021",
        membersRange: "!A2:AI",
        memberRange: (index: number): string => {
            return "!A" + index + ":AI" + index;
        },
        headerRange: "!A1:AI1",
        summaryRange: "!A1:H",
        props: IndexedProperties2021,
    },
    // prod
    // "2022": {
    //     inscritSpreadsheetId: "1zrsDnWthihdIAPpYffTa3WbIzq90AskoVDusEWPeG4w",
    //     inscritSheetName: "Inscrits",
    //     preInscritSpreadsheetId: "1CW2tYVbG1iLQ-TDFrtSwQ2sqfNipIV23hpcdsN3ofac",
    //     preInscritSheetName: "Preinscrits",
    //     preInscritSummarySheetName: "Summary",
    //     membersRange: "!A2:AI",
    //     memberRange: (index:number):string => {return "!A" + index + ":AI" + index;},
    //     headerRange: "!A1:AI1",
    //     summaryRange: "!A1:H",
    //     index: IndexedProperties2022,
    // },
    // preprod
    "2022": {
        inscritSpreadsheetId: "1ZKRpGZkIkiyxLMLBONRd2WKm5PoEYZDb9i7DFYYEgnw",
        inscritSheetName: "Inscrits",
        preInscritSpreadsheetId: "1EYAAJDJyX5K8KBZAoqsjhMErz-kAELNrU3tp34wAoAk",
        preInscritSheetName: "Preinscrits",
        preInscritSummarySheetName: "Summary",
        membersRange: "!A2:AI",
        memberRange: (index: number): string => {
            return "!A" + index + ":AI" + index;
        },
        headerRange: "!A1:AI1",
        summaryRange: "!A1:H",
        props: IndexedProperties2022,
    },
};
