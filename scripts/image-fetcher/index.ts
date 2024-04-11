require("dotenv").config();
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { GDrive } from "./gdrive";
import sharp = require("sharp");
import { getFormResponses, FormResponse } from "./forms";
import { Readable } from "stream";

const GDRIVE_SERVICE_ACCOUNT_KEY_PATH = join(process.cwd(), "credentials.json");
const DESTINATION_PATH = join(process.cwd(), "../../public/candidate-images");

async function main() {
	// Ensure destination directory
	if (!existsSync(DESTINATION_PATH)) {
		mkdirSync(DESTINATION_PATH, { recursive: true });
	}

	const formResponses = await getFormResponses();
	console.log(`Received ${formResponses.length} candidates to download files`);

	const gDrive = new GDrive(GDRIVE_SERVICE_ACCOUNT_KEY_PATH);
	await gDrive.auth();

	const results = await Promise.allSettled(
		formResponses.map((r) => downloadImage(r, gDrive)),
	);

	const fulfilled: PromiseFulfilledResult<sharp.OutputInfo>[] = [];
	const rejectedEmptyUrl: PromiseRejectedResult[] = [];
	const rejectedFetch: PromiseRejectedResult[] = [];
	const rejectedTransform: PromiseRejectedResult[] = [];
	const rejectedUnknown: PromiseRejectedResult[] = [];

	for (const result of results) {
		if (result.status !== "rejected") {
			fulfilled.push(result);
			continue;
		}

		if (result.reason.reason === DownloadImageFailureReason.EmptyImageUrl) {
			rejectedEmptyUrl.push(result);
		} else if (
			result.reason.reason ===
			DownloadImageFailureReason.ErrorFetchingFromGDrive
		) {
			rejectedFetch.push(result);
		} else if (
			result.reason.reason ===
			DownloadImageFailureReason.ErrorImageTransformation
		) {
			rejectedTransform.push(result);
		} else {
			rejectedUnknown.push(result);
		}
	}

	// Print errors except the empty URLs
	rejectedFetch.forEach((r) => console.error(r.reason));
	rejectedTransform.forEach((r) => console.error(r.reason));
	rejectedUnknown.forEach((r) => console.error(r.reason));

	console.log("--------------------");
	console.log(`Downloaded: ${fulfilled.length} images`);
	if (rejectedEmptyUrl.length > 0) {
		console.log(`Empty Image URL: ${rejectedEmptyUrl.length} images`);
	}
	if (rejectedFetch.length > 0) {
		console.log(`Failed to fetch: ${rejectedFetch.length} images`);
	}
	if (rejectedTransform.length > 0) {
		console.log(`Failed to transform: ${rejectedTransform.length} images`);
	}
	if (rejectedUnknown.length > 0) {
		console.log(`Unknown failed: ${rejectedUnknown.length} images`);
	}
}

enum DownloadImageFailureReason {
	EmptyImageUrl,
	ErrorFetchingFromGDrive,
	ErrorImageTransformation,
}

async function downloadImage(formResponse: FormResponse, gDrive: GDrive) {
	const fileName = `${formResponse.firstName}-${formResponse.lastName}.webp`;

	if (!formResponse.imageUrl) {
		return Promise.reject({
			fileName,
			reason: DownloadImageFailureReason.EmptyImageUrl,
		});
	}

	let imageStream: Readable;
	try {
		imageStream = await gDrive.downloadFile(
			gDrive.getFileId(formResponse.imageUrl),
		);
	} catch (e) {
		return Promise.reject({
			fileName,
			reason: DownloadImageFailureReason.ErrorFetchingFromGDrive,
			e,
		});
	}

	try {
		const imageTransformer = sharp()
			.resize({ width: 240, height: 240, position: "top" })
			.webp();

		return await imageStream
			.pipe(imageTransformer)
			.toFile(join(DESTINATION_PATH, fileName));
	} catch (e) {
		return Promise.reject({
			fileName,
			reason: DownloadImageFailureReason.ErrorImageTransformation,
			e,
		});
	}
}

main();
