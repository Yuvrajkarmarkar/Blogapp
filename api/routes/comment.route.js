import express from 'express';
import { createComment, getpostComments, likeComment } from '../controls/comments.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getpostComments/:postId', getpostComments);
router.put('/likeComment/:commentId',verifyToken,likeComment);


export default router;