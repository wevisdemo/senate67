import {
	ApplicationGroup,
	applicationGroupShortenNames,
	getApplicationGroup,
} from "./application_group";
import type {
	Candidate,
	PoliticalStance,
	VisionQuestionaire,
} from "./candidate";
import { parse } from "csv-parse/sync";

const POLITICAL_STANCE_STARTS_WITH = "คุณคิดเห็นอย่างไรกับประเด็นเหล่านี้? [";
const DISTRICT_QUESITON = "อำเภอ/เขต ที่คุณประสงค์จะลงสมัคร";
const PROVINCE_QUESTION = "จังหวัดที่คุณประสงค์จะลงสมัคร";
const GROUP_QUESTION = "ประสงค์จะสมัครในกลุ่ม";
const DUPLICATED_DISTRICTS = ["จอมทอง", "เฉลิมพระเกียรติ"];

export async function getCandidates(): Promise<Candidate[]> {
	if (!import.meta.env.ANONYMOUS_CANDIDATE_CSV_URL) {
		throw new Error(
			"ANONYMOUS_CANDIDATE_CSV_URL env variable has not been set yet!",
		);
	}

	const res = await fetch(import.meta.env.ANONYMOUS_CANDIDATE_CSV_URL);
	const content = await res.text();
	const parsed = await parse(content, { columns: true });

	const toBeDisplayedCandidates = parsed.filter(
		(obj: { [key: string]: string }) => obj["ToBeDisplayed"] === "TRUE",
	);

	const candidateSequence: { [key: string]: number } = {};

	return toBeDisplayedCandidates.map((object: { [key: string]: string }) => {
		let districtProvince = object[DISTRICT_QUESITON].trim();

		if (DUPLICATED_DISTRICTS.includes(districtProvince)) {
			districtProvince += `-${object[PROVINCE_QUESTION].trim()}`;
		}
		const shortenGroup =
			applicationGroupShortenNames[
				getApplicationGroup(object[GROUP_QUESTION].trim())
			];
		let sequence = 1;

		const currentSequence =
			candidateSequence[`${districtProvince}-${shortenGroup}`];
		if (currentSequence) {
			sequence = currentSequence + 1;
		}

		candidateSequence[`${districtProvince}-${shortenGroup}`] = sequence;
		return mapCandidate(object, districtProvince, shortenGroup, sequence);
	});
}

function mapCandidate(
	object: { [key: string]: string },
	districtProvince: string,
	shortenGroup: string,
	sequence: number,
): Candidate {
	const firstName = districtProvince;
	const lastName = `${shortenGroup} ${getRunningSymbol(sequence)}`;

	return {
		id: `${firstName} ${lastName}`.replaceAll(" ", "-"),
		firstName,
		lastName,
		age: Number(object["อายุ"].trim()),
		education: object["ประวัติการศึกษา"].trim(),
		occupation: object["ประวัติการประกอบอาชีพ"].trim(),
		application: {
			group: getApplicationGroup(object[GROUP_QUESTION].trim()),
			province: object[PROVINCE_QUESTION].trim(),
			district: object[DISTRICT_QUESITON].trim(),
		},
		politicalStances: mapPoliticalStances(object),
		politicalStanceDescription:
			object[
				"คำอธิบายจุดยืนในฐานะสมาชิกรัฐสภาเพิ่มเติมที่ต้องการจะให้คนอื่นทราบ"
			].trim(),
		visionQuestionaires: mapVisionQuestionaires(object),
	};
}

// Support just 2-latin-character symbols: maximum at ZZ = 676 possibilities
function getRunningSymbol(sequence: number) {
	const charCodes = [];
	if (sequence > 26) {
		charCodes.push(sequence / 26);
	}
	charCodes.push(sequence % 26);

	// ASCII of A starts at 65, hence +64 turns 1 -> 65 = A
	return String.fromCharCode(...charCodes.map((e) => e + 64));
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
