import { Router } from 'express';
import qrCodeController from '../controllers/qr_code_generator';

const router = Router();

//@ts-ignore
router.post('/generate-qr-code', qrCodeController.generateQrCode);
//@ts-ignore
router.get('/get-qr-code', qrCodeController.getQrCode);
//@ts-ignore
router.delete('/delete-qr-code/:id', qrCodeController.deleteQrCode);

export default router;