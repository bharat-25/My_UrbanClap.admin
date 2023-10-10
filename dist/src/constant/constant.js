"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminContext = exports.portNumber = void 0;
require("../config/env");
exports.portNumber = process.env.PORT;
exports.adminContext = '/admin';
