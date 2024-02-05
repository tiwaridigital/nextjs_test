// 'use client';
// import { useState } from 'react';
import axios from 'axios';
import uploadBB from '@/app/imgbb/uploadBB';

const Page = () => {
  // const [file, setFile] = useState(null);
  // console.log('file', file);

  // const uploadFile = async () => {
  //   console.log('Upload File Called');
  //   const data = new FormData();
  //   data.append('image', file);
  //
  //   const url =
  //     'https://api.imgbb.com/1/upload?key=e455a43ad14d2cec2e6366904d7f7bf2';
  //
  //   const response = await axios.post(url, {
  //     data: data,
  //   });
  //
  //   console.log('response', response);
  // };

  const uploadBB = async () => {
    console.log('uploadBB Called');
    const url =
      'https://asuratoon.com/wp-content/uploads/custom-upload/259594/23/01.jpg';
    const res = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
    });

    // console.log('buffer', res.data);

    const binary = Buffer.from(res.data).toString('base64');

    // console.log('binary', binary);

    // upload file to imgbb
    const response = await axios.post(
      'https://api.imgbb.com/1/upload?key=e455a43ad14d2cec2e6366904d7f7bf2',
      {
        image: {
          data: binary,
          name: 'filename.jpg', // Set a meaningful file name
        },
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );

    console.log('uploaded', response.data.error);
  };

  const upFetch = async () => {
    console.log('upFetch called');
    var formdata = new FormData();
    // formdata.append(
    //   'image',
    //   fileInput.files[0],
    //   '/C:/Users/tiwar/Downloads/01-193.jpg',
    // );

    const url =
      'https://asuratoon.com/wp-content/uploads/custom-upload/259594/23/01.jpg';
    const res = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
    });

    // console.log('buffer', res.data);

    const binary = Buffer.from(res.data).toString('base64');

    formdata.append('image', binary);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://api.imgbb.com/1/upload?key=e455a43ad14d2cec2e6366904d7f7bf2',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => console.log('result', result))
      .catch((error) => console.log('error', error));
  };

  upFetch();

  return (
    <div>
      <h1>Page ImgBB</h1>
      {/*<input type="file" onChange={(e) => setFile(e.target.files[0])} />*/}
      {/*<button onClick={uploadBB}>Click</button>*/}
    </div>
  );
};

export default Page;
