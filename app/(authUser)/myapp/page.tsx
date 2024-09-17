import { auth } from "@/auth";
import Card from "@/components/Card";

const MyApp = async () => {
	const session = await auth();
	return (
		<Card>
			<p>Your Account</p>
			<p>{session?.user?.email}</p>
			<button className="bg-emerald-500 rounded-lg text-white px-5 py-3">
				Enable 2 Factor Authentication
			</button>
		</Card>
	);
};

export default MyApp;
