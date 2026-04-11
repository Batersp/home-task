import {Router} from "express";
import {refreshTokenGuardMiddleware} from "../../auth/validation/refresh-token.guard-middleware";
import {getActiveSessionsHandler} from "./handlers/get-activeSessions.handler";
import {
    deleteAllSessionsExcludeCurrentHandler
} from "./handlers/delete-allSessionsExcludeCurrent.handler";
import {deleteSessionHandler} from "./handlers/delete-session.handler";

export const securityRouter = Router({});

securityRouter
    .get('/devices', refreshTokenGuardMiddleware, getActiveSessionsHandler)
    .delete('/devices', refreshTokenGuardMiddleware, deleteAllSessionsExcludeCurrentHandler)
    .delete('/devices/:deviceId', refreshTokenGuardMiddleware, deleteSessionHandler)
