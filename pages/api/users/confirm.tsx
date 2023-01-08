import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  // 입력받은 토큰과 일치하는 유저 미존재
  if (!foundToken) return res.status(404).end();

  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save();

  // 해당 userId의 token들을 모두 삭제 --> Token을 한번만 사용할 수 있도록
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    method: 'POST',
    handler,
    isPrivate: false,
  }),
);
