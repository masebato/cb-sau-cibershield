'use strict';

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db     = require('../providers/db');
const jwt    = require('../providers/jwt');
const { ConflictError, UnauthorizedError, NotFoundError } = require('@masebato/apix').errors;

module.exports.register = async ({ email, password, company_name, sector }) => {
  const existing = await db.getUserByEmail(email);
  if (existing) throw new ConflictError('El email ya está registrado');

  const password_hash = await bcrypt.hash(password, 10);
  const company       = await db.createCompany({ name: company_name, sector });
  const user          = await db.createUser({ email, password_hash, company_id: company.id });

  const access_token  = jwt.signAccessToken({ user_id: user.id, company_id: company.id });
  const refresh_token = jwt.signRefreshToken({ user_id: user.id });
  await db.saveRefreshToken({ user_id: user.id, token: refresh_token });

  return { access_token, refresh_token, user };
};

module.exports.login = async ({ email, password }) => {
  const user = await db.getUserByEmail(email);
  if (!user) throw new UnauthorizedError('Credenciales inválidas');

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new UnauthorizedError('Credenciales inválidas');

  const access_token  = jwt.signAccessToken({ user_id: user.id, company_id: user.company_id });
  const refresh_token = jwt.signRefreshToken({ user_id: user.id });
  await db.saveRefreshToken({ user_id: user.id, token: refresh_token });

  return { access_token, refresh_token };
};

module.exports.logout = async ({ refresh_token }) => {
  const deleted = await db.deleteRefreshToken(refresh_token);
  if (!deleted) throw new NotFoundError('Refresh token no encontrado');
};

module.exports.requestPasswordReset = async ({ email }) => {
  const user = await db.getUserByEmail(email);
  // Respuesta genérica para no revelar si el email existe
  if (!user) return;

  const token     = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
  await db.createPasswordResetToken({ user_id: user.id, token, expires_at: expiresAt });
  // TODO: enviar email con el token
};
