import express from 'express';
import { test } from '../controls/user.controller.js';
import { updateUser } from '../controls/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId',verifyToken, updateUser);

export default router;