'use server';

import axios from 'axios';

export default async function getImageBuffer(url, returnType) {
  const res = await axios({
    method: 'get',
    url: url,
    responseType: 'arraybuffer',
  });

  if (returnType === 'buffer') {
    return Buffer.from(res.data);
  } else {
    const base64String = Buffer.from(res.data).toString('base64');
    console.log('response buffer', base64String);
    return base64String;
  }
}
