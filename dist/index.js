"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function match(str, matcher) {
    if (str === matcher) {
        return true;
    }
    else if (matcher instanceof RegExp) {
        if (matcher.exec(str))
            return true;
        else
            return false;
    }
    else {
        return false;
    }
}
function verifyHostname(hostname, middleware) {
    return (context, next) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        let reqHostname = (_a = context === null || context === void 0 ? void 0 : context.request) === null || _a === void 0 ? void 0 : _a.hostname;
        let isValid = false;
        if (hostname instanceof Array) {
            for (let name of hostname) {
                isValid = match(reqHostname, name);
                if (isValid) {
                    break;
                }
            }
        }
        else {
            isValid = match(reqHostname, hostname);
        }
        if (!middleware)
            middleware = (context, next, isValid) => __awaiter(this, void 0, void 0, function* () {
                if (!isValid) {
                    context.status = 403;
                    context.body = '';
                }
                else
                    yield next();
            });
        yield middleware(context, next, isValid);
    });
}
module.exports = verifyHostname;
