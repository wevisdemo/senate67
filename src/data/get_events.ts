import { parse } from "csv-parse/sync";
import type { Event } from "./event";

export async function getEvents(): Promise<Event[]> {
	if (!import.meta.env.EVENT_CSV_URL) {
		throw new Error("EVENT_CSV_URL env variable has not been set yet!");
	}

	const res = await fetch(import.meta.env.EVENT_CSV_URL);
	const content = await res.text();
	return await parse(content, { columns: true });
}
