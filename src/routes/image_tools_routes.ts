import { Router } from 'express';
import uploadImage from '../utils/multer_upload';
import imageToolsController from '../controllers/image_tools/qr_code_generator';
import backgroundRemoverController from '../controllers/image_tools/background_remover';
import imageCompressorController from '../controllers/image_tools/image_compressor';

const router = Router();

//@ts-ignore
router.post('/generate-qr-code', imageToolsController.generateQrCode);
//@ts-ignore
router.get('/get-qr-code', imageToolsController.getQrCode);
//@ts-ignore
router.delete('/delete-qr-code/:id', imageToolsController.deleteQrCode);

//@ts-ignore
router.post('/remove-background', uploadImage.single('file') ,backgroundRemoverController.removeBackground)
//@ts-ignore
router.get('/get-image', backgroundRemoverController.getRemovedBackground)
//@ts-ignore
router.delete('/delete-image/:id', backgroundRemoverController.deleteImage)

//@ts-ignore
router.post('/compress-image', uploadImage.single('file'), imageCompressorController.compressImage)
//@ts-ignore
router.get('/get-compressed-image', imageCompressorController.getCompressedImage)
//@ts-ignore
router.delete('/delete-compressed-image/:id', imageCompressorController.deleteImage)

export default router;
