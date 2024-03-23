import React from "react";
interface CheckboxProps {
	title: string;
	description?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
	title,
	description,
}: CheckboxProps) => {
	const [checked, setChecked] = React.useState(false);
	const getCheckImg = () => {
		if (checked) {
			return "/checkbox-selected.svg";
		} else {
			return "/checkbox.svg";
		}
	};

	const onClickButton = () => {
		setChecked((curr) => !curr);
	};

	return (
		<div className="flex flex-col px-[16px] w-full max-w-[650px]">
			<div className="flex pb-[12px]">
				<button className="w-[20px] h-[20px]" onClick={onClickButton}>
					<img
						src={getCheckImg()}
						alt="checkbox"
						className="pointer-events-none"
					/>
				</button>
				<div className="ml-[10px]">
					<p className="body-01 text-base-100 font-bold">{title}</p>
					{description && (
						<p className="body-02 text-base-100">{description}</p>
					)}
				</div>
			</div>
			<div className="w-full h-[1px] border-primary-focus border-solid border-b-[1px]"></div>
		</div>
	);
};

export default Checkbox;
