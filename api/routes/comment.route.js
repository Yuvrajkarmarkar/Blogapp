import express from 'express';
import { createComment, deleteComment, editComment, getcomments, getpostComments, likeComment } from '../controls/comments.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getpostComments/:postId', getpostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);


export default router;