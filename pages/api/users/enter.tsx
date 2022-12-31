import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';

// TWILIO
import twilio from 'twilio';
// SENDGRID
import mail from '@sendgrid/mail';

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
      to: process.env.MY_PHONE_NUMBER!,
      body: `Your login token is ${payload}.`,
    });
  } else if (email) {
    const email = await mail.send({
      from: 'junghong0512@gamil.com',
      to: 'junghong0512@gmail.com',
      subject: 'Your Vintage Market Verification Email',
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    });
    console.log(email);
  }

  return res.json({ ok: true });
}

export default withHandler('POST', handler);
