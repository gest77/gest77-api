import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { InscritSheetProperties } from "../entities/memberSheets";
import { Creneau, MemberSummary } from "../entities/members";
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
 * Prints the names of Liste des inscrits 2021 !
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export const getMembersCurrentYear = async (auth: OAuth2Client, input?: SearchMembersInput): Promise<PaginatedResponse<MemberSummary>> => {
    // return;
    const sheets = google.sheets({ version: "v4", auth });
    //         get(params?: Params$Resource$Spreadsheets$Values$Get, options?: MethodOptions): GaxiosPromise<Schema$ValueRange>;
    let members = new Array<MemberSummary>();
    let membersTotal = 0; // all result count to get number of pages.

    const sheetProperties = InscritSheetProperties["2021"];

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetProperties.inscritSpreadsheetId,
        range: sheetProperties.inscritSheetName + sheetProperties.range,
    });

    const rows = res.data.values;
    if (!rows || !rows.length) {
        return buildPaginateResponse(members, membersTotal, input?.pagination);
    }
    for (const row of rows)
        members.push({
            firstname: row[sheetProperties.index["firstname"]],
            lastname: row[sheetProperties.index["lastname"]],
            birth: row[sheetProperties.index["birthDate"]],
            creneau: row[sheetProperties.index["creneau"]],
        });

    if (input?.filters?.firstname) {
        const safeFirstname = input.filters?.firstname.toUpperCase();
        members = members.filter((member) => member.firstname.toUpperCase() === safeFirstname);
    }
    if (input?.filters?.lastname) {
        const safeLastname = input.filters?.lastname.toUpperCase();
        members = members.filter((member) => member.lastname.toUpperCase() === safeLastname);
    }
    if (input?.filters?.birth) {
        members = members.filter((member) => member.birth.toUpperCase() === input?.filters?.birth);
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
