import DistrictSelectionSection from "./DistrictSelectionSection";
import OccupationSelectionSection from "./OccupationSelectionSection.tsx";
import PersonalSelectionSection from "./PersonalSelectionSection.tsx";
import React from "react";
const OptionsPage: React.FC = () => {
	return (
		<>
			<DistrictSelectionSection />
			<OccupationSelectionSection />
			<PersonalSelectionSection />
		</>
	);
};

export default OptionsPage;
