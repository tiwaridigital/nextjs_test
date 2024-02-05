'use client';
import React from 'react';
import axios from 'axios';
import getImageBuffer from '@/app/serverComps/getImageBuffer';

var Buffer = require('buffer/').Buffer;

const Page = () => {
  const [file, setFile] = React.useState(null);

  const handleFileChange = (event) => {
    if (event.target.files) {
      const currentFile = event.target.files[0];
      setFile(currentFile);
    }
  };

  const getRemoteBuffer = async (url) => {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
    });

    return response;
  };

  const handleUpload = async () => {
    console.log('handleUpload called');
    // if (!file) return;

    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('Content-Type', 'multipart/form-data');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({
        fileName: 'shaluu.jpg',
      }),
    });

    const { url } = await response.json();

    // const buffer = getRemoteBuffer(
    //   'https://asuratoon.com/wp-content/uploads/2023/04/01-193.jpg',
    // );
    const bufferResult = await getImageBuffer(
      'https://asuratoon.com/wp-content/uploads/2024/01/08-copy.jpg',
    );

    const buffer = new Uint8Array(
      atob(bufferResult)
        .split('')
        .map((char) => char.charCodeAt(0)),
    );
    console.log('buffer', buffer);

    const uploaded = await fetch(url, {
      method: 'PUT',
      body: buffer,
    });

    console.log('uploaded', uploaded);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white space-y-12">
      <div className="max-w-2xl mx-auto py-24 px-4">
        <h2 className="text-base font-semibold leading-7 text-white">
          Admin Panel
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Upload the latest version of the pdf file.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="pdf-file"
              className="block text-sm font-medium leading-6 text-white"
            >
              PDF
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 text-sm leading-6 text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      accept="image/png"
                      id="file-upload"
                      name="file-upload"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-400">
                  {file?.name ? file.name : 'PDF up to 100MB'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
