import { Router } from 'express';
import imageToolsRouter from './image_tools_routes';

const router = Router();

router.use('/image-tool', imageToolsRouter);

export default router;
