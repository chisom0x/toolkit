import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.memoryStorage();

const uploadImage = multer({
  storage: storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Only image files are allowed'));
    }

    cb(null, true);
  },
});

export { uploadImage };
