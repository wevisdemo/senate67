import React from "react";
import QuestionLabel from "./QuestionLabel.tsx";
import Checkbox from "./Checkbox.tsx";

interface PropsType {}

const OccupationSelectionSection: React.FC<PropsType> = ({}: PropsType) => {
	return (
		<section className="flex flex-col bg-primary items-center space-y-[20px] py-[20px]">
			<QuestionLabel number={3} />
			<h2 className="heading-01 text-base-100 text-center px-[16px]">
				มีคุณสมบัติใดต่อไปนี้หรือไม่
			</h2>
			<p className="body-02 text-secondary px-[16px]">เลือกได้มากกว่า 1 ข้อ</p>
			<div className="w-full flex flex-col justify-center items-center space-y-[10px]">
				<Checkbox title="เป็นผู้หญิง โดยเพศกำเนิด" />
				<Checkbox title="เป็นผู้สูงอายุ คนพิการหรือทุพพลภาพ กลุ่มชาติพันธุ์ กลุ่มอัตลักษณ์อื่น" />
			</div>
		</section>
	);
};

export default OccupationSelectionSection;
