import {Router} from "express";
import {deleteAllData} from "./handlers/delete-allData.handler";

export const testingRouter = Router({})
testingRouter.delete('/all-data', deleteAllData)