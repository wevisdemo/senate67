import React, { useState } from "react";

interface PropsType {
	title: string;
	canAppend?: boolean;
}

const DistrictSelector: React.FC<PropsType> = ({
	title,
	canAppend = false,
}: PropsType) => {
	const [value, setValue] = useState("default");
	return (
		<div className="md:max-w-[650px] w-full space-y-[10px]">
			<p className="body-01 font-bold">{title}</p>
			<div className="flex space-x-[2px]">
				<select className="select w-full body-01" defaultValue={"default"}>
					<option value={"default"} disabled>
						เลือกจังหวัด
					</option>
					<option value="Homer">Homer</option>
					<option value="Marge">Marge</option>
					<option value="Bart">Bart</option>
					<option value="Lisa">Lisa</option>
					<option value="Maggie">Maggie</option>
				</select>
				<select className="select w-full body-01" defaultValue={"default"}>
					<option value={"default"} disabled>
						อำเภอ/เขต
					</option>
					<option value="Homer">Homer</option>
					<option value="Marge">Marge</option>
					<option value="Bart">Bart</option>
					<option value="Lisa">Lisa</option>
					<option value="Maggie">Maggie</option>
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
