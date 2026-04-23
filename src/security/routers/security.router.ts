import {Router} from "express";
import {refreshTokenGuardMiddleware} from "../../auth/validation/refresh-token.guard-middleware";
import {SecurityController} from "../controllers/security.controller";
import {container} from "../../iocContainer";

const securityController = container.get(SecurityController);

export const securityRouter = Router({});

securityRouter
    .get('/devices', refreshTokenGuardMiddleware, securityController.getActiveSessions.bind(securityController))
    .delete('/devices', refreshTokenGuardMiddleware, securityController.deleteAllSessionsExcludeCurrent.bind(securityController))
    .delete('/devices/:deviceId', refreshTokenGuardMiddleware, securityController.deleteSession.bind(securityController))
