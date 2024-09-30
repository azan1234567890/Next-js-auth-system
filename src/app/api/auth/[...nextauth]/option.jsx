import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_AI;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const response = await axios.post(`${API_BASE_URL}/Auth/Authenticate`, {
            userKey: credentials.username,
            password: credentials.password,
          });
          const data = response?.data;
          const user = JSON.parse(data.message);
          return user;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.Id;
        token.name = user.Name;
        token.email = user.Email;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
