"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";

export const registerUser = async (data: {
	email: string;
	password: string;
	confirmPassword: string;
}) => {
	const hashedPassword = await bcrypt.hash(data.password, 12);
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
		if (error.code === "23505") {
			return {
				statusbar: "error",
				message: "User email already exists",
			};
		}
		return {
			statusbar: "error",
			message: "User creation failed",
		};
	}
};
