"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
	return (
		<button
			className="bg-red-500 p-4 rounded-lg text-white"
			onClick={() => signOut()}
		>
			Logout
		</button>
	);
};

export default Logout;
