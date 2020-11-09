import Application = require("koa");
import compose = require("koa");
declare function verifyHostname(hostname: string | (string | RegExp)[], middleware?: (context: Application.ParameterizedContext<Application.DefaultState, Application.DefaultContext>, next: Application.Next, isValid: boolean) => any): compose.Middleware;
export = verifyHostname;
