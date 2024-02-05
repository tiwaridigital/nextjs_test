import { GetObjectCommand } from '@aws-sdk/client-s3'
import { createHash } from 'crypto'

async function getObjectWithSha256Header() {
  try {
    const params = {
      Bucket: 'hola',
      Key: 'random.pdf',
    }

    // Calculate SHA-256 hash for small payloads (single chunk):
    const buffer = Buffer.from('YOUR_PAYLOAD_DATA') // Replace with your actual data
    const sha256Hash = createHash('sha256').update(buffer).digest('hex')

    const command = new GetObjectCommand(params)
    command.headers = {
      'x-amz-content-sha256': sha256Hash,
    }

    const response = await s3Client.send(command)
    const data = await response.Body.transformToString()

    console.log('Retrieved data:', data)
  } catch (error) {
    console.error('Error retrieving object:', error)
  }
}

getObjectWithSha256Header()
