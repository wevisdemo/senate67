import React, { useState } from "react";
import { getLocationMap, type Location } from "../../data/senate_option";
import LocationSelection from "./LocationSelection";

interface PropsType {
	title: string;
	canAppend?: boolean;
	onchangeResult: (locations: Location[]) => void;
}

const LocationListSelection: React.FC<PropsType> = ({
	title,
	canAppend = false,
	onchangeResult,
}: PropsType) => {
	const [locations, setLocations] = useState<Location[]>([
		{ province: "default", district: "default" },
	]);
	const onClickAddLocation = () => {
		setLocations([...locations, { province: "default", district: "default" }]);
	};
	const locationOnChange = (location: Location, index: number) => {
		const newLocations = [...locations];
		newLocations[index] = location;
		setLocations(newLocations);
		onchangeResult(newLocations);
	};
	return (
		<div className="md:max-w-[650px] w-full space-y-[10px]">
			<p className="body-01 font-bold">{title}</p>

			{locations.map((location, index) => (
				<LocationSelection
					key={"locationList" + title + index}
					id={title + index}
					onChangeResult={(result: Location) => {
						locationOnChange(result, index);
					}}
				/>
			))}

			{canAppend && (
				<button
					onClick={onClickAddLocation}
					className="btn btn-outline btn-primary w-full"
				>
					เพิ่มอีก 1 อำเภอ/เขต
				</button>
			)}
		</div>
	);
};

export default LocationListSelection;
