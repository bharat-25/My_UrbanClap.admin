"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmins = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken_1 = require("../utils/createToken");
const token_model_1 = __importDefault(require("../models/token.model"));
const session_model_1 = __importDefault(require("../models/session.model"));
const response_1 = require("../responses/response");
const admin_model_1 = __importDefault(require("../models/admin.model"));
class login_admins {
    constructor() {
        this.login = async (email, password) => {
            try {
                const adminExists = await admin_model_1.default.findOne({ where: { email: email } });
                const checkrole = adminExists.role;
                if (!adminExists) {
                    return response_1.LOGIN_ERROR.NOT_EXIST;
                }
                if (checkrole == 'user') {
                    return response_1.LOGIN_ERROR.UNAUTHORIZED;
                }
                const pass = await bcrypt_1.default.compare(password, adminExists.password);
                if (!pass) {
                    return response_1.LOGIN_ERROR.NOT_MATCH;
                }
                if (!adminExists.is_verified == true) {
                    // await OTP.verifyOTP(email);
                    return response_1.LOGIN_ERROR.NOT_VERIFY;
                }
                const isSession = await session_model_1.default.findOne({ where: { adminId: adminExists.id } });
                if (isSession) {
                    let checkstatus = isSession.is_active;
                    // const device=UUIDV4()
                    const device = "UUIDV4bb";
                    if (checkstatus) {
                        const access_token = await createToken_1.Generate_token.AccessToken(adminExists.id, adminExists.role);
                        const refresh_token = await createToken_1.Generate_token.RefreashToken(adminExists.id, adminExists.role);
                        const result = await token_model_1.default.create({ adminId: adminExists.id, accessToken: access_token.jwtID, refreshToken: refresh_token.jwtID, device });
                        const Access_Token = access_token.AccessToken;
                        const Refresh_Token = refresh_token.RefreshToken;
                        return { Access_Token, Refresh_Token };
                    }
                    const access_token = await createToken_1.Generate_token.AccessToken(adminExists.id, adminExists.role);
                    const refresh_token = await createToken_1.Generate_token.RefreashToken(adminExists.id, adminExists.role);
                    const result = await token_model_1.default.create({ adminId: adminExists.id, accessToken: access_token.jwtID, refreshToken: refresh_token.jwtID, device });
                    const Access_Token = access_token.AccessToken;
                    const Refresh_Token = refresh_token.RefreshToken;
                    return { Access_Token, Refresh_Token };
                }
                const device = "UUIDV4";
                // const device:AcceptAny=UUIDV4()
                const access_token = await createToken_1.Generate_token.AccessToken(adminExists.id, adminExists.role);
                const refresh_token = await createToken_1.Generate_token.RefreashToken(adminExists.id, adminExists.role);
                console.log(access_token, refresh_token);
                console.log(adminExists);
                const result = await token_model_1.default.create({
                    adminId: adminExists.id,
                    accessToken: access_token.jwtID,
                    refreshToken: refresh_token.jwtID,
                    device: device,
                });
                await session_model_1.default.create({
                    adminId: adminExists.id,
                    device: device,
                    is_active: true
                });
                const Access_Token = access_token.AccessToken;
                const Refresh_Token = refresh_token.RefreshToken;
                return { Access_Token, Refresh_Token };
            }
            catch (error) {
                console.log(error);
                throw Error(error.message);
            }
        };
    }
}
exports.loginAdmins = new login_admins();
