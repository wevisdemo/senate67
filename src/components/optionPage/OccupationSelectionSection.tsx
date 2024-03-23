import React, { useState } from "react";
import QuestionLabel from "./QuestionLabel.tsx";
import Checkbox from "./Checkbox.tsx";
import {
	occupationListData,
	type CheckboxInfo,
} from "../../data/senate_option.ts";

interface PropsType {
	onChangeResults: (results: string[]) => void;
}

const OccupationSelectionSection: React.FC<PropsType> = ({
	onChangeResults,
}: PropsType) => {
	const [results, setResults] = useState<string[]>(["กลุ่มอื่นๆ"]);
	const occupationList: CheckboxInfo[] = occupationListData;

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
		<section className="flex flex-col bg-primary items-center space-y-[20px] py-[20px]">
			<QuestionLabel number={2} />
			<h2 className="heading-01 text-base-100 text-center px-[16px]">
				คุณเคยทำงานเป็นเวลาไม่น้อยกว่า 10 ปี ในกลุ่มอาชีพใดบ้าง?
			</h2>
			<p className="body-02 text-secondary px-[16px]">เลือกได้มากกว่า 1 ข้อ</p>
			<div className="w-full flex flex-col justify-center items-center space-y-[10px]">
				{occupationList.map((occupation) => {
					return (
						<Checkbox
							key={occupation.title}
							title={occupation.title}
							description={occupation.description}
							onCheck={(isChecked) => handleChange(occupation.title, isChecked)}
						/>
					);
				})}
				<Checkbox
					title="กลุ่มอื่นๆ"
					description="ผู้สมัครทุกคนมีสิทธิสมัครใน “กลุ่มอื่นๆ” ได้หมด"
					forceChecked={true}
					onCheck={(isChecked) => handleChange("กลุ่มอื่นๆ", isChecked)}
				/>
			</div>
		</section>
	);
};

export default OccupationSelectionSection;
