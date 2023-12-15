import { Router } from 'express';
import { login, signup } from '../controllers/auth.js';
import validate from '../middlewares/validate.js';
import {
    loginValidation,
    signupValidation,
} from '../validations/authValidation.js';
const router = Router();

router.post('/register', validate(signupValidation), signup);
router.post('/login', validate(loginValidation), login);

export default router;
