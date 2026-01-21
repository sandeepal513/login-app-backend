import express from 'express';
import { dashboardDetails, tokenVerify } from '../controllers/dashboard.controller.js';
import cors from 'cors';


const router = express.Router();

router.use(cors());

router.get('/usercount', dashboardDetails);
router.get('/tokenverify', tokenVerify);

export default router;