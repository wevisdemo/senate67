import type { Candidate } from "../../data/candidate.ts";
// TODO: uncomment this code to fetch candidates from the server
// import { getCandidates } from "../../data/get_candidates.ts";
import type { Location, Result } from "../../data/senate_option.ts";
import DistrictSelectionSection from "./DistrictSelectionSection";
import OccupationSelectionSection from "./OccupationSelectionSection.tsx";
import PersonalSelectionSection from "./PersonalSelectionSection.tsx";
import ResultForRegisterSection from "./ResultForRegisterSection.tsx";
import React, { useEffect, useState } from "react";

const OptionsPage: React.FC = () => {
	const [locations, setLocations] = useState<Location[]>([]);
	const [occupations, setOccupations] = useState<string[]>(["กลุ่มอื่นๆ"]);
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

	const [candidates, setCandidates] = useState<Candidate[]>([]);

	// TODO: uncomment this code to fetch candidates from the server
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await getCandidates();
	// 			console.log(response);
	// 			setCandidates(response);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	fetchData();
	// }, []);
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
			<ResultForRegisterSection
				results={getResults()}
				candidates={candidates}
			/>
		</>
	);
};

export default OptionsPage;
