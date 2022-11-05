import { Router } from 'express';
import AuthController from '../controller/auth_controller';

const router = Router();
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signUp);

export default router;