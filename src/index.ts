import Application = require("koa")
import compose = require("koa")

function match(str: string, matcher: string | RegExp): boolean {
    if(str === matcher) {
        return true
    }
    else if(matcher instanceof RegExp) {
        if(matcher.exec(str))
            return true
        else 
            return false
    }
    else {
        return false
    }
}


function verifyHostname(
    hostname: string | (string | RegExp)[],
    middleware?: (
        context: Application.ParameterizedContext<Application.DefaultState, Application.DefaultContext>,
        next: Application.Next,
        isValid: boolean
    ) => any
): compose.Middleware {
    return async (
        context: Application.ParameterizedContext<Application.DefaultState, Application.DefaultContext>,
        next: Application.Next,
    ) => {
        let reqHostname = context?.request?.hostname
        let isValid = false
        if(hostname instanceof Array) {
            for(let name of hostname) {
                isValid = match(reqHostname, name)
                if(isValid) {
                    break
                }
            }
        }
        else {
            isValid = match(reqHostname, hostname)
        }

        if(!middleware) middleware = async (
            context: Application.ParameterizedContext<Application.DefaultState, Application.DefaultContext>,
            next: Application.Next,
            isValid: boolean
        ) => {
            if(!isValid) {
                context.status = 403
                context.body = ''
            }
            else
                await next()
        }
        await middleware(context, next, isValid)
    }
}

export = verifyHostname