import { ApplicationGroup } from "../../data/application_group.ts";
import type { Location, Result } from "../../data/senate_option.ts";
import DistrictSelectionSection from "./DistrictSelectionSection";
import OccupationSelectionSection from "./OccupationSelectionSection.tsx";
import PersonalSelectionSection from "./PersonalSelectionSection.tsx";
import ResultForRegisterSection from "./ResultForRegisterSection.tsx";
import React, { useState } from "react";

const OptionsPage: React.FC = () => {
	const [locations, setLocations] = useState<Location[]>([]);
	const [occupations, setOccupations] = useState<string[]>([
		ApplicationGroup.Other,
	]);
	const [personals, setPersonals] = useState<string[]>([]);

	const getResults = (): Result[] => {
		const attributes = [...occupations, ...personals];
		return locations.reduce((acc: Result[], location) => {
			const groupResults: Result[] = attributes.map((group) => {
				return {
					province: location.province,
					district: location.district,
					group: group,
				};
			});

			acc = [...acc, ...groupResults];
			return acc;
		}, []);
	};

	return (
		<>
			<DistrictSelectionSection
				onChangeResults={(results) => setLocations(results)}
			/>
			<OccupationSelectionSection
				onChangeResults={(results) => setOccupations(results)}
			/>
			<PersonalSelectionSection
				onChangeResults={(results) => setPersonals(results)}
			/>
			<ResultForRegisterSection results={getResults()} />
		</>
	);
};

export default OptionsPage;
