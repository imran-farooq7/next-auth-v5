export default function Card({ children }: { children: React.ReactNode }) {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow">
			<div className="px-4 py-5 sm:p-6 flex flex-col gap-6">
				{children}
				{/* <button className="bg-emerald-400 text-white px-8 py-3 rounded-lg">
					Enable FA
				</button> */}
			</div>
		</div>
	);
}
