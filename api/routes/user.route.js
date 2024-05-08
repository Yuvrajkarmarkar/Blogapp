import express from 'express';
import { test } from '../controls/user.controller.js';

const router = express.Router();

router.get('/test',test);

export default router;