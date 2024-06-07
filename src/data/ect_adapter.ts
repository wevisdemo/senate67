import { ApplicationGroup } from "./application_group";
import EctProvinceDistricts from "./ect_province_districts.json";
import Locations from "./province.json";

export interface Location {
	district: string;
	province: string;
}

const ECT_MAP: { [key: string]: Location } = createEctMap();

export function convertLocation(
	ectProvinceId: string,
	ectDistrictId: string,
): Location {
	return ECT_MAP[getLocationKey(ectProvinceId, ectDistrictId)];
}

export function convertApplicationGroup(
	ectJobGroupId: string,
): ApplicationGroup {
	return [
		ApplicationGroup.GovernmentAndNationalSecurity,
		ApplicationGroup.LawAndJustice,
		ApplicationGroup.Education,
		ApplicationGroup.Healthcare,
		ApplicationGroup.Farming,
		ApplicationGroup.ForestFisheryAndLivestock,
		ApplicationGroup.Labours,
		ApplicationGroup.EnvironmentRealEstateAndEnergy,
		ApplicationGroup.SmeEntrepreneurs,
		ApplicationGroup.OtherEntrepreneurs,
		ApplicationGroup.TourismAndHotel,
		ApplicationGroup.IndustryEntrepreneurs,
		ApplicationGroup.ScienceAndTechnology,
		ApplicationGroup.Women,
		ApplicationGroup.ElderlyDisabledEthicityAndOtherIdentity,
		ApplicationGroup.ArtMusicEntertainmentAndSport,
		ApplicationGroup.CivilSociety,
		ApplicationGroup.PressAndWriters,
		ApplicationGroup.Freelancers,
		ApplicationGroup.Other,
	][Number(ectJobGroupId) - 1];
}

function getLocationKey(ectProvinceId: string, ectDistrictId: string) {
	return `${ectProvinceId}_${ectDistrictId}`;
}

function createEctMap() {
	const ectMap: { [key: string]: Location } = {};
	for (const province of EctProvinceDistricts) {
		for (const district of province.districts) {
			const location = Locations.find((l) => {
				// กรุงเทพฯ cases - different name and prefix
				if (l.province === "กรุงเทพฯ" && province.name === "กรุงเทพมหานคร") {
					return `เขต${l.district}` === district.name;
				}

				// typo on location data of พรรณานิคม, สกลนคร
				if (province.name === "สกลนคร" && district.name === "พรรณานิคม") {
					return l.province === province.name && l.district === "พรรณนานิคม";
				}

				return l.province === province.name && l.district === district.name;
			});

			if (location) {
				ectMap[getLocationKey(String(province.id), String(district.id))] =
					location;
			} else {
				console.error(
					`Cannot find location for: ${district.name}, ${province.name}`,
				);
			}
		}
	}
	return ectMap;
}
