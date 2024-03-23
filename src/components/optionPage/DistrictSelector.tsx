import React from "react";

interface PropsType {
	title: string;
	canAppend?: boolean;
}

const DistrictSelector: React.FC<PropsType> = ({
	title,
	canAppend = false,
}: PropsType) => {
	return (
		<div className="md:max-w-[650px] w-full space-y-[10px]">
			<p className="body-01 font-bold">{title}</p>
			<div className="flex space-x-[2px]">
				<select className="select w-full body-01">
					<option disabled selected>
						เลือกจังหวัด
					</option>
					<option>Homer</option>
					<option>Marge</option>
					<option>Bart</option>
					<option>Lisa</option>
					<option>Maggie</option>
				</select>
				<select className="select w-full body-01">
					<option disabled selected>
						อำเภอ/เขต
					</option>
					<option>Homer</option>
					<option>Marge</option>
					<option>Bart</option>
					<option>Lisa</option>
					<option>Maggie</option>
				</select>
			</div>
			{canAppend && (
				<button className="btn btn-outline btn-primary w-full">
					เพิ่มอีก 1 อำเภอ/เขต
				</button>
			)}
		</div>
	);
};

export default DistrictSelector;
