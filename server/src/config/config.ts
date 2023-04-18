import convict from 'convict';
import { config as envConfig } from 'dotenv';

envConfig();

const convictConfig = convict({
  db: {
    databaseUrl: {
      doc: 'Database config',
      env: 'DATABSE_URL',
      default: 'postgresql://postgres:postgres@localhost:5432/mindmap?schema=public',
    },
  },
  server: {
    port: {
      doc: 'The port to bind.',
      format: 'port',
      env: 'SERVER_PORT',
      default: 3000
    }
  },
  jwt: {
    secret: {
      doc: 'JWT Secret',
      format: 'String',
      default: 'secret',
      env: 'JWT_SECRET'
    },
    expiresIn: {
      doc: 'JWT Expiration time',
      format: 'String',
      default: '2h',
      env: 'JWT_EXPIRES_IN'
    }
  }
});

convictConfig.validate();
export { convictConfig as config };