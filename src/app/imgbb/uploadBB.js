'use server';
import axios from 'axios';

const uploadBB = async () => {
  console.log('uploadBB Called');
  const url =
    'https://asuratoon.com/wp-content/uploads/custom-upload/259594/23/01.jpg';
  const res = await axios({
    method: 'get',
    url: url,
    responseType: 'arraybuffer',
  });

  console.log('buffer', res.data);

  // const base64String = Buffer.from(res.data).toString('base64');
  // // console.log('response buffer', base64String);
  // return base64String;

  // upload file to imgbb
  const response = await axios.post(
    'https://api.imgbb.com/1/upload?key=e455a43ad14d2cec2e6366904d7f7bf2',
    {
      data: res.data,
    },
  );

  console.log('uploaded', response);
};

export default uploadBB;
