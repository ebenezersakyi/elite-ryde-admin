import { NextRequest, NextResponse } from 'next/server';
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired(async (req: NextRequest) => {
  const res = NextResponse.next();

  const user = await getSession(req, res);

  if (!user && req.url.includes('/dashboard')) {
    // Do what you want...
    return NextResponse.redirect('/')
  }

//   return res;
});

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }