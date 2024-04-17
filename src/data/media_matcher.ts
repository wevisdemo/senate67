import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const AVATAR_PATH = "candidate-media/images";
const DEFAULT_AVATAR = "/example-candidate-image.svg";

const VIDEO_LINKS_PATH = "candidate-media/video-links.json";

const existingAvatar = readdirSync(join(process.cwd(), "public", AVATAR_PATH));
const videoLinks = JSON.parse(
	readFileSync(join(process.cwd(), "public", VIDEO_LINKS_PATH)).toString(),
);

export function getAvatarUrl(firstName: string, lastName: string) {
	const expectedAvatar = existingAvatar.find((filename) =>
		filename.replaceAll(" ", "").includes(`${firstName}-${lastName}`),
	);

	return expectedAvatar
		? join("/", AVATAR_PATH, expectedAvatar)
		: DEFAULT_AVATAR;
}

export function getVideoUrl(
	firstName: string,
	lastName: string,
): string | undefined {
	const key = `${firstName.trim()}-${lastName.trim()}`;
	return videoLinks[key];
}
