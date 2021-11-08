import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      throw new BadRequestException('Only image files are allowed!');
    }

    if (file.size > Math.pow(10, 6)) {
      throw new BadRequestException(
        'Maximum allowable size of the application file - 1Mb!',
      );
    }

    return await this.appService.uploadFile(file.buffer);
  }
}
