import { Router } from 'express';
import MessageController from '../controller/message.controller';

const router = Router();
router.post('/send', MessageController.sendMessage);
router.post('/voiceCall', MessageController.sendCallNotification);

export default router;