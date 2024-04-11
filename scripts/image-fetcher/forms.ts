import { parse } from "csv-parse/sync";

export interface FormResponse {
	firstName: string;
	lastName: string;
	imageUrl?: string;
	videoUrl?: string;
}

export async function getFormResponses(): Promise<FormResponse[]> {
	if (!process.env.CANDIDATE_MEDIA_CSV_URL) {
		throw new Error(
			"CANDIDATE_MEDIA_CSV_URL env variable has not been set yet!",
		);
	}

	const res = await fetch(process.env.CANDIDATE_MEDIA_CSV_URL);
	const content = await res.text();
	const parsed = await parse(content, { columns: true });

	return parsed.map(mapper);
}

function mapper(obj): FormResponse {
	return {
		firstName: obj["ชื่อ"],
		lastName: obj["นามสกุล"],
		imageUrl: obj["ภาพถ่ายที่จะใช้ในเว็บไซต์"] || undefined,
		videoUrl: obj["วิดีโอแนะนำตัวที่จะใช้ในเว็บไซต์"] || undefined,
	};
}
