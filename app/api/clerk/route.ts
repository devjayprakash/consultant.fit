import prisma from '@/lib/prisma';
import { WebhookEvent } from '@clerk/nextjs/server';
import { UserStatus } from '@prisma/client';

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json();

  if (payload.type === 'user.deleted') {
    if (process.env.NODE_ENV === 'development') {
      await prisma.user.delete({
        where: {
          clerkId: payload.data.id,
        },
      });
    } else {
      await prisma.user.update({
        where: {
          clerkId: payload.data.id,
        },
        data: {
          status: UserStatus.deleted,
        },
      });
    }
  }

  if (payload.type === 'user.updated') {
    await prisma.user.update({
      where: {
        clerkId: payload.data.id,
      },
      data: {
        first_name: payload.data.first_name,
        last_name: payload.data.last_name,
        profile_pic: payload.data.image_url,
        email: payload.data.email_addresses[0].email_address,
      },
    });
  }

  if (payload.type === 'user.created') {
    await prisma.user.create({
      data: {
        first_name: payload.data.first_name,
        last_name: payload.data.last_name,
        profile_pic: payload.data.image_url,
        email: payload.data.email_addresses[0].email_address,
        clerkId: payload.data.id,
        UserSettings: {
          create: {},
        },
      },
    });
    console.log('User created:', payload.data.id);
  }

  return new Response('ok');
}
