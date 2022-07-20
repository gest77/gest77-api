import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { AllYears, allSheetProperties, minYear } from "../entities/memberSheets";
import { Creneau, Member, MemberId, MemberResponseType, MemberSummary, MemberType, parseMember, toMemberSummary } from "../entities/members";
import { SearchInput, buildPaginateResponse, PaginatedResponse, preparePaginationFilters } from "../toolsServices/SearchService";
import { notFoundError } from "../toolsServices/ErrorService";

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

/**
 * Prints the names of Liste des inscrits !
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export const searchMembers = async (
    auth: OAuth2Client,
    year: AllYears,
    memberType: MemberType = "inscrit",
    memberResponseType: MemberResponseType = "summary",
    input?: SearchMembersInput
): Promise<PaginatedResponse<Member> | PaginatedResponse<MemberSummary>> => {
    console.log("getMembersCurrentYear : " + year);

    const sheets = google.sheets({ version: "v4", auth });
    let members = new Array<Member | MemberSummary>();

    const sheetProperties = allSheetProperties[year];

    const params =
        memberType == "inscrit"
            ? {
                  spreadsheetId: sheetProperties.inscritSpreadsheetId,
                  range: sheetProperties.inscritSheetName + sheetProperties.range,
              }
            : {
                  spreadsheetId: sheetProperties.preInscritSpreadsheetId,
                  range: sheetProperties.preInscritSheetName + sheetProperties.range,
              };

    const res = await sheets.spreadsheets.values.get(params);

    const rows = res.data.values;
    if (!rows || !rows.length) {
        return buildPaginateResponse(members, 0, input?.pagination);
    }
    if (memberResponseType == "summary") {
        for (const row of rows) members.push(toMemberSummary(parseMember(year, row)));
    } else {
        for (const row of rows) members.push(parseMember(year, row));
    }

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
export const findMe = async (client: OAuth2Client, initialYear: AllYears, input?: SearchMembersInput): Promise<FindMeOutput> => {
    let year: AllYears | null = initialYear;
    const inscrits = await searchMembers(client, year, "inscrit", "full", input);

    if (inscrits.totalElements === 1) {
        return { year, type: "inscrit", member: inscrits.elements[0] as Member };
    }
    if (inscrits.totalElements > 1) {
        throw notFoundError("errors.too_many_result");
    }
    // else search in pre-inscrit
    const preinscrit = await searchMembers(client, year, "preinscrit", "full", input);
    if (preinscrit.totalElements === 1) {
        return { year, type: "preinscrit", member: inscrits.elements[0] as Member };
    }
    if (preinscrit.totalElements > 1) {
        throw notFoundError("errors.too_many_result");
    }

    // now search on prévious years :
    while ((year = previousYear(year)) != null) {
        console.log("find me year = " + year);

        const inscrits = await searchMembers(client, year, "inscrit", "full", input);

        if (inscrits.totalElements === 1) {
            return { year, type: "inscrit", member: inscrits.elements[0] as Member };
        }
        if (inscrits.totalElements > 1) {
            throw notFoundError("errors.too_many_result");
        }
    }
    throw notFoundError();
};
