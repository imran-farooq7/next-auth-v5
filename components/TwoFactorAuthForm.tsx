"use client";

import { get2FAuth } from "@/lib/actions";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
	twofa: boolean;
}
const TwoFactorAuthForm = ({ twofa }: Props) => {
	const [isActive, setIsActive] = useState(twofa);
	const [step, setStep] = useState(1);
	const [code, setCode] = useState("");
	const handleEnable = async () => {
		const res = await get2FAuth();
		console.log(res);
		if (res?.status === "error") {
			toast.error(res?.message);
			return;
		}

		setStep(2);
		setCode(res?.twoFactorAuth!);
	};
	console.log(code);
	if (!isActive && step === 1) {
		return (
			<button
				onClick={handleEnable}
				className="bg-emerald-500 rounded-lg text-white px-5 py-3"
			>
				Enable 2 Factor Authentication
			</button>
		);
	}
	if (step === 2) {
		return (
			<div className="max-w-md">
				<p className="mb-4">
					Scan the QR code below with Google Authenticator app in order to
					activate Two Factor Auth
				</p>
				<QRCodeCanvas value={code} />
				<div className="space-y-4 mt-4">
					<button
						onClick={() => setStep(3)}
						className="bg-emerald-500 w-full rounded-lg px-4 py-3 text-white"
					>
						I have scanned the QR code
					</button>
					<button
						onClick={() => setStep(1)}
						className="bg-red-500 w-full rounded-lg px-5 py-3 text-white"
					>
						Cancel
					</button>
				</div>
			</div>
		);
	}

	return <div></div>;
};

export default TwoFactorAuthForm;
