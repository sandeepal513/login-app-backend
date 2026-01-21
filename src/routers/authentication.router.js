import express from 'express';
import { RegisterUser, CheckUsername, LoginUser } from '../controllers/user.contoller.js';
import cors from 'cors';

const router = express.Router();

router.use(cors());

router.post('/register', RegisterUser);  // create route for register user
router.get('/existuser', CheckUsername);  // create route for check exist user
router.post('/login', LoginUser);  // create route for login user


export default router;