"use client";

import { useState } from "react";

interface Props {
	twofa: boolean;
}
const TwoFactorAuthForm = ({ twofa }: Props) => {
	const [isActive, setIsActive] = useState(twofa);
	const [step, setStep] = useState(1);
	const handleEnable = () => {
		setStep(2);
	};
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
		return <div>qr code</div>;
	}

	return <div></div>;
};

export default TwoFactorAuthForm;
