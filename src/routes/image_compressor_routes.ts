import { Router } from 'express';
import {uploadImage} from '../utils/multer_upload';
import imageCompressorController from '../controllers/image_compressor';

const router = Router();


//@ts-ignore
router.post('/compress-image', uploadImage.single('file'), imageCompressorController.compressImage)
//@ts-ignore
router.get('/get-compressed-image', imageCompressorController.getCompressedImage)
//@ts-ignore
router.delete('/delete-compressed-image/:id', imageCompressorController.deleteImage)

export default router;
