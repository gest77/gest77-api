"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocalOrDev = exports.crashIfEnvKO = void 0;
var yup = __importStar(require("yup"));
var yup_env_1 = __importDefault(require("yup-env"));
var envSchema = yup.object().noUnknown().shape({
    nodeEnv: yup.string().required(),
    nodePort: yup.number().required(),
});
var crashIfEnvKO = function () {
    try {
        // parse and validate environment variables (return an object of type env not used !)
        (0, yup_env_1.default)({ schema: envSchema });
    }
    catch (e) {
        if (e instanceof yup.ValidationError) {
            console.log(".env not valid");
            console.log("yup.ValidationError " + JSON.stringify(e.errors));
            for (var _i = 0, _a = e.inner; _i < _a.length; _i++) {
                var inner = _a[_i];
                if (inner.type === "oneOf")
                    inner.errors.forEach(function (str) { return console.log(str); });
            }
        }
    }
};
exports.crashIfEnvKO = crashIfEnvKO;
var isLocalOrDev = function () {
    if (!process || !process.env || !process.env.NODE_ENV)
        return false;
    if (process.env.NODE_ENV === "local" || process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev")
        return true;
    return false;
};
exports.isLocalOrDev = isLocalOrDev;
//# sourceMappingURL=dotEnvHelper.js.map