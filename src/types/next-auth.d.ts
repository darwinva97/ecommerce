import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // interface Session {
  //   user: {
  //     token: {
  //       _id: string;
  //       username: string;
  //       password: string;
  //       admin: boolean;
  //       __v: number;
  //     };
  //   };
  // }

  export interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   id: string;
  //   name: string;
  //   email: string;
  //   emailVerified: boolean | null;
  //   image: string;
  //   role: string;
  // }
}
