import { ApplicationGroup } from "./application_group";
import type {
	Candidate,
	PoliticalStance,
	VisionQuestionaire,
} from "./candidate";
import { parse } from "csv-parse/sync";

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
	return {
		title: object["คำนำหน้า"],
		firstName: object["ชื่อ"],
		lastName: object["นามสกุล"],
		aliasName: object["ชื่ออื่นๆ ที่คนรู้จัก"],
		age: Number(object["อายุ"]),
		education: object["ประวัติการศึกษา"],
		occupation: object["ประวัติการประกอบอาชีพ"],
		application: {
			group: object["ประสงค์จะสมัครในกลุ่ม"] as ApplicationGroup,
			province: object["จังหวัดที่คุณประสงค์จะลงสมัคร"],
			district: object["อำเภอ/เขต ที่คุณประสงค์จะลงสมัคร"],
		},
		contacts: {
			facebookUrl: object["Facebook"],
			xUrl: object["X (Twitter)"],
			phoneNumber: object["หมายเลขโทรศัพท์"],
			email: object["Email"],
		},
		politicalStances: mapPoliticalStances(object),
		politicalStanceDescription:
			object[
				"คำอธิบายจุดยืนในฐานะสมาชิกรัฐสภาเพิ่มเติมที่ต้องการจะให้คนอื่นทราบ"
			],
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
