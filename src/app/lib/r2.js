import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const S3 = new S3Client({
  region: 'auto',
  endpoint: 'https://d15eb0203fe48da452c69098092ecf46.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: '2450ff76908a0245b6fc75f45d078483',
    secretAccessKey:
      '06512b7125106b02372938ba7380b32ff5ab07a9961542f90db33c2bea525afc',
  },
});
