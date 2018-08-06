import axios from 'axios';

// TODO: You probably want to make this totally secret, env vars maybe?
const cloudName = 'dntmknvtw';
const unsignedUploadPreset = 'o0uyoaiz';

/**
 * @param file - image to be uploaded to cloudinary
 * @description Uploads a file to the cloudinary processor and returns the secure_url
 * @returns {string} the url of the now hosted image
 */
export default (file) => {
  const data = new FormData();
  data.append('upload_preset', unsignedUploadPreset);
  data.append('file', file);
  return axios
    .request({
      method: 'post',
      url: `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response.data.secure_url)
    .catch(() => {
      throw new Error('Something went wrong uploading your image, please check that you are sending the right file');
    });
};
