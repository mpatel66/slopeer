import { BucketName } from 'aws-sdk/clients/s3';
import { Secret } from 'jsonwebtoken';


declare global {
  namespace NodeJS
  {
    export interface ProcessEnv {
      DB_HOST: string;
      DB: string;
      JWTPrivateKey: Secret;
      AWS_S3_ID: string;
      AWS_S3_SECRET: string;
      // BUCKET: string;
      BUCKET: BucketName;
    }
  }  
}



// Augmenting the global scope by extending the process env interface from node. The below indicates that the file is a module.
export {};