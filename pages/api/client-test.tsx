import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await client.user.create({
    data: {
      email: 'junghong@ninewatt.com',
      name: 'junghong',
    },
  });

  res.json({
    ok: true,
  });
}
