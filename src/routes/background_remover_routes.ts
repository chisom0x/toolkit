import { Router } from 'express';
import { uploadImage } from '../utils/multer_upload';
import backgroundRemoverController from '../controllers/background_remover';


const router = Router();

//@ts-ignore
router.post(
  '/remove-background',
  uploadImage.single('file'),
  //@ts-ignore
  backgroundRemoverController.removeBackground
);
//@ts-ignore
router.get('/get-image', backgroundRemoverController.getRemovedBackground);
//@ts-ignore
router.delete('/delete-image/:id', backgroundRemoverController.deleteImage);

export default router;
