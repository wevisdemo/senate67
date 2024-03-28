import { ApplicationGroup } from "./application_group";
import defaultProvince from "./province.json";

export interface CheckboxInfo {
	title: string;
	description?: string;
}

export interface Result {
	province: string;
	district: string;
	group: string;
}

interface LocationQuestion {
	title: string;
	canAppend: boolean;
}

export const locationQuestions: LocationQuestion[] = [
	{
		title: "อำเภอ/เขตที่คุณเกิด (ที่ตั้งโรงพยาบาล หรือสถานที่ในสูติบัตร)",
		canAppend: false,
	},
	{
		title:
			"อำเภอ/เขตที่มีชื่ออยูในทะเบียนบ้าน หรือเคยมีชื่ออยู่ในทะเบียนบ้าน ติดต่อกันไม่น้อยกว่า 2 ปี",
		canAppend: true,
	},
	{
		title: "อำเภอ/เขต ที่ทำงาน หรือเคยทำงาน ติดต่อกันไม่น้อยกว่า 2 ปี",
		canAppend: true,
	},
	{
		title: "อำเภอ/เขต ที่เคยศึกษาในสถานศึกษาติดต่อกันไม่น้อยกว่า 2 ปี",
		canAppend: true,
	},
];

const occupationDescriptionMap = new Map<string, string>([
	[
		ApplicationGroup.GovernmentAndNationalSecurity,
		"เช่น อดีตข้าราชการ เจ้าหน้าที่รัฐ",
	],
	[
		ApplicationGroup.LawAndJustice,
		"เช่น ผู้พิพากษา อัยการ ตำรวจ ผู้ประกอบวิชาชีพกฎหมาย",
	],
	[ApplicationGroup.Education, "เช่น ครู อาจารย์ นักวิจัย ผู้บริหารสถานศึกษา"],
	[ApplicationGroup.Healthcare, "เช่น การแพทย์ พยาบาล เภสัชกร"],
	[ApplicationGroup.OtherEntrepreneurs, "เช่น อดีตข้าราชการ เจ้าหน้าที่รัฐ"],
	[
		ApplicationGroup.TourismAndHotel,
		"เช่น มัคคุเทศก์ ผู้ประกอบกิจการอื่นหรือพนักงานโรงแรม",
	],
]);

export const occupationListData: CheckboxInfo[] = Object.values(
	ApplicationGroup,
)
	.map((title) => ({
		title,
		description:
			`${occupationDescriptionMap.get(title) ?? ""} หรืออื่นๆ ในทำนองเดียวกัน`.trim(),
	}))
	.filter(({ title }) => title !== ApplicationGroup.Other);

export const personalListData: CheckboxInfo[] = [
	{ title: ApplicationGroup.Women, description: "เป็นผู้หญิง โดยเพศกำเนิด" },
	{
		title: ApplicationGroup.ElderlyDisabledEthicityAndOtherIdentity,
		description:
			"เป็นผู้สูงอายุ คนพิการหรือทุพพลภาพ กลุ่มชาติพันธุ์ กลุ่มอัตลักษณ์อื่น",
	},
];

export interface Location {
	district: string;
	province: string;
}

// create function to get locations those import from ./province.json
export const getLocations = (): Location[] => {
	const locations: Location[] = defaultProvince;
	return locations;
};

export const getProvinceList = (): string[] => {
	const locations: Location[] = getLocations();
	const provinces: string[] = locations.map((location) => location.province);
	// remove duplicate province and sort
	return [...new Set(provinces)].sort();
};

export const getDistrictList = (province: string): string[] => {
	const locations: Location[] = getLocations();
	const districts: string[] = locations
		.filter((location) => location.province === province)
		.map((location) => location.district);
	return districts;
};

export interface LocationMap {
	[key: string]: string[];
}

export const getLocationMap = (): LocationMap => {
	const locations: Location[] = getLocations();
	const locationMap: LocationMap = {};
	locations.forEach((location) => {
		if (!locationMap[location.province]) {
			locationMap[location.province] = [];
		}
		locationMap[location.province].push(location.district);
	});

	// sort district in locationMap
	for (const province in locationMap) {
		locationMap[province].sort();
	}
	return locationMap;
};

// function to random integer 4 number
export const random4Digit = (): number => {
	return Math.floor(1000 + Math.random() * 9000);
};
