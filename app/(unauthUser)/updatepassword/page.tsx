import Card from "@/components/Card";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import prisma from "@/prisma/db";
import Link from "next/link";

interface Props {
	searchParams: {
		token?: string;
	};
}
const UpdatePasswordPage = async ({ searchParams: { token } }: Props) => {
	let isValidToken = false;
	if (token) {
		const tokenDb = await prisma.passwordResetToken.findFirst({
			where: {
				token,
			},
		});
		const now = Date.now();
		if (tokenDb?.token && now < tokenDb.tokenExpiration.getTime()) {
			isValidToken = true;
		}
	}
	return (
		<div className="flex flex-1 justify-center items-center flex-col min-h-screen">
			{isValidToken ? (
				<UpdatePasswordForm token={token!} />
			) : (
				<Card>
					<p className="font-bold text-2xl">
						Your password link is invalid or expired
					</p>
					<Link
						className="text-emerald-700 underline cursor-pointer"
						href={"/passwordreset"}
					>
						Send another password reset link{" "}
					</Link>
				</Card>
			)}
		</div>
	);
};

export default UpdatePasswordPage;
