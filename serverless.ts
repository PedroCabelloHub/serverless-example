import type { AWS } from '@serverless/typescript';


import { getProfile, login, logout } from '@functions/auth';
import { createMessage, getConversation } from "@functions/chat";
import { createUser, deleteUser, findAll, findById, update } from '@functions/users';

const serverlessConfiguration: AWS = {
  service: 'sls-example',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  
  },
  // import the function via paths, 
  functions: { findAll, findById, createUser, update, deleteUser,login,logout, getProfile, createMessage, getConversation },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline': {
      httpPort: 4000, // 👈 Aquí defines el puerto
    },
  },
};

module.exports = serverlessConfiguration;
