import React, { useState } from "react";
import QuestionLabel from "./QuestionLabel.tsx";
import Checkbox from "./Checkbox.tsx";
import {
	personalListData,
	type CheckboxInfo,
} from "../../data/senate_option.ts";

interface PropsType {
	onChangeResults: (results: string[]) => void;
}

const PersonalSelectionSection: React.FC<PropsType> = ({
	onChangeResults,
}: PropsType) => {
	const [results, setResults] = useState<string[]>([]);
	const personalList: CheckboxInfo[] = personalListData;

	const handleChange = (occupation: string, isChecked: boolean) => {
		const newResults = [...results];
		if (isChecked) {
			newResults.push(occupation);
		} else {
			newResults.splice(newResults.indexOf(occupation), 1);
		}
		setResults(newResults);
		onChangeResults(newResults);
	};
	return (
		<section className="flex flex-col bg-primary items-center space-y-[20px] py-[20px] pb-[40px]">
			<QuestionLabel number={3} light />
			<h2 className="heading-01 text-base-100 text-center px-[16px]">
				มีคุณสมบัติใดต่อไปนี้หรือไม่
			</h2>
			<p className="body-02 text-secondary px-[16px]">เลือกได้มากกว่า 1 ข้อ</p>
			<div className="w-full flex flex-col justify-center items-center space-y-[10px]">
				{personalList.map((personal) => {
					return (
						<Checkbox
							key={personal.title}
							title={personal.title}
							description={personal.description}
							onCheck={(isChecked) => handleChange(personal.title, isChecked)}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default PersonalSelectionSection;
