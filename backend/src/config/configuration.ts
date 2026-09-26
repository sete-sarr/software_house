/** "https://a.com/, https://b.com" → ["https://a.com", "https://b.com"] (browsers send origins without a trailing slash). */
function parseOrigins(value: string): string[] {
  return value
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);
}

export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3001', 10),
  apiPrefix: process.env.API_PREFIX ?? 'api/v1',
  trustProxy: parseInt(process.env.TRUST_PROXY ?? '0', 10),

  database: {
    url: process.env.DATABASE_URL,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
  },

  cors: {
    origins: parseOrigins(process.env.CORS_ORIGIN ?? 'http://localhost:3000'),
  },

  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL ?? '60000', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT ?? '100', 10),
  },

  mail: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? '587', 10),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.EMAIL_FROM ?? 'no-reply@example.com',
    adminEmail: process.env.ADMIN_EMAIL ?? 'admin@example.com',
  },

  upload: {
    dir: process.env.UPLOAD_DIR ?? './uploads',
    maxFileSize: parseInt(process.env.UPLOAD_MAX_FILE_SIZE ?? '5242880', 10),
  },
});
