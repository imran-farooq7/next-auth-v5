"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
interface FormValues {
	currentPassword: string;
	password: string;
	confirmPassword: string;
}

const ChangePasswordPage = () => {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			currentPassword: "",
			password: "",
			confirmPassword: "",
		},
	});
	const handleFormSubmit = () => {};
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-white">
					Change Password
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
					<form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
						<div>
							<label
								htmlFor="currentPassword"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Current Password
							</label>
							<div className="mt-2">
								<input
									id="currentPassword"
									type="password"
									{...register("currentPassword", { required: true })}
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
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Confirm Password
							</label>
							<div className="mt-2">
								<input
									id="confirmPassword"
									type="password"
									{...register("confirmPassword", {
										required: true,
										validate: (val: string) => {
											if (watch("password") !== val)
												return "Password does not match";
										},
									})}
									autoComplete="current-password"
									required
									className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								{errors.confirmPassword?.message && (
									<p className="text-red-600">
										{errors.confirmPassword.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={loading}
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait"
							>
								Change password
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChangePasswordPage;
