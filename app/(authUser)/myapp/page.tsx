import { auth } from "@/auth";
import Card from "@/components/Card";

const MyApp = async () => {
	const session = await auth();
	return (
		<Card>
			<p>Your Account</p>
			<p className="font-bold text-emerald-500">Email</p>
			<p>{session?.user?.email}</p>
		</Card>
	);
};

export default MyApp;
