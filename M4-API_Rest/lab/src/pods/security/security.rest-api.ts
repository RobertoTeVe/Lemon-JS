import { Router } from 'express';
import { userRepository } from 'dals';
import { UserSession } from 'common-app/models'
import jwt from 'jsonwebtoken';
import { envConstants } from 'core/constants'
import { authenticationMiddleware } from './security.middlewares';

export const securityApi = Router();

securityApi
    .post('/login', async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await userRepository.getUserByEmailAndPassword(email, password);
            if (user) {
                const userSession: UserSession = {
                    id: user._id,
                    role: user.role,
                };
                const token = jwt.sign(userSession, envConstants.AUTH_SECRET, {
                    expiresIn: '1d',
                    algorithm: 'HS256',
                });
                res.cookie('authorization', `Bearer ${token}`, {
                    httpOnly: true,
                    secure: envConstants.isProduction,
                });
                res.sendStatus(204);
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            next(error);
        }
    })
    .post('/logout', authenticationMiddleware, async (req, res, next) => {
        try {
            // Cannot invalidate token. So we erase the cookie inside the browser
            // so it not longer exists.
            res.clearCookie('authorization');
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    })