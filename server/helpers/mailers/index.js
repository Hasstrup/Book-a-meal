import dotenv from 'dotenv';
import transporter from './config';

dotenv.config();

let options;

const dispatch = (body) => {
  const { message, destination, subject } = body;
  options = { from: 'Book A Meal <noreply@Bookameal.com>', to: destination, text: message, html: message, subject };
  transporter.sendMail(options, (e) => {
    if (e) { console.log(e) }
    console.log(`mail sent to ${destination}`);
  });
};

const mailers = { dispatch }
export default mailers;
/* eslint object-curly-newline: 0 */
