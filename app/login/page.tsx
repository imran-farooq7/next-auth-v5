"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
interface FormValues {
	email: string;
	password: string;
}

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-white">
						Login
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
					<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
						<form className="space-y-6">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										type="email"
										{...register("email", { required: true })}
										autoComplete="email"
										required
										className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										type="password"
										autoComplete="current-password"
										{...register("password", { required: true })}
										required
										className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait"
								>
									Login
								</button>
							</div>
						</form>
					</div>

					<p className="mt-10 text-center text-sm text-gray-100">
						Not a registered user?{" "}
						<Link
							href="/register"
							className="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
						>
							Register
						</Link>
					</p>
					<p className="mt-5 text-center text-sm text-gray-100">
						Forgot password?{" "}
						<Link
							href="/register"
							className="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
						>
							Forget Password
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
