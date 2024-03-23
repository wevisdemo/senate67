import React, { useState } from "react";
import QuestionLabel from "./QuestionLabel.tsx";
import DistrictSelector from "./LocationSelection.tsx";
import LocationListSelection from "./LocationList.tsx";
import { locationQuestions, type Location } from "../../data/senate_option.ts";

interface PropsType {
	onChangeResults: (locations: Location[]) => void;
}

const DistrictSelectionSection: React.FC<PropsType> = ({
	onChangeResults,
}: PropsType) => {
	const [results, setResults] = useState<Location[][]>([]);

	const removeDuplicates = (locations: Location[]): Location[] => {
		const unique = locations.map((item) => item.province + "-" + item.district);
		const uniqueSet = new Set(unique);
		return Array.from(uniqueSet).map((item) => {
			const [province, district] = item.split("-");
			return { province, district };
		});
	};
	const handleChange = (locations: Location[], index: number) => {
		const newResults = [...results];
		newResults[index] = locations;
		setResults(newResults);

		const allLocation = newResults.flat();
		onChangeResults(removeDuplicates(allLocation));
	};

	return (
		<section className="flex flex-col bg-secondary justify-center items-center space-y-[20px] px-[16px] py-[20px]">
			<QuestionLabel number={1} />
			<h2 className="heading-01 text-neutral text-center">
				คุณเคยเกี่ยวข้องกับอำเภอ/เขตไหนบ้าง
			</h2>
			<div className="w-full flex flex-col items-center space-y-[20px]">
				{locationQuestions.map((question, index) => {
					return (
						<LocationListSelection
							key={question.title + index}
							onchangeResult={(locationListResult) => {
								handleChange(locationListResult, index);
							}}
							title="อำเภอ/เขตที่คุณเกิด (ที่ตั้งโรงพยาบาล หรือสถานที่ในสูติบัตร)"
							canAppend={question.canAppend}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default DistrictSelectionSection;
