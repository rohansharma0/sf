import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "sf",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    }),
});
const upload = multer({ storage });

export default upload;
