import googlecCreds from "../config/google-creds.json";

import fs from "fs";
import { google } from "googleapis";
import { Credentials, OAuth2Client } from "google-auth-library";
import { unauthorized } from "../toolsServices/ErrorService";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "googleapitoken.json";

// Load client secrets from a local file.

const getLocalToken = (): Credentials => {
    console.log("localtoken before read");
    const token = fs.readFileSync(TOKEN_PATH).toString();
    console.log("localtoken = " + token);
    return JSON.parse(token) as Credentials;
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
const getNewToken = (oAuth2Client: OAuth2Client): Credentials => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    throw unauthorized(undefined, { message: "Authorize this app by visiting this url", url: authUrl });
};

export const manageRedirect = async (code: string): Promise<void> => {
    const client = createClient();

    const tokenResponse = await client.getToken(code); //, (err: any, token: any) => {

    client.setCredentials(tokenResponse.tokens);
    // Store the token to disk for later program executions
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenResponse.tokens));
};

export const connect = (): OAuth2Client => {
    const client = createClient();
    try {
        const token = getLocalToken();

        client.setCredentials(token);
    } catch (err) {
        // wil throw
        console.log("thrown at connect");
        getNewToken(client);
    }
    return client;
};
