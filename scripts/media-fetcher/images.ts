import sharp = require("sharp");
import { join } from "path";
import { Readable } from "stream";

import { FormResponse } from "./forms";
import { GDrive } from "./gdrive";

enum DownloadImageFailureReason {
	EmptyImageUrl,
	ErrorFetchingFromGDrive,
	ErrorImageTransformation,
}

export async function downloadImages(
	formResponses: FormResponse[],
	gDrive: GDrive,
	destinationPath: string,
) {
	const results = await Promise.allSettled(
		formResponses.map((r) => downloadImage(r, gDrive, destinationPath)),
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

async function downloadImage(
	formResponse: FormResponse,
	gDrive: GDrive,
	destinationPath,
) {
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
			.withMetadata()
			.webp();

		return await imageStream
			.pipe(imageTransformer)
			.toFile(join(destinationPath, fileName));
	} catch (e) {
		return Promise.reject({
			fileName,
			reason: DownloadImageFailureReason.ErrorImageTransformation,
			e,
		});
	}
}
