import getImageBuffer from '@/app/serverComps/getImageBuffer';
import sharp from 'sharp';

const path = require('path');
const fs = require('fs');
const Page = () => {
  const handleSubmit = async () => {
    console.log('handleSubmit called');
    const buffer = await getImageBuffer(
      'https://asuratoon.com/wp-content/uploads/custom-upload/229453/43/01.jpg',
      'buffer',
    );

    const outputBuffer = await sharp(buffer)
      .webp({
        quality: 80,
      })

      .toBuffer();

    // Save the converted buffer to a file
    const currentWorkingDirectory = process.cwd();
    const outputPath = path.join(currentWorkingDirectory, 'webpImage80.webp');
    fs.writeFileSync(outputPath, outputBuffer);

    console.log('file saved', outputPath);
  };

  handleSubmit();

  return (
    <div>
      <h1 className="text-center text-[50px]">Sharp</h1>
      <div className="flex justify-center items-center flex-col gap-8">
        <input className="m-auto text-center" type="file" />

        <button className="h-[40px] w-[150px] bg-amber-500 text-white p-1 rounded-full">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Page;
