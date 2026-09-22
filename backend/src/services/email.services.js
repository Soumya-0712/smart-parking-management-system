import transporter from "../config/mail.config.js";

import verifyEmailTemplate from "../templates/verify-email.templates.js";

import resetPasswordTemplate from "../templates/reset-password.templates.js";

import passwordResetSuccessTemplate from "../templates/password-reset-successful.templates.js";

const sendVerificationEmail = async ({ name, email, verificationCode }) => {
  const html = verifyEmailTemplate({
    name,
    verificationCode,
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Verify Your Email | ParkSphere",
    html,
  });
};

const sendPasswordResetEmail = async ({ name, email, resetUrl }) => {
  const html = resetPasswordTemplate({
    name,
    resetUrl,
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Reset Your Password | ParkSphere",
    html,
  });
};

const sendPasswordResetSuccessEmail = async ({ name, email }) => {
  const html = passwordResetSuccessTemplate({
    name,
  });

  await transporter.sendEmail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Password Reset Successful | ParkSphere",
  });
};

export {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
};
