import express from 'express';
import { signup } from '../controls/auth.controller.js';
const router = express.Router();

router.post('/signup', signup);

export default router;