'use strict';

module.exports = {
  port:               process.env.PORT              || 3001,
  corsOrigin:         process.env.CORS_ORIGIN        || '*',
  swaggerUrl:         '/docs',
  m2mSecret:          process.env.M2M_SECRET         || 'changeme_m2m_secret',
  jwtSecret:          process.env.JWT_SECRET         || 'changeme_secret',
  jwtExpiresIn:       process.env.JWT_EXPIRES_IN     || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  db: {
    host:     process.env.DB_HOST     || 'localhost',
    port:     Number(process.env.DB_PORT) || 5432,
    name:     process.env.DB_NAME     || 'cibershield_sau',
    user:     process.env.DB_USER     || 'postgres',
    password: process.env.DB_PASSWORD || 'changeme',
  },
};
