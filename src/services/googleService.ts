import googlecCreds from "../config/google-creds.json";
import { SPREADSHEET_ID_INSCRITS_2021 } from "./sheetService";

import fs from "fs";
const readline = require("readline");
import { google } from "googleapis";
import { Credentials, OAuth2Client } from "google-auth-library";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH: string = "googleapitoken.json";

// Load client secrets from a local file.

const getLocalToken = (): Credentials | null => {
    try {
        const token = fs.readFileSync(TOKEN_PATH).toString();
        console.log("localtoken = " + token);
        return JSON.parse(token) as Credentials;
    } catch (err) {
        console.log("getLocalToken " + err);
        //return getNewToken(oAuth2Client, callback);
        return null;
    }
};

const createClient = (): OAuth2Client => {
    const { client_secret, client_id, redirect_uris } = googlecCreds.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    return oAuth2Client;
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

//TODO implement this as a callback route  !
function getNewToken(oAuth2Client: any, callback: any) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code: any) => {
        rl.close();
        oAuth2Client.getToken(code, (err: any, token: any) => {
            if (err) return console.error("Error while trying to retrieve access token", err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
                if (err) return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Prints the names of Liste des inscrits 2021 !
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
const getMembers = (auth: OAuth2Client): void => {
    // console.log("get member called");
    // return;
    const sheets = google.sheets({ version: "v4", auth });
    sheets.spreadsheets.values.get(
        {
            spreadsheetId: SPREADSHEET_ID_INSCRITS_2021,
            range: "Inscrits 2021!E2:G",
        },
        getMembersCallback
    );
};

const getMembersCallback = (err: any, res: any): void => {
    if (err) return console.log("The API returned an error: " + err);
    const rows = res.data.values;
    if (!rows.length) console.log("No data found.");

    console.log("Name, Major:");

    for (const row of rows) console.log(`${row[1]} ${row[0]} ${row[2]}`);
};

const connect = () => {
    const client = createClient();
    let token = getLocalToken();

    if (!token) {
        // get new token
        // token = getNewToken(client);
        return;
    }
    client.setCredentials(token);
};
