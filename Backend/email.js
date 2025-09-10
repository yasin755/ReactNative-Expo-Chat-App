import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // allow self-signed certs
  },
});
