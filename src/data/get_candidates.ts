import { ApplicationGroup, getApplicationGroup } from "./application_group";
import type {
	Candidate,
	PoliticalStance,
	VisionQuestionaire,
} from "./candidate";
import { parse } from "csv-parse/sync";
import { getAvatarUrl, getVideoUrl } from "./media_matcher";
import {
	getOfficialCandidates,
	type OfficialCandidate,
} from "./ect_candidates";
import {
	convertApplicationGroup,
	convertLocation,
	type Location,
} from "./ect_adapter";
import DistrictCandidates from "./ect_district_candidates.json";
import { CACHE } from "./cache";

const POLITICAL_STANCE_STARTS_WITH = "คุณคิดเห็นอย่างไรกับประเด็นเหล่านี้? [";
const DISTRICT_QUESITON = "อำเภอ/เขต ที่คุณลงสมัคร";
const PROVINCE_QUESTION = "จังหวัดที่คุณลงสมัคร";
const GROUP_QUESTION = "ท่านสมัครในกลุ่มใด";

export async function getCandidates(): Promise<Candidate[]> {
	if (CACHE.candidates) {
		return CACHE.candidates;
	}

	if (!import.meta.env.CANDIDATE_CSV_URL) {
		throw new Error("CANDIDATE_CSV_URL env variable has not been set yet!");
	}

	const res = await fetch(import.meta.env.CANDIDATE_CSV_URL);
	const content = await res.text();
	const parsed = await parse(content, { columns: true });

	const toBeDisplayedCandidates = parsed.filter(
		(obj: { [key: string]: string }) => obj["ToBeDisplayed"] === "TRUE",
	);

	const officialCandidates = await getOfficialCandidates();
	let matchedCount = 0;

	const mapped = toBeDisplayedCandidates.map((candidate: any, i: number) => {
		const fullName = getLookUpFullName(candidate);
		const matchedIndex = officialCandidates.findIndex((c) =>
			fullName.includes(c.full_name_for_lookup),
		);
		if (matchedIndex !== -1) {
			matchedCount += 1;
		}
		return mapCandidate(candidate, officialCandidates[matchedIndex]);
	});

	console.log(`Matched with ECT official candidates: ${matchedCount} records`);

	CACHE.candidates = mapped;
	return mapped;
}

function mapCandidate(
	object: { [key: string]: string },
	officialCandidate?: OfficialCandidate,
): Candidate {
	const firstName = object["ชื่อ-นามสกุล"].trim().replace(/  +/g, " ");
	const lastName = object["นามสกุล"].trim();
	const isShowingContact = object["ShowCantacts"] === "TRUE";
	let officialGroup: ApplicationGroup | undefined;
	let officialLocation: Location | undefined;

	if (officialCandidate) {
		officialGroup = convertApplicationGroup(officialCandidate.job_group);
		officialLocation = convertLocation(
			officialCandidate.province,
			officialCandidate.district,
		);
	}

	return {
		id: `${firstName} ${lastName}`.trim().replaceAll(" ", "-"),
		title: object["คำนำหน้า"].trim(),
		firstName,
		lastName,
		aliasName: object["ชื่ออื่นๆ ที่คนรู้จัก"].trim(),
		avatarUrl: getAvatarUrl(firstName, lastName),
		videoUrl: getVideoUrl(firstName, lastName),
		age: Number(object["อายุ"].trim()),
		gender: object["เพศ"].trim(),
		education: object["ประวัติการศึกษา"].trim(),
		occupation: object["ประวัติการประกอบอาชีพ"].trim(),
		application: {
			group: officialGroup
				? officialGroup
				: getApplicationGroup(object[GROUP_QUESTION].trim()),
			province: officialLocation
				? officialLocation.province
				: object[PROVINCE_QUESTION].trim(),
			district: officialLocation
				? officialLocation.district
				: object[DISTRICT_QUESITON].trim(),
		},
		contacts: isShowingContact
			? {
					facebookUrl: object["Facebook"]
						? object["Facebook"].trim()
						: undefined,
					xUrl: object["X (Twitter)"]
						? object["X (Twitter)"].trim()
						: undefined,
					phoneNumber: object["หมายเลขโทรศัพท์"]
						? object["หมายเลขโทรศัพท์"].trim()
						: undefined,
					email: object["Email"] ? object["Email"].trim() : undefined,
				}
			: {},
		politicalStances: mapPoliticalStances(object),
		politicalStanceDescription:
			object[
				"คำอธิบายจุดยืนในฐานะสมาชิกรัฐสภาเพิ่มเติมที่ต้องการจะให้คนอื่นทราบ"
			].trim(),
		visionQuestionaires: mapVisionQuestionaires(object),
		isEliminated: mapIsEliminated(object),
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
			answer:
				object["4. แนวทางการพิจารณาเห็นชอบผู้ดำรงตำแหน่งในองค์กรอิสระ"].trim(),
		},
		{
			question: "เหตุผลความตั้งใจในการลงสมัคร สว. ครั้งนี้",
			answer: object["5. เหตุผลความตั้งใจในการลงสมัคร สว. ครั้งนี้"].trim(),
		},
	];
}

function getLookUpFullName(object: { [key: string]: string }) {
	const firstName: string = object["ชื่อ-นามสกุล"].trim().replace(/  +/g, " ");
	const lastName: string = object["นามสกุล"].trim();
	return `${firstName} ${lastName}`.trim();
}

function mapIsEliminated(object: { [key: string]: string }) {
	const fullName = getLookUpFullName(object);
	const found = DistrictCandidates.find((candidate) => {
		if (candidate["middle_name"] === " ") {
			return fullName.includes(
				`${candidate["first_name"]} ${candidate["last_name"]}`,
			);
		} else {
			return fullName.includes(
				`${candidate["first_name"]} ${candidate["middle_name"]} ${candidate["last_name"]}`,
			);
		}
	});

	return !found;
}
