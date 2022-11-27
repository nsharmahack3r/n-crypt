import { Router } from 'express';
import UserController from "../controller/user_controller";

const router = Router();
router.get('/all', UserController.getUsers);

export default router;