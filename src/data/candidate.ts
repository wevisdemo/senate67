import type { ApplicationGroup } from "./application_group";

export interface Candidate {
	title?: string;
	firstName: string;
	lastName: string;
	aliasName?: string;
	avatarUrl?: string;
	videoUrl?: string;
	age: number;
	education: string;
	occupation: string;
	contacts?: {
		facebookUrl?: string;
		xUrl?: string;
		phoneNumber?: string;
		email?: string;
	};
	application: {
		group: ApplicationGroup;
		province: string;
		district: string;
	};
	politicalStances: PoliticalStance[];
	politicalStanceDescription: string;
	visionQuestionaires: VisionQuestionaire[];
}

export type CandidateOverview = Omit<Candidate, "visionQuestionaires">;

export interface PoliticalStance {
	statement: string;
	answer: "agree" | "disagree" | "to be considered" | "undisclosed" | null;
}

export interface VisionQuestionaire {
	question: string;
	answer: string;
}
