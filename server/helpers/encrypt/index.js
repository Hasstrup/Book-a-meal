// import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

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

  // static HashBcrypt = async (str) => {
  //   return await bcrypt.hash(str, process.env.SALT);
  // }
  //
  // static CheckPassWord = async (str, passwordHash) => {
  //   return await bcrypt.compare(str, passwordHash);
  // }
}

export default Encrypt;
