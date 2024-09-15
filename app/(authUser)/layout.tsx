import Navbar from "@/components/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
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
