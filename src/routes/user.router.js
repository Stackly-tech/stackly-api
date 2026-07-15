import express from 'express'
export const userRouter = express.Router()

import { userController } from '../factories/user.factory.js';

userRouter.post('/', userController.createTest);

