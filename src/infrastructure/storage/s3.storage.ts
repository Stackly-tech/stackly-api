import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  type S3ClientConfig,
} from "@aws-sdk/client-s3";
import { s3Config } from "./s3.config.js";
import type { StorageService } from "./storage.interface.js";

const clientConfig: S3ClientConfig = {
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
  forcePathStyle: true,
};

if (s3Config.endpoint) {
  clientConfig.endpoint = s3Config.endpoint;
}

export class S3Storage implements StorageService {
  private readonly client = new S3Client(clientConfig);

  async upload(key: string, body: Buffer, contentType: string) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: s3Config.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  }

  async delete(key: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: s3Config.bucket,
        Key: key,
      }),
    );
  }

  async getSignedUrl(key: string): Promise<string> {
    return `${s3Config.endpoint ?? ""}/${s3Config.bucket}/${key}`;
  }
}
