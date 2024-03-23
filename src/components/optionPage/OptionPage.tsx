import DistrictSelectionSection from "./DistrictSelectionSection";
import OccupationSelectionSection from "./OccupationSelectionSection.tsx";
import PersonalSelectionSection from "./PersonalSelectionSection.tsx";
import ResultForRegisterSection from "./ResultForRegisterSection.tsx";
import React from "react";
const OptionsPage: React.FC = () => {
	return (
		<>
			<DistrictSelectionSection />
			<OccupationSelectionSection />
			<PersonalSelectionSection />
			<ResultForRegisterSection />
		</>
	);
};

export default OptionsPage;
