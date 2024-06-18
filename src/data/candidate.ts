import type { ApplicationGroup } from "./application_group";

export interface Candidate {
	id: string;
	number?: number;
	title: string;
	firstName: string;
	isEliminated: boolean;
	lastName: string;
	aliasName?: string;
	avatarUrl?: string;
	videoUrl?: string;
	age: number;
	gender?: string;
	education: string;
	occupation: string;
	contacts: {
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

export interface DropdownOption {
	value: string;
	label: string;
}

export type CandidateOverview =
	| KnownCandidateOverview
	| UnknownCandidateOverview;

type KnownCandidateOverview = Omit<Candidate, "visionQuestionaires">;

export type UnknownCandidateOverview = Omit<
	Candidate,
	| "education"
	| "occupation"
	| "contacts"
	| "politicalStances"
	| "politicalStanceDescription"
	| "visionQuestionaires"
>;

export interface PoliticalStance {
	statement: string;
	answer: "agree" | "disagree" | "to be considered" | "undisclosed" | null;
}

export interface VisionQuestionaire {
	question: string;
	answer: string;
}
