"use server";

import { auth, signIn } from "@/auth";
import prisma from "@/prisma/db";
import bcrypt, { compare, hash } from "bcryptjs";
import { randomBytes } from "crypto";
import { mailer } from "./email";

export const registerUser = async (data: {
	email: string;
	password: string;
	confirmPassword: string;
}) => {
	const hashedPassword = await bcrypt.hash(data.password, 10);
	try {
		const user = await prisma.user.create({
			data: {
				email: data.email,
				password: hashedPassword,
			},
		});
		if (user) {
			return {
				statusbar: "success",
				message: "User created successfully",
			};
		}
	} catch (error: any) {
		console.log(error);
		if (error.code === "P2002") {
			return {
				statusbar: "error",
				message: "An account already exists with this email address",
			};
		} else {
			return {
				statusbar: "error",
				message: "User creation failed",
			};
		}
	}
};
export const loginUser = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	try {
		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
		if (res) {
			return {
				status: "success",
				message: "login successfully",
			};
		}
	} catch (error) {
		return {
			status: "error",
			message: "incorrect email or password",
		};
	}
};
export const changePassword = async ({
	currentPassword,
	password,
	confirmPassword,
}: {
	currentPassword: string;
	password: string;
	confirmPassword: string;
}) => {
	const session = await auth();
	if (!session?.user?.email) {
		return {
			statusbar: "error",
			message: "You must be logged in to change your password",
		};
	}
	const userPassword = await prisma.user.findUnique({
		where: {
			email: session?.user?.email!,
		},
		select: {
			password: true,
		},
	});
	const isPasswordCorrect = await compare(
		currentPassword,
		userPassword?.password!
	);
	if (isPasswordCorrect) {
		const hashedPassword = await bcrypt.hash(password, 10);
		const updateUserPassword = await prisma.user.update({
			where: {
				email: session?.user?.email!,
			},
			data: {
				password: hashedPassword,
			},
		});
		if (updateUserPassword) {
			return {
				status: "success",
				message: "Password changed successfully",
			};
		}
	} else {
		return {
			status: "error",
			message: "Invalid current password",
		};
	}
};
export const resetPassword = async (emailAddress: string) => {
	const session = await auth();
	if (session?.user?.email) {
		return {
			status: "error",
			message: "You are already logged in!",
		};
	}
	const user = await prisma.user.findUnique({
		where: {
			email: emailAddress,
		},
	});
	if (!user) {
		return {
			status: "error",
			message: "User not found",
		};
	}
	const tokenExpiry = new Date(Date.now() + 3600000);
	const passwordResetToken = randomBytes(32).toString("hex");
	const newPasswordResetToken = await prisma.passwordResetToken.upsert({
		where: {
			userEmail: emailAddress,
		},
		update: {
			token: passwordResetToken,
			tokenExpiration: tokenExpiry,
		},
		create: {
			token: passwordResetToken,
			tokenExpiration: tokenExpiry,
			userEmail: emailAddress,
		},
	});
	const resetLink = `${process.env.SITE_BASE_URL}/updatepassword?token=${newPasswordResetToken.token}`;
	await mailer.sendMail({
		from: "test@resend.dev",
		subject: "Your password reset link",
		to: emailAddress,
		text: `Hi, ${emailAddress} you have requested your password reset 
		Here is the your password reset link
		<a href=${resetLink}>Click it</a>`,
	});
};
export const updateUserPassword = async (token: string, password: string) => {
	const passwordResetToken = await prisma.passwordResetToken.findFirst({
		where: {
			token,
		},
	});
	const hashedPassword = await hash(password, 10);
	const updateUserPassword = await prisma.user.update({
		where: {
			email: passwordResetToken?.userEmail,
		},
		data: {
			password: hashedPassword,
		},
	});
	if (updateUserPassword) {
		return {
			status: "success",
			message: "User password reset successfully",
		};
	} else {
		return {
			status: "error",
			message: "Something went wrong",
		};
	}
};
