// src/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    console.log(token, 'token');
    const isAuth = !!token; // Check if the user is authenticated
    const isAuthPage = req.nextUrl.pathname.startsWith('/signin');

    // If the user is on the sign-in page and is already authenticated
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Redirect to the home page
    }

    // If the user is authenticated, set the token in the request headers
    if (token) {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-auth-token', JSON.stringify(token));
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true; // Allow access to all routes
      },
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
