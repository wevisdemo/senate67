import { parse } from "csv-parse/sync";

export interface OfficialCandidate {
	full_name_for_lookup: string;
	province: string;
	district: string;
	job_group: string;
	image_url: string;
	pdf_url: string;
}

export async function getOfficialCandidates(): Promise<OfficialCandidate[]> {
	if (!import.meta.env.OFFICIAL_CANDIDATE_CSV_URL) {
		throw new Error(
			"OFFICIAL_CANDIDATE_CSV_URL env variable has not been set yet!",
		);
	}

	const res = await fetch(import.meta.env.OFFICIAL_CANDIDATE_CSV_URL);
	const content = await res.text();
	return (await parse(content, { columns: true })).map((oc: any) => ({
		...oc,
	}));
}
