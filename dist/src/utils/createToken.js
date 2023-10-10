"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generate_token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
class generate_token {
    constructor() {
        /**
         * @description Create Access token
         * @param userId
         * @returns access token
         */
        this.AccessToken = async (userId, role) => {
            const AccessTokenKey = process.env.Access_JWT_SECRET;
            const accessTokenId = (0, uuid_1.v4)();
            const payload = { userId, role, accessTokenId };
            const option = process.env.ACCESS_TOKEN_TTL;
            const accessToken = jsonwebtoken_1.default.sign(payload, AccessTokenKey, {
                expiresIn: process.env.ACCESS_TOKEN_TTL,
            });
            console.log("Access_Token : ", accessToken);
            return { AccessToken: accessToken, jwtID: accessTokenId };
        };
        /**
         * @description create refresh token
         * @param userId
         * @returns resfresh token
         */
        this.RefreashToken = async (userId, role) => {
            const RefreshTokenKey = process.env.Refresh_JWT_SECRET;
            const refreshTokenId = (0, uuid_1.v4)();
            const payload = { userId, role, refreshTokenId };
            const refreshToken = jsonwebtoken_1.default.sign(payload, RefreshTokenKey, {
                expiresIn: process.env.REFRESH_TOKEN_TTL
            });
            console.log("Refresh_Token : ", refreshToken);
            return { RefreshToken: refreshToken, jwtID: refreshTokenId };
        };
    }
}
exports.Generate_token = new generate_token();
