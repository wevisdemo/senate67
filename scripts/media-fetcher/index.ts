require("dotenv").config();
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { GDrive } from "./gdrive";
import { FormResponse, getFormResponses } from "./forms";
import { downloadImages } from "./images";

const DESTINATION_IMAGE_PATH = join(
	process.cwd(),
	"../../public/candidate-media/images",
);

const DESTINATION_VIDEO_LINKS_PATH = join(
	process.cwd(),
	"../../public/candidate-media/video-links.json",
);

async function main() {
	if (!process.env.GOOGLE_API_SERVICE_ACCOUNT_CREDENTIALS) {
		throw new Error(
			"GOOGLE_API_SERVICE_ACCOUNT_CREDENTIALS needed to be set, please read more in README",
		);
	}

	// Ensure destination directory
	if (!existsSync(DESTINATION_IMAGE_PATH)) {
		mkdirSync(DESTINATION_IMAGE_PATH, { recursive: true });
	}

	const formResponses = await getFormResponses();
	console.log(`Received ${formResponses.length} candidates to download files`);

	let videoMode = true;
	let imageMode = true;

	if (process.argv.length > 2) {
		videoMode = process.argv.includes("-v");
		imageMode = process.argv.includes("-i");
	}

	if (imageMode) {
		await runImageMode(formResponses);
	}

	if (videoMode) {
		runVideoMode(formResponses);
	}
}

async function runImageMode(formResponses: FormResponse[]) {
	const gDrive = new GDrive(
		JSON.parse(process.env.GOOGLE_API_SERVICE_ACCOUNT_CREDENTIALS),
	);
	await gDrive.auth();

	await downloadImages(formResponses, gDrive, DESTINATION_IMAGE_PATH);
}

function runVideoMode(formResponses: FormResponse[]) {
	console.log(`Writing video-links.json...`);
	const links = {};
	const withVideoResponses = formResponses.filter((r) => r.videoUrl);
	console.log(
		`Received ${withVideoResponses.length} candidates with video links`,
	);

	withVideoResponses.map((response) => {
		const key =
			`${response.firstName.trim()} ${response.lastName.trim()}`.replaceAll(
				" ",
				"-",
			);
		const fileId = new URL(response.videoUrl).searchParams.get("id");
		links[key] = `https://drive.google.com/file/d/${fileId}/preview`;
	});
	writeFileSync(DESTINATION_VIDEO_LINKS_PATH, JSON.stringify(links));
}

main();
