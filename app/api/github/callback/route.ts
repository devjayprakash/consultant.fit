import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import axios from 'axios';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string;
  const client_secret = process.env.GITHUB_CLIENT_SECRET as string;

  const result = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id,
      client_secret,
      code: url.searchParams.get('code'),
    }
  );

  const access_token = (result.data as string).split('&')[0].split('=')[1];
  const c_auth = auth();

  if (!c_auth.userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  await prisma.user.update({
    where: {
      clerkId: c_auth.userId,
    },
    data: {
      github_access_token: access_token,
    },
  });

  return Response.redirect('http://localhost:3000/app/repos');
};
