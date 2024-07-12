import express from 'express';
import { deleteUser, getUser, signout, test,updateUser,getUserComment } from '../controls/user.controller.js';

import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout)
router.get('/getusers', verifyToken, getUser);
router.get('/:userId', getUserComment);


export default router;