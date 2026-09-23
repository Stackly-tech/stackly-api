export interface StorageService {
  upload(key: string, body: Buffer, contentType: string): Promise<void>;

  delete(key: string): Promise<void>;

  getSignedUrl(key: string): Promise<string>;
}
