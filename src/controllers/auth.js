'use strict';

const authService = require('../services/auth.service');

module.exports.register = async (req, res) => {
  const { email, password, company_name, sector } = req.body;
  const result = await authService.register({ email, password, company_name, sector });
  res.json(result);
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  res.json(result);
};

module.exports.logout = async (req, res) => {
  const { refresh_token } = req.body;
  await authService.logout({ refresh_token });
  res.json({ message: 'Sesión cerrada correctamente' });
};

module.exports.passwordReset = async (req, res) => {
  const { email } = req.body;
  await authService.requestPasswordReset({ email });
  res.json({ message: 'Si el correo existe, recibirá instrucciones de recuperación' });
};
