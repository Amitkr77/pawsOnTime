import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv'
dotenv.config();


// Ensure all necessary environment variables are set
if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
  throw new Error('Cloudinary credentials are missing in environment variables.');
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cloudinary storage configuration for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'paws_on_time',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }], 
  },
});

export { cloudinary, storage };
