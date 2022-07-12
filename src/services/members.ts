import { SPREADSHEET_ID_INSCRITS_2021 } from "./sheetService";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { MemberSummary } from "../entities/members";
import { SearchInput, buildPaginateResponse, PaginatedResponse } from "../toolsServices/SearchService";

export type SearchMembersInput = SearchInput<SearchMembersFilter, MemberOrderbyKeys>;

export type SearchMembersFilter = {
    firstname?: string;
    lastname?: string;
    birth?: Date;
};

export const MemberOrderbyKeysNames = ["lastname"] as const;
export type MemberOrderbyKeys = typeof MemberOrderbyKeysNames[number];

/**
 * Prints the names of Liste des inscrits 2021 !
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export const getMembers = async (auth: OAuth2Client, input?: SearchMembersInput): Promise<PaginatedResponse<MemberSummary>> => {
    console.log("get member called");
    // return;
    const sheets = google.sheets({ version: "v4", auth });
    //         get(params?: Params$Resource$Spreadsheets$Values$Get, options?: MethodOptions): GaxiosPromise<Schema$ValueRange>;
    const members = new Array<MemberSummary>();
    let membersTotal = 0; // all result count to get number of pages.
    //const { take, skip } = preparePaginationFilters(input?.pagination);

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID_INSCRITS_2021,
        range: "Inscrits 2021!E2:G",
    });

    const rows = res.data.values;
    if (!rows || !rows.length) {
        return buildPaginateResponse(members, membersTotal, input?.pagination);
    }
    membersTotal = rows.length;
    for (const row of rows) members.push({ firstname: row[1], lastname: row[0], birth: row[2] });

    console.log("Members : " + JSON.stringify(members, null, 2));

    return buildPaginateResponse(members, membersTotal, input?.pagination);
};
