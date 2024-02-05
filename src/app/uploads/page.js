'use client'

var AWS = require('aws-sdk')

const Page = () => {
  const getFetch = async () => {
    console.log('getfetch')
    AWS.config.update({
      accessKeyId: '2db499538cce6c4210833cf0a910863b',
      secretAccessKey:
        '4680b83108d1f1b3d63ae28317c35d055dbd9ab0683c3e1efc2d96dafdeac2e9',
      region: 'auto',
      endpoint:
        'https://d15eb0203fe48da452c69098092ecf46.r2.cloudflarestorage.com',
    })
    var s3 = new AWS.S3()

    var params = {
      Bucket: 'hola',
      Delimiter: '/',
      // Prefix: 's/5469b2f5b4292d22522e84e0/ms.files/',
    }

    s3.listObjects(params, function (err, data) {
      if (err) throw err
      console.log('data', data)
    })
  }

  getFetch()

  return (
    <div>
      Page
      {/* <button onClick={getFetch}>Get Objects</button> */}
    </div>
  )
}

export default Page
