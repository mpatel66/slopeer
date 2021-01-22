import { kStringMaxLength } from "buffer"

declare global {
  namespace NodeJS
  {
    export interface ProcessEnv {
      DB_HOST: string;
      DB: string;
      JWTPrivateKey: string;
      AWS_S3_ID: string;
      AWS_S3_SECRET: string;
      BUCKET: string;
    }
  }
}

// Augmenting the global scope by extending the process env interface from node. The below indicates that the file is a module.
export {};