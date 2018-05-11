import nodemailer from 'nodemailer';

const sender = { service: 'gmail', auth: { user: 'applicationbookameal@gmail.com', pass: 'bookameal123456' } };
const transporter = nodemailer.createTransport(sender);
export default transporter;
