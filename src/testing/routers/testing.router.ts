import {Router} from "express";
import {container} from "../../iocContainer";
import {TestingController} from "../controllers/testing.controller";

const testingController = container.get(TestingController)

export const testingRouter = Router({})
testingRouter.delete('/all-data', testingController.deleteAllData.bind(testingController))
