import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	if (!session) {
		return redirect("/login");
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 flex items-center justify-center">
				{children}
			</main>
		</div>
	);
};

export default layout;
