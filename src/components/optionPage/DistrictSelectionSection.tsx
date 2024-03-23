import React from "react";
import QuestionLabel from "./QuestionLabel.tsx";
import DistrictSelector from "./DistrictSelector.tsx";

interface PropsType {}

const DistrictSelectionSection: React.FC<PropsType> = ({}: PropsType) => {
	return (
		<section className="flex flex-col bg-secondary justify-center items-center space-y-[20px] px-[16px] py-[20px]">
			<QuestionLabel number={1} />
			<h2 className="heading-01 text-neutral text-center">
				คุณเคยเกี่ยวข้องกับอำเภอ/เขตไหนบ้าง
			</h2>
			<div className="w-full flex flex-col items-center">
				<DistrictSelector
					title="อำเภอ/เขตที่คุณเกิด (ที่ตั้งโรงพยาบาล หรือสถานที่ในสูติบัตร)"
					canAppend={true}
				/>
			</div>
		</section>
	);
};

export default DistrictSelectionSection;
