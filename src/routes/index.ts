import { Router } from 'express';
import imageCompressorRoute from './image_compressor_routes'
import backgroundRemoverRoute from './background_remover_routes'
import qrCodeRoute from './qr_code_generator_routes'

const router = Router();

router.use('/', imageCompressorRoute);
router.use('/', qrCodeRoute)
router.use('/', backgroundRemoverRoute)

export default router;
