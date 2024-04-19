import { readdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const AVATAR_PATH = "candidate-media/images";
const DEFAULT_AVATAR = "/example-candidate-image.svg";

const VIDEO_LINKS_JSON = join(
	process.cwd(),
	"public/candidate-media/video-links.json",
);

const existingAvatar = readdirSync(join(process.cwd(), "public", AVATAR_PATH));
const videoLinks = existsSync(VIDEO_LINKS_JSON)
	? JSON.parse(readFileSync(VIDEO_LINKS_JSON).toString())
	: [];

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
