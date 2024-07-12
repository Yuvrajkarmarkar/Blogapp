import express from 'express';
import { createComment, getpostComments } from '../controls/comments.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getpostComments/:postId',getpostComments)


export default router;