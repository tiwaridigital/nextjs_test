import { NextResponse } from 'next/server'

export function middleware(req) {
  console.log('reques', req)
  // retrieve the current response
  const res = NextResponse.next()

  // add the CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', 'true')
  res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
  res.headers.append(
    'Access-Control-Allow-Methods',
    'GET,DELETE,PATCH,POST,PUT'
  )
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // if (req.method === 'OPTIONS') {
  console.log('inside options')
  res.headers.append('Allow', 'POST')
  // return res.status(202).json({})
  // }

  // Allow only POST Methods
  if (req.method !== 'POST') {
    console.log('inside post')
    res.headers.append('Allow', 'POST')
    // return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  console.log('response', res)

  return res
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: '/uploads/:path*',
}
