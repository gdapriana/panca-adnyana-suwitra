import ResponseError from "../error/response.error";
import { cloudinary } from "../utils/cloudinary";

class CloudinaryService {
  static async destroy(public_id: string | undefined) {
    if (!public_id) throw new ResponseError(401, "public id tidak ditemukan");
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  }
}

export default CloudinaryService;
