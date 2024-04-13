require("dotenv").config();
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { GDrive } from "./gdrive";
import { getFormResponses } from "./forms";
import { downloadImages } from "./images";

const DESTINATION_PATH = join(process.cwd(), "../../public/candidate-images");

async function main() {
	if (!process.env.GOOGLE_API_SERVICE_ACCOUNT_CREDENTIALS) {
		throw new Error(
			"GOOGLE_API_SERVICE_ACCOUNT_CREDENTIALS needed to be set, please read more in README",
		);
	}

	// Ensure destination directory
	if (!existsSync(DESTINATION_PATH)) {
		mkdirSync(DESTINATION_PATH, { recursive: true });
	}

	const formResponses = await getFormResponses();
	console.log(`Received ${formResponses.length} candidates to download files`);

	const gDrive = new GDrive(
		JSON.parse(process.env.GOOGLE_API_SERVICE_ACCOUNT_CREDENTIALS),
	);
	await gDrive.auth();

	await downloadImages(formResponses, gDrive, DESTINATION_PATH);
}

main();
