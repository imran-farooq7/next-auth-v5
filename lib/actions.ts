"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";

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
