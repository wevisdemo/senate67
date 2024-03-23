import React from "react";
import QuestionLabel from "./QuestionLabel.tsx";
import Checkbox from "./Checkbox.tsx";

interface PropsType {}

const OccupationSelectionSection: React.FC<PropsType> = ({}: PropsType) => {
	return (
		<section className="flex flex-col bg-primary items-center space-y-[20px] py-[20px]">
			<QuestionLabel number={2} />
			<h2 className="heading-01 text-base-100 text-center px-[16px]">
				คุณเคยทำงานเป็นเวลาไม่น้อยกว่า 10 ปี ในกลุ่มอาชีพใดบ้าง?
			</h2>
			<p className="body-02 text-secondary px-[16px]">เลือกได้มากกว่า 1 ข้อ</p>
			<div className="w-full flex flex-col justify-center items-center space-y-[10px]">
				<Checkbox
					title="กลุ่มการบริหารราชการแผ่นดินและความมั่นคง"
					description="เช่น อดีตข้าราชการ เจ้าหน้าที่รัฐ หรืออื่นๆ ในทำนองเดียวกัน"
				/>
			</div>
		</section>
	);
};

export default OccupationSelectionSection;
