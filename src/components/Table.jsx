import { Card, Typography } from '@material-tailwind/react'
import { Button } from '@material-tailwind/react'

export function TableWithStripedRows({ head, data }) {
  return (
    <Card className='h-full w-full overflow-scroll rounded-xl'>
      <table className='w-full min-w-max table-auto text-left'>
        <thead>
          <tr>
            {head.map((head) => (
              <th
                key={head}
                className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
              >
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal leading-none opacity-70'
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(({ title, _createdAt }, index) => (
            <tr key={Math.random(index)} className='even:bg-blue-gray-50/50'>
              <td className='p-4'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal'
                >
                  {index + 1}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal'
                >
                  {title}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal'
                >
                  {_createdAt}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography
                  as='a'
                  href='#'
                  variant='small'
                  color='blue-gray'
                  className='font-medium'
                >
                  <Button className='rounded-full' color='red'>
                    Delete
                  </Button>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
