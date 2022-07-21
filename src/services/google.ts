import { google } from "googleapis";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const KEY_FILE = "./src/config/heroku-gest77-api-8c88f73abed4.json"; // path relative to project root.

export const googleSheetService = google.sheets({
    version: "v4",
    auth: new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: SCOPES,
    }),
}).spreadsheets;
