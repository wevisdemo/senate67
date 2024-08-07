<script lang="ts" setup>
// @ts-ignore
import enterView from "enter-view";
import { ref, onBeforeMount, onMounted, computed } from "vue";
import CandidateFilterList from "../candidate/CandidateFilterList.vue";
import CandidateCard from "../candidate/CandidateCard.vue";
import type { CandidateOverview } from "../../data/candidate";
import type { ApplicationGroup } from "../../data/application_group";
import type { LocationMap } from "../../data/senate_option";
import Spinner from "./Spinner.vue";

const CANDIDATES_PER_PAGE = 25;

const props = defineProps<{
	filterTitle: string;
	candidates: CandidateOverview[];
	applicationGroup: ApplicationGroup[];
	provinces: string[];
	districts?: LocationMap;
	showKnownCandidateCount?: boolean;
}>();

const groupResults = ref<CandidateOverview[] | null>(null);

const province_query = ref("");
const district_query = ref("");
const occupation_query = ref("");
const url = ref<URL>();
const params = ref<URLSearchParams>();
const loadMoreObserver = ref<HTMLElement>();
const maxDisplayCandidateIndex = ref(CANDIDATES_PER_PAGE);

const sortedCandidates = computed<CandidateOverview[] | null>(() =>
	groupResults.value
		? shuffleArray([...groupResults.value]).sort(
				(a, z) => getCandidateSourtingScore(z) - getCandidateSourtingScore(a),
			)
		: null,
);

const getCandidatesData = async (
	province: string,
	district: string,
	application: string,
	isClearFilter: boolean,
) => {
	groupResults.value = [];

	if (province == "ทุกจังหวัด")
		if (application == "ทุกกลุ่มอาชีพ") {
			groupResults.value = props.candidates;
		} else {
			groupResults.value = props.candidates.filter((c) => {
				return c.application.group == application;
			});
		}
	else {
		if (district == "ทุกอำเภอ/เขต") {
			if (application == "ทุกกลุ่มอาชีพ")
				groupResults.value = props.candidates.filter((c) => {
					return c.application.province == province;
				});
			else
				groupResults.value = props.candidates.filter((c) => {
					return (
						c.application.province == province &&
						c.application.group == application
					);
				});
		} else {
			if (application == "ทุกกลุ่มอาชีพ") {
				groupResults.value = props.candidates.filter((c) => {
					return (
						c.application.province == province &&
						c.application.district == district
					);
				});
			} else {
				groupResults.value = props.candidates.filter((c) => {
					return (
						c.application.province == province &&
						c.application.district == district &&
						c.application.group == application
					);
				});
			}
		}
	}

	maxDisplayCandidateIndex.value = CANDIDATES_PER_PAGE;

	if (params.value?.size != 0 && isClearFilter) {
		province_query.value = "";
		district_query.value = "";
		occupation_query.value = "";
	}
};

onBeforeMount(() => {
	url.value = new URL(window.location.href);
	params.value = url.value.searchParams;

	if (params.value.size != 0) {
		province_query.value = params.value.get("province") ?? "";
		district_query.value = params.value.get("district") ?? "";
		occupation_query.value = params.value.get("occupation") ?? "";
	} else groupResults.value = props.candidates;
});

onMounted(() => {
	if (loadMoreObserver.value) {
		enterView({
			selector: [loadMoreObserver.value],
			enter: displayMore,
		});
	}
});

function displayMore() {
	const nextDisplaySize = maxDisplayCandidateIndex.value + CANDIDATES_PER_PAGE;

	maxDisplayCandidateIndex.value = groupResults.value
		? Math.min(nextDisplaySize, groupResults.value.length)
		: nextDisplaySize;
}

function shuffleArray<T>(array: T[]) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}

function getCandidateSourtingScore(candidate: CandidateOverview) {
	return (
		("politicalStances" in candidate ? 4 : 0) +
		(candidate.isEliminated ? 0 : 2) +
		(candidate.avatarUrl ? 1 : 0)
	);
}
</script>

<template>
	<div class="h-full min-h-screen flex flex-col">
		<section
			class="flex items-center justify-center bg-primary pt-36 pb-10 text-center h-full"
		>
			<div class="text-center max-w-[650px] w-full">
				<slot name="header" />

				<div class="pt-14 px-4 z-[99] relative sm:z-10 bg-primary">
					<p class="heading-02 mb-2 text-base-100">
						{{ filterTitle }}
					</p>

					<CandidateFilterList
						:province_query="province_query"
						:district_query="district_query"
						:occupation_query="occupation_query"
						:provinces="provinces"
						:districts="districts"
						:occupations="applicationGroup"
						@filter="getCandidatesData"
						:candidates="candidates"
					/>
				</div>
			</div>
		</section>
		<section class="flex-1 flex bg-info py-10 text-center px-3">
			<div v-if="!sortedCandidates" class="mx-auto w-full max-w-[650px]">
				<Spinner />
			</div>
			<div v-else class="mx-auto w-full max-w-[650px]">
				<p class="heading-02">
					ผลลัพธ์ : {{ sortedCandidates.length.toLocaleString() }} คน
				</p>

				<p v-if="showKnownCandidateCount">
					แสดงจุดยืนแล้ว
					{{ candidates.filter((c) => "politicalStances" in c).length }} คน
				</p>

				<slot name="before-list" />

				<div
					v-for="candidate in sortedCandidates.slice(
						0,
						maxDisplayCandidateIndex,
					)"
					:key="`${candidate.firstName}${candidate.lastName}`"
				>
					<CandidateCard :candidate="candidate" />
				</div>

				<div ref="loadMoreObserver" class="-translate-y-[50vh]" />

				<button
					v-if="maxDisplayCandidateIndex < sortedCandidates.length"
					class="btn btn-ghost mt-6"
					@click="displayMore"
				>
					โหลดเพิ่ม
					<svg width="16" height="17" viewBox="0 0 16 17" fill="none">
						<path
							d="M12.295 8.62831L8.5 12.4183V2.33331H7.5V12.4183L3.705 8.62831L3 9.33331L8 14.3333L13 9.33331L12.295 8.62831Z"
							fill="currentColor"
						></path>
					</svg>
				</button>

				<a
					href="https://forms.gle/AiPQPxvqFex2a7Hk8"
					class="btn w-full bg-primary text-base-100 mt-14"
				>
					แสดงจุดยืนผู้สมัคร <img src="/link-icon.svg" class="inline pr-2" />
				</a>
			</div>
		</section>
	</div>
</template>

<style scoped>
td {
	@apply pl-2 pt-2;
}
</style>
