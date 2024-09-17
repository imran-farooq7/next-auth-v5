import { auth } from "@/auth";
import Card from "@/components/Card";
import TwoFactorAuthForm from "@/components/TwoFactorAuthForm";
import prisma from "@/prisma/db";

const MyApp = async () => {
	const session = await auth();
	const user = await prisma.user.findFirst({
		where: {
			email: session?.user?.email!,
		},
	});

	return (
		<Card>
			<p>Your Account</p>
			<p className="font-bold">Email</p>
			<p>{session?.user?.email}</p>
			<TwoFactorAuthForm twofa={user?.twoFactorEnabled!} />
		</Card>
	);
};

export default MyApp;
