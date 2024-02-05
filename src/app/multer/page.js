const axios = require('axios');
const fs = require('fs');
const path = require('node:path');
const Page = () => {
  const downloadFile = async (url, destinationPath) => {
    console.log('downloadFile Called');
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
    });

    console.log('response', response);

    // Create a writable stream to save the downloaded file
    const writer = fs.createWriteStream(destinationPath);

    // Pipe the response stream into the writer stream
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  };

  // Example usage:
  const remoteFileUrl =
    'https://asuratoon.com/wp-content/uploads/2023/04/01-193.jpg';
  const currentWorkingDirectory = process.cwd();
  const localFilePath = path.join(currentWorkingDirectory, 'sugar.jpg');

  downloadFile(remoteFileUrl, localFilePath)
    .then(() => {
      console.log('File downloaded successfully!');
    })
    .catch((error) => {
      console.error('Error downloading file:', error.message);
    });

  const getUrl = async () => {
    const res = await axios({
      method: 'get',
      url: 'https://asuratoon.com/wp-content/uploads/2024/01/08-copy.jpg',
      responseType: 'arraybuffer',
    });

    console.log('response', res);
  };

  getUrl();

  return (
    <>
      <div>Multer Upload</div>
      <h1 className="text-[40px] text-center">Hello World Downloader</h1>
    </>
  );
};

export default Page;
