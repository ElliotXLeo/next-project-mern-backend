import nodemailer from "nodemailer";

export const registrationEmail = async (user) => {
  const { name, email, token } = user;

  var transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  });

  await transport.sendMail({
    from: '"Next Project - Administrador de Proyectos" <cuentas@nextproject.com>',
    to: email,
    subject: 'Next Project - Confirmar tu cuenta',
    text: 'Confirmar tu cuenta en Next Project',
    html: `
      <p>Hola ${name}, confirma tu cuenta de Next Project.</p>
      <p>Ya está casi todo listo, solo debes confirmar tu cuenta en el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar</a>
      <p>Si tú no creaste esta cuenta, ignora el mensaje.</p>
    `
  });
};

export const passwordRecoveryEmail = async (user) => {
  const { name, email, token } = user;

  var transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  });

  await transport.sendMail({
    from: '"Next Project - Administrador de Proyectos" <cuentas@nextproject.com>',
    to: email,
    subject: 'Next Project - Reestablece tu password',
    text: 'Reestablece tu password en Next Project',
    html: `
      <p>Hola ${name}, solicitaste reestablecer tu password.</p>
      <p>Reestablece tu password en el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/recover-password/${token}">Reestablecer password</a>
      <p>Si tú no lo solicitaste, ignora el mensaje.</p>
    `
  });
};