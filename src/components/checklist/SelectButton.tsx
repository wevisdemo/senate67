import { type PropsWithChildren } from "react";

interface SelectButtonProps {
	onClick: () => void;
}

export default function SelectButton({
	onClick,
	children,
}: PropsWithChildren<SelectButtonProps>) {
	return (
		<button className="btn btn-outline w-20" onClick={onClick}>
			{children}
		</button>
	);
}
