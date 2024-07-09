import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletePost, getPost, updatePost } from '../controls/post.controller.js';

const router = express.Router();

router.post('/create',verifyToken,create)
router.get('/getpost', getPost)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)
router.put('/update/:postId/:userId', verifyToken,updatePost)


export default router;