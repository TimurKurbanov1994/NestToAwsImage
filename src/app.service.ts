import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as uuid from 'uuid';
import * as sharp from 'sharp';
import sizeOf from 'image-size';

@Injectable()
export class AppService {
  async uploadFile(image: Buffer) {
    const filename = uuid.v4() + '.jpg';

    const convertToJpg = async (input: Buffer) => {
      return await sharp(input)
        .jpeg({ quality: Number(process.env.IMAGE_QUALITY) })
        .resize(this.getDimensions(image), this.getDimensions(image))
        .toBuffer();
    };

    const finallyImage = await convertToJpg(image);

    const s3 = new S3();
    return await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: finallyImage,
        Key: filename,
      })
      .promise();
  }

  private getDimensions(imageFile: Buffer): number {
    const { width, height } = sizeOf(imageFile);
    const arrSizes = [
      Number(process.env.SIZE_THUMB),
      Number(process.env.SIZE_MEDIUM),
      Number(process.env.SIZE_LARGE),
    ];
    const sizeImageMIN = Math.min(width, height);
    return arrSizes.reduce((prev, curr) =>
      Math.abs(curr - sizeImageMIN) < Math.abs(prev - sizeImageMIN)
        ? curr
        : prev,
    );
  }
}
