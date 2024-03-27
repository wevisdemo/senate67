export const isProd = (): boolean => {
	return import.meta.env.PUBLIC_BUILD_TARGET === "production" ? true : false;
};
