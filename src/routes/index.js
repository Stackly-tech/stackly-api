/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 */
import express from 'express';
import { testRouter } from './test.router.js';
export const router = express.Router();
router.use('/test',testRouter);