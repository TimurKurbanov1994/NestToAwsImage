# Nest to AWS s3
A package to upload image (png, jpg, jpeg) to aws3 by nestjs.

## How to use

#### To configure AWS, we need the following values as a form of environment variables

- AWS_BUCKET_NAME: AWS S3 bucket name where folder is to be uploaded
- AWS_ACCESS_KEY_ID: Access Id
- AWS_SECRET_ACCESS_KEY: Secret Key
- AWS_REGION: S3 bucket region
- SIZE_LARGE: Image size
- SIZE_MEDIUM: Image size
- SIZE_THUMB: Image size
- IMAGE_QUALITY: Value compression

## Usage


1. Initialization npm
   ```shell
   npm i
   ```
2. Run
   ```shell
   npm run start 