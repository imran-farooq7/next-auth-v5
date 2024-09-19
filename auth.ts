import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/db";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GitHub,
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, request) {
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email as string,
					},
				});
				if (!user) {
					throw new Error("user does not exist");
				} else {
					const isPasswordCorrect = await compare(
						credentials.password as string,
						user.password
					);
					console.log(isPasswordCorrect);
					if (!isPasswordCorrect) {
						throw new Error("password is incorrect");
					}
				}
				return {
					id: user.id,
					email: user.email,
				};
			},
		}),
	],
});
