import nodemailer from 'nodemailer';

const sender = { service: 'gmail', auth: { user: 'hasstrup.ezekiel@gmail.com', pass: 'Onosetale32' } };
const transporter = nodemailer.createTransport(sender);
export default transporter;
