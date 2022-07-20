import {
    MemberProperties2022,
    MemberProperties2021,
    MemberProperties2020,
    MemberProperties2019,
    MemberProperties2018,
    AllYears,
    allSheetProperties,
    WritableMemberProperties2021Names,
    WritableMemberProperties2018Names,
    WritableMemberProperties2019Names,
    WritableMemberProperties2020Names,
    WritableMemberProperties2022Names,
} from "./memberSheets";

export const CreneauNames = ["Famille", "Ecole", "Adultes"] as const;
export type Creneau = typeof CreneauNames[number];

export const TarifTypeNames = ["Réduit", "Bureau", "Ecole", "Accompagnateur", "Normal"] as const;
export type TarifType = typeof TarifTypeNames[number];

export const licenceRemarkNames = ["Pas besoin de licences", "Besoin des deux licences", "Besoin FFME", "Besoin FSGT"] as const;
export type LicenceRemark = typeof licenceRemarkNames[number];

export const SexNames = ["Masculin", "Féminin"] as const;
export type Sex = typeof SexNames[number];

export const CiviliteNames = ["Mr", "Mme", "Mlle"] as const;
export type Civilite = typeof CiviliteNames[number];

export const ModePaiementNames = ["Paiement par Hello Asso", "Paiement par chèque"] as const;
export type ModePaiement = typeof ModePaiementNames[number];

export const ClimbeLevelNames = ["Débutant", "Autonome", "Compétition", "Initiateur"] as const;
export type ClimbLevel = typeof ClimbeLevelNames[number];

export const AgeLevelName = ["6-", "7-11", "12-14", "15-19", "20-24", "25-39", "40-44", "45-49", "50-54", "55-59", "60+"] as const;
export type AgeLevel = typeof AgeLevelName[number];
// member have all fields from all years.

export type MemberType = "inscrit" | "preinscrit";
export type MemberResponseType = "full" | "summary";

// Complete member has all fields that has ever existed at a time. including fileds that have became obsolete
type CompleteMember = {
    isInscrit: boolean;
    dossierComplet: boolean;
    isLicenceOK: boolean;
    id: string;
    lastname: string;
    firstname: string;
    birthDate: string; // check
    inscriptionDate: Date;
    certificatDate: Date;
    doctor: string;
    scanCertif: string;
    chequeValue: number;
    scanCheque: string;
    tarif: number;
    modepaiement: ModePaiement;
    photo: string;
    signature: string;
    remarks: string;
    legalRepresentant: string;
    representantType: string;
    civilite: Civilite;
    sex: Sex;
    addresse: string;
    zipCode: string;
    city: string;
    cellPhone: string;
    receiveSMS: boolean;
    whatsapp: boolean;
    email: string;
    phone: string;
    receiveEmails: boolean;
    age: number;
    ageLevel: AgeLevel;
    climbLevel: ClimbLevel;
    creneau: Creneau;
    tarifType: TarifType;
    dateFirstInscription: Date;
    licenceRemark: string;
    fsgtDemandDate: Date;
    fsgtNumber: string;
    ffmeDemandDate: Date;
    ffmeNumber: string;
};

const PickerMemberSummaryNames = ["firstname", "lastname", "birthDate", "creneau"] as const;
type PickerMemberSummary = typeof PickerMemberSummaryNames[number];

const PickerMemberIdNames = ["firstname", "lastname", "birthDate"] as const;
type PickerMemberId = typeof PickerMemberIdNames[number];

const TechnicalFields = ["isInscrit", "dossierComplet", "isLicenceOK", "civilite", "age", "ageLevel"] as const;
type TechnicalFields = typeof TechnicalFields[number];

export type MemberSummary = Pick<CompleteMember, PickerMemberSummary>;
export type MemberId = Pick<CompleteMember, PickerMemberId>;

//type MemberX<K extends keyof CompleteMember> = Pick<CompleteMember, K>;
type Member2018 = Pick<CompleteMember, MemberProperties2018>;
type Member2019 = Pick<CompleteMember, MemberProperties2019>;
type Member2020 = Pick<CompleteMember, MemberProperties2020>;
type Member2021 = Pick<CompleteMember, MemberProperties2021>;
type Member2022 = Pick<CompleteMember, MemberProperties2022>;

export type Member = Member2018 | Member2019 | Member2020 | Member2021 | Member2022;
export type PublicMember = Omit<Member, TechnicalFields>;

export const parseMember = (year: AllYears, row: Array<any>): Member => {
    return ParseMethods[year](row);
};

const parseMemberX = <MEMBER_YEAR, K extends keyof MEMBER_YEAR>(year: AllYears, names: Array<K>, row: Array<any>): Member => {
    const partialMember: { [k in K]?: any } = {};
    const index = allSheetProperties[year].index;
    for (const prop of names) {
        partialMember[prop] = row[(index as { [k in K]: number })[prop]];
    }
    return partialMember as Member;
};

const ParseMethods: { [year in AllYears]: (row: Array<any>) => Member } = {
    "2018": (row: Array<any>): Member => {
        return parseMemberX<Member2018, keyof Member2018>("2018", WritableMemberProperties2018Names, row);
    },
    "2019": (row: Array<any>): Member => {
        return parseMemberX<Member2019, keyof Member2019>("2019", WritableMemberProperties2019Names, row);
    },
    "2020": (row: Array<any>): Member => {
        return parseMemberX<Member2020, keyof Member2020>("2020", WritableMemberProperties2020Names, row);
    },
    "2021": (row: Array<any>): Member => {
        return parseMemberX<Member2021, keyof Member2021>("2021", WritableMemberProperties2021Names, row);
    },
    "2022": (row: Array<any>): Member => {
        return parseMemberX<Member2022, keyof Member2022>("2022", WritableMemberProperties2022Names, row);
    },
};

export const toMemberSummary = (member: Member): MemberSummary => {
    return {
        firstname: member.firstname,
        lastname: member.lastname,
        birthDate: member.birthDate,
        creneau: member.creneau,
    };
};

export const removeTechnicalFields = (member: Member): any => {
    for (const key of TechnicalFields) {
        if (member[key]) delete member[key];
    }
    return member;
};
