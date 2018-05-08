import 'babel-polyfill';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

let token;
class Encrypt {
/* eslint no-bitwise: 0, no-plusplus: 0, no-return-await: 0, arrow-body-style: 0 */
  static hashStr(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }

  static hashPassword = (str) => {
    return bcrypt.hashSync(str, 10);
  }

  static checkPassword = (str, passwordHash) => {
    console.log(str, passwordHash)
    return bcrypt.compareSync(str, passwordHash);
  }

  static issueToken = async (payload) => {
    token = await jwt.sign(payload, 'YoudontreallyknowKanye');
    return token;
  };

  static decodeToken = async (jwtoken) => {
    const payload = await jwt.verify(jwtoken, 'YoudontreallyknowKanye');
    return payload;
  };
}

export default Encrypt;
