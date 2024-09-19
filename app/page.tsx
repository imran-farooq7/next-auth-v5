import Link from "next/link";
import React from "react";

const Home = () => {
	return (
		<div className="min-h-screen justify-center items-center flex flex-col gap-4">
			<h1 className="font-bold text-3xl text-center text-emerald-300">
				Welcome to Next Auth
			</h1>
			<Link
				href={"/register"}
				className="rounded-md text-center w-80 bg-indigo-600 px-3.5 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Register
			</Link>
			<Link
				href={"/login"}
				className="rounded-md text-center w-80 bg-white px-3.5 py-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			>
				Login
			</Link>
		</div>
	);
};

export default Home;
