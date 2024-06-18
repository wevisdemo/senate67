import type { CandidateOverview } from "./candidate";
import { getCandidates } from "./get_candidates";

const MAX_TEXT_LENGTH = 80;

const highlightStandpoints = [
	"เขียนรัฐธรรมนูญใหม่ “ทั้งฉบับ”",
	"เขียนรัฐธรรมนูญใหม่ แต่ยกเว้นหมวด 1 หมวด 2",
	"ให้มีสภาร่างรัฐธรรมนูญ (สสร.) ใหม่ จากการเลือกตั้ง100%",
	"ยกเลิกสว. ใช้ระบบสภาเดี่ยว",
	"นิรโทษกรรมคดีการเมือง “ทุกคดี”",
];

const trimLongText = (text: string) =>
	text.length > MAX_TEXT_LENGTH
		? `${text.slice(0, MAX_TEXT_LENGTH).trim()}...`
		: text;

export const getCandidateOverview = async (): Promise<CandidateOverview[]> =>
	(await getCandidates())
		.map(({ visionQuestionaires, ...rest }) => ({
			...rest,
			education: trimLongText(rest.education),
			occupation: trimLongText(rest.occupation),
			politicalStances: rest.politicalStances.filter(({ statement }) =>
				highlightStandpoints.includes(statement),
			),
		}))
		.sort((a, z) => a.firstName.localeCompare(z.firstName));
