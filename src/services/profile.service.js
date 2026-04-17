'use strict';

const db = require('../providers/db');
const { NotFoundError, ForbiddenError } = require('@masebato/apix').errors;

module.exports.getProfile = async ({ userId }) => {
  const user = await db.getUserById(userId);
  if (!user) throw new NotFoundError('Usuario no encontrado');
  return user;
};

module.exports.updateProfile = async ({ userId, company_name, sector }) => {
  const user = await db.getUserById(userId);
  if (!user) throw new NotFoundError('Usuario no encontrado');

  const updated = await db.updateCompany({ id: user.company_id, name: company_name, sector });
  if (!updated) throw new ForbiddenError('No se pudo actualizar el perfil');

  return db.getUserById(userId);
};
