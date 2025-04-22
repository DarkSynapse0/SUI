import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        //Database lookup
        const user = await fakeLogin(email, password);
        console.log(user);
      
        if (!user) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

async function fakeLogin(email: string, password: string) {
  // 🔒 Replace this logic with real database logic
  if (email === "zephyrx@example.com" && password === "test123") {
    return { id: "1", name: "ZephyrX", email };
  }
  return null;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
