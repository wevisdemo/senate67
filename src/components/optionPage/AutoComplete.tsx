//./components/Autocomplete.tsx

import React, { memo, useRef, useState } from "react";

type Props = {
	options: string[];
	value: string;
	placeholder: string;
	onChange(val: string): void;
	disabled?: boolean;
};

//we are using dropdown, input and menu component from daisyui
const Autocomplete = (props: Props) => {
	const { options, value, onChange, placeholder, disabled = false } = props;
	const ref = useRef<HTMLDivElement>(null);
	const handleClick = () => {
		const elem = document.activeElement;
		if (elem) {
			(elem as HTMLElement)?.blur();
		}
	};

	const getDisplayOptions = (): string[] => {
		if (value === "") {
			return options;
		}
		return options.filter((option) =>
			option.toLowerCase().includes(value.toLowerCase()),
		);
	};

	return (
		<div
			// use classnames here to easily toggle dropdown open
			className="dropdown w-full"
			ref={ref}
		>
			<input
				type="text"
				className="input input-bordered w-full"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				tabIndex={0}
				disabled={disabled}
			/>
			{/* add this part */}
			<div className="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md w-full">
				<ul
					className="menu menu-compact "
					// use ref to calculate the width of parent
					style={{ width: ref.current?.clientWidth }}
				>
					{getDisplayOptions().map((item, index) => {
						return (
							<li
								key={index}
								tabIndex={index + 1}
								onClick={() => {
									onChange(item);
									handleClick();
								}}
								className="border-b border-b-base-content/10 w-full"
							>
								<button>{item}</button>
							</li>
						);
					})}
				</ul>
				{/* add this part */}
			</div>
		</div>
	);
};

export default memo(Autocomplete);
