import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '@libs/server/withHandler';
import client from '@libs/server/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  // const user = await client.user.upsert({
  //   where: {
  //     ...payload,
  //   },
  //   create: {
  //     name: 'Anonymous',
  //     ...payload,
  //   },
  //   update: {},
  // });

  const token = await client.token.create({
    data: {
      payload: '1234',
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: 'Anonymous',
            ...payload,
          },
        },
      },
    },
  });

  console.log(token);

  return res.status(200).end();
}

export default withHandler('POST', handler);
