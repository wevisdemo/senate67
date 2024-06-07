export enum ApplicationGroup {
	GovernmentAndNationalSecurity = "กลุ่มบริหารราชการแผ่นดินและความมั่นคง",
	LawAndJustice = "กลุ่มกฎหมายและกระบวนการยุติธรรม",
	Education = "กลุ่มการศึกษา",
	Healthcare = "กลุ่มสาธารณสุข",
	Farming = "กลุ่มทำนา ทำไร่",
	ForestFisheryAndLivestock = "กลุ่มทำสวน ป่าไม้ ประมง เลี้ยงสัตว์",
	Labours = "กลุ่มลูกจ้าง ผู้ใช้แรงงาน",
	EnvironmentRealEstateAndEnergy = "กลุ่มสิ่งแวดล้อม อสังหาริมทรัพย์ พลังงาน",
	SmeEntrepreneurs = "กลุ่มผู้ประกอบกิจการ SMEs",
	OtherEntrepreneurs = "กลุ่มผู้ประกอบกิจการอื่น",
	TourismAndHotel = "กลุ่มท่องเที่ยว โรงแรม",
	IndustryEntrepreneurs = "กลุ่มผู้ประกอบอุตสาหกรรม",
	ScienceAndTechnology = "กลุ่มวิทยาศาสตร์ เทคโนโลยี",
	Women = "กลุ่มสตรี",
	ElderlyDisabledEthicityAndOtherIdentity = "กลุ่มผู้สูงอายุ คนพิการ ชาติพันธุ์ กลุ่มอัตลักษณ์อื่น",
	ArtMusicEntertainmentAndSport = "กลุ่มศิลปะ ดนตรี บันเทิง กีฬา",
	CivilSociety = "กลุ่มประชาสังคม",
	PressAndWriters = "กลุ่มสื่อสารมวลชน นักเขียน",
	Freelancers = "กลุ่มอาชีพอิสระ",
	Other = "กลุ่มอื่นๆ",
}

export function getApplicationGroup(given: string): ApplicationGroup {
	for (const group of Object.values(ApplicationGroup)) {
		if (given.includes(group)) {
			return group as ApplicationGroup;
		}
	}
	throw new Error(`Error mapping given application group: ${given}`);
}
