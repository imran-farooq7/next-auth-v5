import { auth } from "@/auth";
import Card from "@/components/Card";

const MyApp = async () => {
	const session = await auth();
	return <Card text={session?.user?.email!} />;
};

export default MyApp;
