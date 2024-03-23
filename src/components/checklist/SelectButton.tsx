import { type PropsWithChildren } from "react";

interface SelectButtonProps {
	isActive: boolean;
	onClick: () => void;
}

export default function SelectButton({
	isActive,
	onClick,
	children,
}: PropsWithChildren<SelectButtonProps>) {
	return (
		<button
			className={`btn btn-neutral w-20 ${isActive ? "btn-active" : "btn-outline"}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
