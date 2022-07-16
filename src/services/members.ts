import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { AllYears, allSheetProperties } from "../entities/memberSheets";
import { Creneau, Member, MemberSummary, parseMember, toMemberSummary } from "../entities/members";
import { SearchInput, buildPaginateResponse, PaginatedResponse, preparePaginationFilters } from "../toolsServices/SearchService";

export type SearchMembersInput = SearchInput<SearchMembersFilter, MemberOrderbyKeys>;

export type SearchMembersFilter = {
    firstname?: string;
    lastname?: string;
    birth?: string;
    creneau?: Creneau;
};

export const MemberOrderbyKeysNames = ["lastname"] as const;
export type MemberOrderbyKeys = typeof MemberOrderbyKeysNames[number];

/**
 * Prints the names of Liste des inscrits !
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export const getMembersCurrentYear = async (auth: OAuth2Client, input?: SearchMembersInput, year?: AllYears): Promise<PaginatedResponse<MemberSummary>> => {
    console.log("getMembersCurrentYear : " + year);

    const sheets = google.sheets({ version: "v4", auth });
    //         get(params?: Params$Resource$Spreadsheets$Values$Get, options?: MethodOptions): GaxiosPromise<Schema$ValueRange>;
    //let members = new Array<MemberSummary>();
    let members = new Array<Member>();
    let membersTotal = 0; // all result count to get number of pages.

    const currentYear = year || "2021";
    const sheetProperties = allSheetProperties[currentYear];

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetProperties.inscritSpreadsheetId,
        range: sheetProperties.inscritSheetName + sheetProperties.range,
    });

    const rows = res.data.values;
    if (!rows || !rows.length) {
        return buildPaginateResponse(members, membersTotal, input?.pagination);
    }
    //for (const row of rows) members.push(toMemberSummary(parseMember(currentYear, row)));
    for (const row of rows) members.push(parseMember(currentYear, row));

    if (input?.filters?.firstname) {
        const safeFirstname = input.filters?.firstname.toUpperCase();
        members = members.filter((member) => member.firstname.toUpperCase() === safeFirstname);
    }
    if (input?.filters?.lastname) {
        const safeLastname = input.filters?.lastname.toUpperCase();
        members = members.filter((member) => member.lastname.toUpperCase() === safeLastname);
    }
    if (input?.filters?.birth) {
        members = members.filter((member) => member.birthDate.toLocaleDateString("fr") === input?.filters?.birth);
    }
    if (input?.filters?.creneau) {
        members = members.filter((member) => member.creneau === input?.filters?.creneau);
    }
    membersTotal = members.length;

    if (input?.pagination) {
        const { skip, end } = preparePaginationFilters(input?.pagination);
        members = members.slice(skip, end);
    }
    return buildPaginateResponse(members, membersTotal, input?.pagination);
};
