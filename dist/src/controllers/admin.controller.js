"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const response_1 = require("../responses/response");
const response_2 = require("../responses/response");
const admin_login_1 = require("../services/admin.login");
class AdminController {
    constructor() {
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const admin_login = await admin_login_1.loginAdmins.login(email, password);
                if (admin_login == "Wrong Password") {
                    return res.status(response_2.RESPONSE_CODES.NOTFOUND).json({ Message: response_1.LOGIN_ERROR.NOT_MATCH });
                }
                res.status(response_2.RESPONSE_CODES.SUCCESS).json({ Message: response_2.RESPONSE_MESSAGES.SUCCESS, result: admin_login });
            }
            catch (error) {
                res.status(response_2.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: error });
            }
        };
    }
}
exports.adminController = new AdminController();
