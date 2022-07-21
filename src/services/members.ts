import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { differenceInYears, parse } from "date-fns";
import { sheets_v4 } from "googleapis";
import { AllYears, allSheetProperties, minYear, MemberSheetProps } from "../entities/memberSheets";
import {
    ClimbLevel,
    CompleteMember,
    Creneau,
    LicenceRemark,
    Member,
    MemberId,
    MemberResponseType,
    MemberSummary,
    MemberType,
    ModePaiement,
    parseMember,
    Sex,
    TarifType,
    toMemberSummary,
} from "../entities/members";
import { SearchInput, buildPaginateResponse, PaginatedResponse, preparePaginationFilters } from "../toolsServices/SearchService";
import { notFoundError } from "../toolsServices/ErrorService";
import { googleSheetService } from "./google";

export const getSeason = (): string => {
    console.log("getSeason");
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const year = dateObj.getUTCFullYear();
    const yearNext = year + 1;
    const yearPrev = year - 1;

    if (month > 6) return year + "-" + yearNext;
    else return yearPrev + "-" + year;
};

export const getCurrentSaisonYear = (): AllYears => {
    console.log("getCurrentSaisonYear");
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const year = dateObj.getUTCFullYear();
    const yearPrev = year - 1;

    if (month > 6) return ("" + year) as AllYears;
    else return ("" + yearPrev) as AllYears;
};
export const previousYear = (year: AllYears): AllYears | null => {
    if (year === minYear) return null;
    let prevYearN = +(year as string);
    const prevYearY = ("" + --prevYearN) as AllYears;
    console.log("previousYear of " + year + " = " + prevYearY);

    return prevYearY;
};

export type SearchMembersInput = SearchInput<SearchMembersFilter, MemberOrderbyKeys>;

export type SearchMembersFilter = {
    firstname?: string;
    lastname?: string;
    birthDate?: string;
    creneau?: Creneau;
};

export const MemberOrderbyKeysNames = ["lastname"] as const;
export type MemberOrderbyKeys = typeof MemberOrderbyKeysNames[number];

export const searchMembers = async (
    year: AllYears,
    memberType: MemberType = "inscrit",
    memberResponseType: MemberResponseType = "summary",
    input?: SearchMembersInput
): Promise<PaginatedResponse<Member> | PaginatedResponse<MemberSummary>> => {
    console.log("getMembersCurrentYear : " + year);

    const sheetProperties = allSheetProperties[year];

    const params =
        memberType == "inscrit"
            ? {
                  spreadsheetId: sheetProperties.inscritSpreadsheetId,
                  range: sheetProperties.inscritSheetName + sheetProperties.membersRange,
              }
            : {
                  spreadsheetId: sheetProperties.preInscritSpreadsheetId,
                  range: sheetProperties.preInscritSheetName + sheetProperties.membersRange,
              };

    const res = await googleSheetService.values.get(params);

    const rows = res.data.values;
    if (!rows || !rows.length) {
        return buildPaginateResponse([], 0, input?.pagination);
    }

    let members = new Array<Member | MemberSummary>();
    // create array of members or member sumamry
    if (memberResponseType == "summary") {
        for (const row of rows) members.push(toMemberSummary(parseMember(year, row)));
    } else {
        for (const row of rows) members.push(parseMember(year, row));
    }

    // local filter fields :
    if (input?.filters?.firstname) {
        const safeFirstname = input.filters?.firstname.toUpperCase();
        members = members.filter((member) => member.firstname.toUpperCase() === safeFirstname);
    }
    if (input?.filters?.lastname) {
        const safeLastname = input.filters?.lastname.toUpperCase();
        members = members.filter((member) => member.lastname.toUpperCase() === safeLastname);
    }
    if (input?.filters?.birthDate) {
        members = members.filter((member) => member.birthDate === input?.filters?.birthDate);
    }
    if (input?.filters?.creneau) {
        members = members.filter((member) => member.creneau === input?.filters?.creneau);
    }

    // before apply pagination filter,  get the total
    const membersTotal = members.length;

    if (input?.pagination) {
        const { skip, end } = preparePaginationFilters(input?.pagination);
        members = members.slice(skip, end);
    }
    return buildPaginateResponse(members, membersTotal, input?.pagination);
};

// findme result
// not found : 404
// Many found : 404
// inscrit : 200 + member + year + Incrit/preinscit

export type FindMeOutput = {
    year: AllYears;
    type: MemberType;
    member: MemberId;
};
export const findMe = async (initialYear: AllYears, input?: SearchMembersInput): Promise<FindMeOutput> => {
    let year: AllYears | null = initialYear;
    const inscrits = await searchMembers(year, "inscrit", "full", input);

    if (inscrits.totalElements === 1) {
        return { year, type: "inscrit", member: inscrits.elements[0] as Member };
    }
    if (inscrits.totalElements > 1) {
        throw notFoundError("errors.too_many_result");
    }
    // else search in pre-inscrit
    const preinscrit = await searchMembers(year, "preinscrit", "full", input);
    if (preinscrit.totalElements === 1) {
        return { year, type: "preinscrit", member: inscrits.elements[0] as Member };
    }
    if (preinscrit.totalElements > 1) {
        throw notFoundError("errors.too_many_result");
    }

    // now search on prévious years :
    while ((year = previousYear(year)) != null) {
        console.log("find me year = " + year);

        const inscrits = await searchMembers(year, "inscrit", "full", input);

        if (inscrits.totalElements === 1) {
            return { year, type: "inscrit", member: inscrits.elements[0] as Member };
        }
        if (inscrits.totalElements > 1) {
            throw notFoundError("errors.too_many_result");
        }
    }
    throw notFoundError();
};

export type PreregisterInput = {
    id?: string;
    lastname: string;
    firstname: string;
    birthDate: string;
    certificatDate: string;
    doctor: string;
    //scanCertif: string;
    tarif: number;
    modepaiement: ModePaiement;
    //photo: string;
    sex: Sex;
    addresse: string;
    zipCode: string;
    city: string;
    cellPhone: string;
    receiveSMS: boolean;
    whatsapp: boolean;
    email: string;
    receiveEmails: boolean;
    climbLevel: ClimbLevel;
    creneau: Creneau;
    tarifType: TarifType;
    dateFirstInscription: string;
    licenceRemark: LicenceRemark;
    fsgtNumber?: string;
    ffmeNumber?: string;
};

export const preregister = async (input: PreregisterInput): Promise<void> => {
    // pre register are this year (only)
    const year: AllYears = getCurrentSaisonYear();
    // get all sheet properties for that year
    const sheetProperties = allSheetProperties[year];

    const index = await getNextIndex(sheetProperties, "preinscrit");

    const member = createMember(input, index);
    const updateParams: sheets_v4.Params$Resource$Spreadsheets$Values$Update = {
        spreadsheetId: sheetProperties.preInscritSpreadsheetId,
        range: sheetProperties.preInscritSheetName + sheetProperties.memberRange(index),

        // https://developers.google.com/sheets/api/reference/rest/v4/ValueInputOption
        valueInputOption: "USER_ENTERED", // "RAW",
        requestBody: {
            range: sheetProperties.preInscritSheetName + sheetProperties.memberRange(index),
            values: toSheetArray(member, index),
        },
    };

    await googleSheetService.values.update(updateParams);

    return;
};

export const getNextIndex = async (sheetProperties: MemberSheetProps, memberType: MemberType): Promise<number> => {
    const params =
        memberType == "inscrit"
            ? {
                  spreadsheetId: sheetProperties.inscritSpreadsheetId,
                  range: sheetProperties.inscritSheetName + sheetProperties.headerRange,
              }
            : {
                  spreadsheetId: sheetProperties.preInscritSpreadsheetId,
                  range: sheetProperties.preInscritSheetName + sheetProperties.headerRange,
              };

    const res = await googleSheetService.values.get(params);
    const rows = res.data.values;

    if (!rows || !rows.length) {
        throw Error;
    }
    // get "A1" cell
    return 2 + parseInt((rows[0][0] as string).split(" ")[0], 10);
};

// // TODO Rename this.
// const createMemberEntry = async (
//     client: OAuth2Client,
//     sheetProperties: MemberSheetProps,
//     memberType: MemberType,
//     member: Partial<CompleteMember>
// ): Promise<void> => {
//     const index = await getNextIndex( sheetProperties, memberType);
//     const memberArray = toSheetArray(member, index);

//     inscrits.getRange("A" + index + ":AI" + index).setValues(memberArray);
//     inscrits.getRange("G" + index + ":I" + index).setNumberFormat("@"); // je ne veux aps que les dates soient formattée automatiqueemnt.
// };

const toSheetArray = (member: Partial<CompleteMember>, index: number): Array<Array<string>> => {
    createFormulas(member, index);
    return serialize(member);
};

const createFormulas = (member: Partial<CompleteMember>, index: number): void => {
    member.dossierComplet =
        "=IF(OR(AE" + index + '="Pas besoin de licences",isCertifOKV2(AE' + index + ",H" + index + ",I" + index + ",K" + index + ") )  ,1,0)";
    member.isLicenceOK = "=if(OR(AE" + index + '="Pas besoin de licences",isLicenceOK(AG' + index + "),isLicenceOK(AI" + index + ")),1,0)";
    member.age = "=age(G" + index + ")";
    member.ageLevel = "=trancheAge(Y" + index + ")";
};

const serialize = (member: Partial<CompleteMember>): Array<Array<any>> => {
    // Better way using generic fields of the year !
    return [
        [
            member.isInscrit,
            member.dossierComplet,
            member.isLicenceOK,
            member.id,
            member.lastname,
            member.firstname,
            member.birthDate,
            member.inscriptionDate,
            member.certificatDate,
            member.doctor,
            member.scanCertif,
            member.tarif,
            member.modepaiement,
            member.photo,
            member.civilite,
            member.sex,
            member.addresse,
            member.zipCode,
            member.city,
            member.cellPhone,
            member.receiveSMS,
            member.whatsapp,
            member.email,
            member.receiveEmails,
            member.age,
            member.ageLevel,
            member.climbLevel,
            member.creneau,
            member.tarifType,
            member.dateFirstInscription,
            member.licenceRemark,
            member.fsgtDemandDate,
            member.fsgtNumber,
            member.ffmeDemandDate,
            member.ffmeNumber,
        ],
    ];
};

const createMember = (input: PreregisterInput, index: number): Member => {
    const member: Partial<CompleteMember> = {};

    member.isInscrit = 1;
    member.dossierComplet = undefined; // formula will be set later.
    member.isLicenceOK = undefined; // formula will be set later.
    member.id = update_uuid(input.id);
    member.lastname = input.lastname.toUpperCase();
    member.firstname = input.firstname.replace(/(?=[- ']?)\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
    member.birthDate = input.birthDate;
    member.inscriptionDate = new Date().toLocaleString("fr");
    member.certificatDate = input.certificatDate;
    member.doctor = input.doctor;

    member.scanCertif = undefined; // TODO

    member.chequeValue = undefined; // obsolete
    member.scanCheque = undefined; // obsolete
    member.tarif = input.tarif;
    member.modepaiement = input.modepaiement;
    member.photo = undefined; // TOOD
    member.signature = undefined; // obsolete
    member.remarks = undefined; // obsolete
    member.legalRepresentant = undefined; // obsolete
    member.representantType = undefined; // obsolete
    member.civilite = input.sex && input.sex === "Masculin" ? "Mr" : "Mme";
    member.sex = input.sex;

    member.addresse = input.addresse;
    member.zipCode = input.zipCode;
    member.city = input.city;

    // OBJECTIF : formattage du numéro de téléphone selon ce format : 0[67]( [0-9][0-9]){4} => 06 26 40 65 36
    // le JS d'inscription oblige cette regex : (^0[67][0-9]{8}$)|(^0[67]( [0-9][0-9]){4}$)
    // DONC deux cas !
    let cellPhone = input.cellPhone;
    if (new RegExp("^0[67][0-9]{8}$").test(input.cellPhone) == true)
        cellPhone = input.cellPhone
            .replace(/\d\d/g, function (a) {
                return " " + a;
            })
            .substring(1);

    member.cellPhone = cellPhone;
    member.receiveSMS = input.receiveSMS;
    member.whatsapp = input.whatsapp;
    member.email = input.email;
    member.phone = cellPhone; // obsolete
    member.receiveEmails = input.receiveEmails;
    member.age = undefined; // formula will be set later.
    member.ageLevel = undefined; // formula will be set later.
    member.climbLevel = input.climbLevel;
    member.creneau = input.creneau;
    const age = calculateAge(input.birthDate);
    member.tarifType = input.creneau == "Ecole" ? "Ecole" : input.creneau == "Famille" && age > 16 ? "Accompagnateur" : "Libre";
    member.dateFirstInscription = input.dateFirstInscription ? input.dateFirstInscription : new Date().toLocaleString("fr");
    member.licenceRemark = input.licenceRemark;
    member.fsgtNumber = input.fsgtNumber;
    member.ffmeNumber = input.ffmeNumber;

    createFormulas(member, index);

    return member as Member;
};

const update_uuid = (old_id?: string): string => {
    if (old_id === null || old_id == undefined) return uuidv4();
    if (!uuidValidate(old_id)) return uuidv4();
    return old_id;
};

const calculateAge = (dob: string): number => {
    const date = parse(dob, "dd/MM/yyyy", new Date());
    const age = differenceInYears(new Date(), date);
    return age;
};
