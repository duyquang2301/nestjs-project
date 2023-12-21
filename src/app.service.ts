import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Injectable()
export class AppService {
  constructor(private cloudinary: CloudinaryService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async uploadImageToCloudinary(file: Express.Multer.File, photo: string) {
    return await this.cloudinary.uploadImage(file, photo).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}
