import React from "react";
interface CheckboxProps {
	title: string;
	description?: string;
	forceChecked?: boolean;
	onCheck: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
	title,
	description,
	forceChecked = false,
	onCheck,
}: CheckboxProps) => {
	const [checked, setChecked] = React.useState(forceChecked ? true : false);
	const getCheckImg = () => {
		if (forceChecked) {
			return "/checkbox-selected-circle.svg";
		}
		if (checked) {
			return "/checkbox-selected.svg";
		} else {
			return "/checkbox.svg";
		}
	};

	const onClickButton = () => {
		const curr = checked;
		setChecked((curr) => !curr);
		onCheck(!curr);
	};

	return (
		<button
			className="flex flex-col px-[16px] w-full max-w-[650px]"
			disabled={forceChecked}
			onClick={onClickButton}
		>
			<div className="flex pb-[12px]">
				<img src={getCheckImg()} alt="checkbox" className="w-[20px] h-[20px]" />
				<div className="ml-[10px] text-left">
					<p className="body-01 text-base-100 font-bold">{title}</p>
					{description && (
						<p className="body-02 text-base-100">{description}</p>
					)}
				</div>
			</div>
			<div className="w-full h-[1px] border-primary-focus border-solid border-b-[1px]"></div>
		</button>
	);
};

export default Checkbox;
