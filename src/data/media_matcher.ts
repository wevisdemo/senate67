import { readdirSync } from "fs";
import { join } from "path";

const AVATAR_PATH = "candidate-media/images";
const DEFAULT_AVATAR = "/example-candidate-image.svg";

const existingAvatar = readdirSync(join(process.cwd(), "public", AVATAR_PATH));

export function getAvatarUrl(firstName: string, lastName: string) {
	const expectedAvatar = existingAvatar.find((filename) =>
		filename.replaceAll(" ", "").includes(`${firstName}-${lastName}`),
	);

	return expectedAvatar
		? join("/", AVATAR_PATH, expectedAvatar)
		: DEFAULT_AVATAR;
}
