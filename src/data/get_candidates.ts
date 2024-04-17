import { ApplicationGroup } from "./application_group";
import type {
	Candidate,
	PoliticalStance,
	VisionQuestionaire,
} from "./candidate";
import { parse } from "csv-parse/sync";
import { getAvatarUrl, getVideoUrl } from "./media_matcher";

const POLITICAL_STANCE_STARTS_WITH = "คุณคิดเห็นอย่างไรกับประเด็นเหล่านี้? [";

export async function getCandidates(): Promise<Candidate[]> {
	if (!import.meta.env.CANDIDATE_CSV_URL) {
		throw new Error("CANDIDATE_CSV_URL env variable has not been set yet!");
	}

	const res = await fetch(import.meta.env.CANDIDATE_CSV_URL);
	const content = await res.text();
	const parsed = await parse(content, { columns: true });

	const toBeDisplayedCandidates = parsed.filter(
		(obj: { [key: string]: string }) => obj["ToBeDisplayed"] === "TRUE",
	);

	return toBeDisplayedCandidates.map(mapCandidate);
}

function mapCandidate(object: { [key: string]: string }): Candidate {
	const firstName = object["ชื่อ"].trim();
	const lastName = object["นามสกุล"].trim();

	return {
		title: object["คำนำหน้า"].trim(),
		firstName,
		lastName,
		aliasName: object["ชื่ออื่นๆ ที่คนรู้จัก"].trim(),
		avatarUrl: getAvatarUrl(firstName, lastName),
		videoUrl: getVideoUrl(firstName, lastName),
		age: Number(object["อายุ"].trim()),
		education: object["ประวัติการศึกษา"].trim(),
		occupation: object["ประวัติการประกอบอาชีพ"].trim(),
		application: {
			group: object["ประสงค์จะสมัครในกลุ่ม"].trim() as ApplicationGroup,
			province: object["จังหวัดที่คุณประสงค์จะลงสมัคร"].trim(),
			district: object["อำเภอ/เขต ที่คุณประสงค์จะลงสมัคร"].trim(),
		},
		contacts: {
			facebookUrl: object["Facebook"].trim(),
			xUrl: object["X (Twitter)"].trim(),
			phoneNumber: object["หมายเลขโทรศัพท์"].trim(),
			email: object["Email"].trim(),
		},
		politicalStances: mapPoliticalStances(object),
		politicalStanceDescription:
			object[
				"คำอธิบายจุดยืนในฐานะสมาชิกรัฐสภาเพิ่มเติมที่ต้องการจะให้คนอื่นทราบ"
			].trim(),
		visionQuestionaires: mapVisionQuestionaires(object),
	};
}

function mapPoliticalStances(object: {
	[key: string]: string;
}): PoliticalStance[] {
	const stances: PoliticalStance[] = [];
	const questionKeys = Object.keys(object).filter((k) =>
		k.startsWith(POLITICAL_STANCE_STARTS_WITH),
	);

	for (const key of questionKeys) {
		stances.push({
			statement: key.slice(POLITICAL_STANCE_STARTS_WITH.length, -1),
			answer: mapPoliticalStanceAnswer(object[key]),
		});
	}

	return stances;
}

function mapPoliticalStanceAnswer(answer: string) {
	switch (answer) {
		case "เห็นด้วย":
			return "agree";
		case "ไม่เห็นด้วย":
			return "disagree";
		case "พร้อมพิจารณา":
			return "to be considered";
		case "ไม่พร้อมเปิดเผยต่อสาธารณะ":
			return "undisclosed";
		default:
			return null;
	}
}

function mapVisionQuestionaires(object: {
	[key: string]: string;
}): VisionQuestionaire[] {
	return [
		{
			question: "แนวทางการพิจารณาเห็นชอบผู้ดำรงตำแหน่งในองค์กรอิสระ",
			answer: object["4. แนวทางการพิจารณาเห็นชอบผู้ดำรงตำแหน่งในองค์กรอิสระ"],
		},
		{
			question: "เหตุผลความตั้งใจในการลงสมัคร สว. ครั้งนี้",
			answer: object["5. เหตุผลความตั้งใจในการลงสมัคร สว. ครั้งนี้"],
		},
	];
}
