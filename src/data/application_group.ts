export enum ApplicationGroup {
	GovernmentAndNationalSecurity = "กลุ่มบริหารราชการแผ่นดินและความมั่นคง",
	LawAndJustice = "กลุ่มกฎหมายและกระบวนการยุติธรรม",
	Education = "กลุ่มการศึกษา",
	Healthcare = "กลุ่มสาธารณสุข",
	Farming = "กลุ่มทำนา ทำไร่",
	ForestFisheryAndLivestock = "กลุ่มทำสวน ป่าไม้ ประมง เลี้ยงสัตว์",
	Labours = "กลุ่มลูกจ้าง ผู้ใช้แรงงาน",
	SmeEntrepreneurs = "กลุ่มผู้ประกอบกิจการ SMEs",
	OtherEntrepreneurs = "กลุ่มผู้ประกอบกิจการอื่น",
	IndustryEntrepreneurs = "กลุ่มผู้ประกอบอุตสาหกรรม",
	EnvironmentRealEstateAndEnergy = "กลุ่มสิ่งแวดล้อม อสังหาริมทรัพย์ พลังงาน",
	TourismAndHotel = "กลุ่มท่องเที่ยว โรงแรม",
	ScienceAndTechnology = "กลุ่มวิทยาศาสตร์ เทคโนโลยี",
	ArtMusicEntertainmentAndSport = "กลุ่มศิลปะ ดนตรี บันเทิง กีฬา",
	CivilSociety = "กลุ่มประชาสังคม",
	PressAndWriters = "กลุ่มสื่อสารมวลชน นักเขียน",
	Freelancers = "กลุ่มอาชีพอิสระ",
	Women = "กลุ่มสตรี",
	ElderlyDisabledEthicityAndOtherIdentity = "กลุ่มผู้สูงอายุ คนพิการ ชาติพันธุ์ กลุ่มอัตลักษณ์อื่น",
	Other = "กลุ่มอื่นๆ",
}

export const applicationGroupShortenNames = {
	[ApplicationGroup.GovernmentAndNationalSecurity]: "ราชการ",
	[ApplicationGroup.LawAndJustice]: "กฎหมาย",
	[ApplicationGroup.Education]: "การศึกษา",
	[ApplicationGroup.Healthcare]: "สาธารณสุข",
	[ApplicationGroup.Farming]: "ทำนา",
	[ApplicationGroup.ForestFisheryAndLivestock]: "ทำสวน",
	[ApplicationGroup.Labours]: "แรงงาน",
	[ApplicationGroup.SmeEntrepreneurs]: "SME",
	[ApplicationGroup.OtherEntrepreneurs]: "เจ้าของกิจการอื่น",
	[ApplicationGroup.IndustryEntrepreneurs]: "อุตสาหกรรม",
	[ApplicationGroup.EnvironmentRealEstateAndEnergy]: "สิ่งแวดล้อม",
	[ApplicationGroup.TourismAndHotel]: "ท่องเที่ยว",
	[ApplicationGroup.ScienceAndTechnology]: "วิทยาศาสตร์",
	[ApplicationGroup.ArtMusicEntertainmentAndSport]: "ศิลปะ",
	[ApplicationGroup.CivilSociety]: "ประชาสังคม",
	[ApplicationGroup.PressAndWriters]: "สื่อ",
	[ApplicationGroup.Freelancers]: "อิสระ",
	[ApplicationGroup.Women]: "สตรี",
	[ApplicationGroup.ElderlyDisabledEthicityAndOtherIdentity]: "ผู้สูงอายุ",
	[ApplicationGroup.Other]: "อื่นๆ",
};

export function getApplicationGroup(given: string): ApplicationGroup {
	for (const group of Object.values(ApplicationGroup)) {
		if (given.includes(group)) {
			return group as ApplicationGroup;
		}
	}
	throw new Error(`Error mapping given application group: ${given}`);
}
