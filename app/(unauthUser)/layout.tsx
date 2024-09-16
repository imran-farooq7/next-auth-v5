import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	if (session) {
		redirect("/myapp");
	}
	return <div className="min-h-screen flex items-center">{children}</div>;
};

export default Layout;
