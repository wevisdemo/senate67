import { atom } from "nanostores";
import ChecklistData from "../datas/senate_checklist.json";
import type { IChecklistData } from "../pages/checklist.astro";

export const checklistData = atom<IChecklistData[]>(ChecklistData);
