import { Role, UserSession } from 'common-app/models';
import { envConstants } from 'core/constants';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken'

const verify = (token: string, secret: string): Promise<UserSession> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, userSession: UserSession) => {
            if (error) {
                reject(error);
            };
            if (userSession) {
                resolve(userSession);
            } else {
                reject();
            };
        });
    });
};

export const authenticationMiddleware: RequestHandler = async (req, res, next) => {
    try {
        const [, token] = req.cookies.authorization?.split(' ') || [];
        const userSession = await verify(token, envConstants.AUTH_SECRET);
        req.userSession = userSession;
        next();
    } catch (error) {
        res.sendStatus(401);
    }
};

const isAuthorized = (userRole: Role, allowedRoles: Role[]): boolean =>
    !Boolean(allowedRoles) || (Boolean(userRole) && allowedRoles.some(role => userRole === role));


export const authorizationMiddleware = (allowedRoles?: Role[]): RequestHandler => async (req, res, next) => {
    const [, token] = req.cookies.authorization?.split(' ') || [];
    const userSession = await verify(token, envConstants.AUTH_SECRET);
    if (isAuthorized(userSession.role, allowedRoles)) {
        next();
    } else {
        res.sendStatus(403);
    }
};