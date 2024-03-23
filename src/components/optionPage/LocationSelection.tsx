import React, { useEffect, useState } from "react";
import {
	getLocationMap,
	getProvinceList,
	type Location,
} from "../../data/senate_option";
// import AutoComplete from "./AutoComplete";

interface PropsType {
	id: string;
	onChangeResult: (location: Location) => void;
}

const LocationSelection: React.FC<PropsType> = ({
	id,
	onChangeResult,
}: PropsType) => {
	// catch event if province and district are not default then do onChange result
	const handleChange = (provinceTarget: string, districtTarget: string) => {
		if (provinceTarget !== "default" && districtTarget !== "default") {
			// if (provinceTarget !== "" && districtTarget !== "") {
			const isDistrictInProvince = checkIsDistrictIsInProvice(
				provinceTarget,
				districtTarget,
			);
			if (!isDistrictInProvince) {
				const newDistrict = getLocationMap()[provinceTarget][0];
				setDistrict(newDistrict);
				onChangeResult({ province: provinceTarget, district: newDistrict });
				return;
			}
			onChangeResult({ province: provinceTarget, district: districtTarget });
		}
	};

	const checkIsDistrictIsInProvice = (province: string, district: string) => {
		const locationMap = getLocationMap();
		if (locationMap[province]) {
			return locationMap[province].includes(district);
		}
		return false;
	};

	const provinceList = getProvinceList();
	const locationMap = getLocationMap();
	const [province, setProvince] = useState("default");
	const [district, setDistrict] = useState("default");
	// const [province, setProvince] = useState("");
	// const [district, setDistrict] = useState("");

	useEffect(() => {
		handleChange(province, district);
	}, [province, district]);

	return (
		<div className="flex space-x-[2px]">
			{/* <AutoComplete
				placeholder="เลือกจังหวัด"
				options={provinceList || []}
				value={province}
				onChange={setProvince}
			/> */}
			<select
				className="select w-full body-01"
				value={province}
				onChange={(item) => {
					setProvince(item.target.value);
				}}
			>
				<option value={"default"} disabled>
					เลือกจังหวัด
				</option>
				{provinceList.map((item) => (
					<option key={id + "-" + item} value={item}>
						{item}
					</option>
				))}
			</select>
			{/* <AutoComplete
				placeholder="อำเภอ/เขต"
				options={locationMap[province] || []}
				disabled={province === ""}
				value={district}
				onChange={setDistrict}
			/> */}
			<select
				className="select w-full body-01"
				disabled={province === "default"}
				value={district}
				onChange={(item) => {
					setDistrict(item.target.value);
				}}
			>
				<option value={"default"} disabled>
					อำเภอ/เขต
				</option>
				{locationMap[province] &&
					locationMap[province].map((item) => (
						<option key={id + "-" + item} value={item}>
							{item}
						</option>
					))}
			</select>
		</div>
	);
};

export default LocationSelection;
