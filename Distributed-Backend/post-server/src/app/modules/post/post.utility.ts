import * as Minio from 'minio';
import { Buffer } from 'buffer';

// Initialize 
const minioClient = new Minio.Client({
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false, //  HTTPS
  accessKey: process.env.MinIO_ACCESS_KEY as string,
  secretKey: process.env.MinIO_SECRET_KEY as string,
});

interface File {
  originalname: string;
  buffer: Buffer;
  size: number;
}

interface ObjectInfo {
  etag: string;
  versionId: string;
}

export const uploadToMinIO = async (bucketName: string, file: File): Promise<ObjectInfo> => {
  const bucketExists = await minioClient.bucketExists(bucketName);
  if (!bucketExists) {
    await minioClient.makeBucket(bucketName, 'us-east-1'); 
  }

  return new Promise((resolve, reject) => {
    minioClient.putObject(
      bucketName,
      file.originalname,
      file.buffer,
      file.size,              
      (err: Error | null, objInfo: Minio.ItemBucketMetadata) => {
        if (err) {
          reject(err);
        } else {
          resolve(objInfo as ObjectInfo);
        }
      }
    );
  });
};


export const getObjectFromMinIO = async (
  bucketName: string,
  filename: string
): Promise<string> => {
  try {
    const dataStream = await minioClient.getObject(bucketName, filename);
    
    return new Promise((resolve, reject) => {
      let content = '';

      dataStream.on('data', (chunk) => {
        content += chunk.toString(); // Collecting data chunks
      });

      dataStream.on('end', () => {
        resolve(content);
      });

      dataStream.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    throw new Error(`Could not get object: ${error}`);
  }
};

// export const parseFileUrl = (fileUrl) => {
//   const parts = fileUrl.split('/').filter(Boolean); // Split and remove empty parts
//   if (parts.length < 2) {
//       throw new Error("Invalid file URL format.");
//   }

//   const bucketName = parts[0];  // First part is the bucket name
//   const fileName = parts[1];     // Second part is the file name

//   return { bucketName, fileName };
// };
// export const getPresignedUrl = async (bucketName, objectName, expiry = 60 * 60) => {
//   return new Promise((resolve, reject) => {
//     minioClient.presignedGetObject(bucketName, objectName, expiry, (err, url) => {
//       if (err) {
//         reject(err); // Reject the promise if an error occurs
//       } else {
//         resolve(url); // Resolve with the presigned URL
//       }
//     });
//   });
// };
