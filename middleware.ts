import { withAuth } from "next-auth/middleware"

const whitelist = [
  '/api/mail/recoveryPassword',
  '/reset/password',
  '/api/healthcheck'
];

export default withAuth(
  (req) => {},
  {
    pages: {
      signIn: '/signin',
    },
    callbacks: {
      authorized: ({ req, token }) => {
        const {
          nextUrl: {
            pathname
          }
        } = req;

        if (token) {
          return true;
        }

        if (whitelist.includes(pathname)) {
          return true;
        }
        return false;
      }
    },
  }
)