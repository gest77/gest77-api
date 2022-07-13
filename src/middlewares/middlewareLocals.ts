import { JwtPayload } from "jsonwebtoken";
import { Member } from "../entities/members";

export interface LocalContext extends Record<string, unknown> {
    asker: Member;
    authToken: string;
    jwtPayload: JwtPayload;
}

export type VeraLocals = LocalContext;

declare module "jsonwebtoken" {
    export interface JwtPayload {
        dummy: string;
    }
}
