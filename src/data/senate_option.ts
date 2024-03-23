import defaultProvince from "./province.json";

export interface CheckboxInfo {
	title: string;
	description?: string;
}

export interface Result {
	province: string;
	district: string;
	attribute: string;
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

export const occupationListData: CheckboxInfo[] = [
	{
		title: "กลุ่มการบริหารราชการแผ่นดินและความมั่นคง",
		description: "เช่น อดีตข้าราชการ เจ้าหน้าที่รัฐ หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มกฎหมายและกระบวนการยุติธรรม",
		description:
			"เช่น ผู้พิพากษา อัยการ ตำรวจ ผู้ประกอบวิชาชีพกฎหมาย หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มการศึกษา",
		description:
			"เช่น ครู อาจารย์ นักวิจัย ผู้บริหารสถานศึกษา หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มการสาธารณสุข",
		description: "เช่น การแพทย์ พยาบาล เภสัชกร  หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มอาชีพทำนา ปลูกพืชล้มลุก",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มอาชีพทำสวน ป่าไม้ ปศุสัตว์ ประมง",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มพนักงานลูกจ้างที่ไม่ใช่ราชการหรือหน่วยงานรัฐ ผู้ใช้แรงงาน",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title:
			"กลุ่มผู้ประกอบอาชีพด้านสิ่งแวดล้อม ผังเมือง อสังหาฯ และสาธารณูปโภค ทรัพยากรธรรมชาติ พลังงาน",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มผู้ประกอบกิจการขนาดกลางและขนาดย่อยตามกฎหมาย",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มผู้ประกอบกิจการอื่นนอกจากข้อที่แล้ว",
		description: "เช่น อดีตข้าราชการ เจ้าหน้าที่รัฐ หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มผู้ประกอบธุรกิจหรืออาชีพด้านการท่องเที่ยว",
		description:
			"เช่น มัคคุเทศก์ ผู้ประกอบกิจการอื่นหรือพนักงานโรงแรม หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มผู้ประกอบอุตสาหกรรม",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title:
			"กลุ่มผู้ประกอบอาชีพด้านวิทยาศาสตร์ เทคโนโลยี การสื่อสาร การพัฒนานวัตกรรม",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มศิลปะ วัฒนธรรม ดนตรี การแสดงและบันเทิง นักกีฬา",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มประชาสังคม กลุ่มองค์กรสาธารณประโยชน์",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มสื่อสารมวลชน ผู้สร้างสรรค์วรรณกรรม",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
	{
		title: "กลุ่มผู้ประกอบวิชาชีพ ผู้ประกอบอาชีพอิสระ",
		description: "หรืออื่นๆ ในทำนองเดียวกัน",
	},
];

export const personalListData: CheckboxInfo[] = [
	{ title: "เป็นผู้หญิง โดยเพศกำเนิด" },
	{
		title:
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
