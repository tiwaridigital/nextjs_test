import { NextResponse } from 'next/server'
import chalk from 'chalk'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3 } from '@/app/lib/r2'

export async function POST(request) {
  const { fileName } = await request.json()
  try {
    console.log(chalk.yellow(`Generating an upload URL!`))

    const signedUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: 'hola',
        Key: fileName,
        // Key: `shallow.png`,
      }),
      { expiresIn: 60 }
    )

    console.log(chalk.green(`Success generating upload URL!`))

    return NextResponse.json({ url: signedUrl })
  } catch (err) {
    console.log('error')
  }
}
