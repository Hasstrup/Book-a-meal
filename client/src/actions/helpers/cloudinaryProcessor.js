import axios from 'axios';

const cloudName = 'dy8dbnmec';
const unsignedUploadPreset = 'dmbhkwv0';

export default (file) => {
  const data = new FormData();
  data.append('upload_preset', unsignedUploadPreset);
  data.append('file', file);
  axios
    .request({
      method: 'post',
      url: `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => (response.secure_url ? response.secure_url : response.data.secure_url))
    .catch((err) => {
      console.log(err);
      throw new Error('Something went wrong uploading your image, please check that you are sending the right file');
    });
};
