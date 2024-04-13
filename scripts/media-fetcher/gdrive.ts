import { Readable } from "stream";
import { Auth, drive_v3, google } from "googleapis";

// GDrive class wraps and enhances operations of Google Drive API
// This will be refactored later for other WeVis's projects
export class GDrive {
	private static SCOPES = ["https://www.googleapis.com/auth/drive"];
	private serviceAccountFileContent: { [key: string]: string };
	private drive?: drive_v3.Drive;

	constructor(serviceAccountFileContent: { [key: string]: string }) {
		this.serviceAccountFileContent = serviceAccountFileContent;
	}

	async auth() {
		const client = new Auth.GoogleAuth({
			credentials: this.serviceAccountFileContent,
			scopes: GDrive.SCOPES,
		});
		this.drive = await google.drive({ version: "v3", auth: client });
	}

	getFileId(fileUrl: string): string {
		return new URL(fileUrl).searchParams.get("id");
	}

	async listAllFileIds(folderId: string) {
		let nextPageToken: string | null | undefined = null;
		const fileIds: string[] = [];

		do {
			const result = await this.listFileIds(folderId, nextPageToken);
			nextPageToken = result.nextPageToken;
			fileIds.push(...result.fileIds);
		} while (nextPageToken);

		return fileIds;
	}

	private async listFileIds(
		folderId: string,
		nextPageToken?: string,
	): Promise<{ fileIds: string[]; nextPageToken: string | undefined | null }> {
		if (!this.drive) {
			throw new Error(
				"Drive has not been set. Make sure GDrive.auth() has been called.",
			);
		}
		const result = await this.drive.files.list({
			fields: "nextPageToken, files(id, name)",
			q: `'${folderId}' in parents`,
			pageToken: nextPageToken,
		});
		const ids = result.data.files?.filter((f) => f.id).map((f) => f.id!) || [];

		return { fileIds: ids, nextPageToken: result.data.nextPageToken };
	}

	async downloadFiles(fileIds: string[]): Promise<Readable[]> {
		return Promise.all(fileIds.map((fileId) => this.downloadFile(fileId)));
	}

	async downloadFile(fileId: string): Promise<Readable> {
		if (!this.drive) {
			throw new Error(
				"Drive has not been set. Make sure GDrive.auth() has been called.",
			);
		}
		const response = await this.drive.files.get(
			{
				fileId,
				alt: "media",
			},
			{ responseType: "stream" },
		);

		return response.data;
	}
}
