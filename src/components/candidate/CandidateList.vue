<script lang="ts" setup>
// @ts-ignore
import enterView from "enter-view";
import { ref, onBeforeMount, onMounted, computed } from "vue";
import CandidateAvatar from "../candidate/CandidateAvatar.vue";
import CandidateDepartmentAndGroupDetails from "../candidate/CandidateDepartmentAndGroupDetails.vue";
import CandidateSocialMediaList from "../candidate/CandidateSocialMediaList.vue";
import CandidateFilterList from "../candidate/CandidateFilterList.vue";
import StandPointList from "../candidate/StandPointList.vue";
import type { CandidateOverview } from "../../data/candidate";
import type { ApplicationGroup } from "../../data/application_group";
import type { LocationMap } from "../../data/senate_option";
import Spinner from "./Spinner.vue";

const CANDIDATES_PER_PAGE = 10;

const props = defineProps<{
	candidates: CandidateOverview[];
	application_group: ApplicationGroup[];
	provinces: string[];
	districts: LocationMap;
	total_candidate: number;
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
		? [
				...shuffleArray(
					groupResults.value.filter(({ avatarUrl }) => avatarUrl),
				),
				...shuffleArray(
					groupResults.value.filter(({ avatarUrl }) => !avatarUrl),
				),
			]
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
			enter: () => {
				maxDisplayCandidateIndex.value += CANDIDATES_PER_PAGE;
			},
		});
	}
});

function shuffleArray<T>(array: T[]) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}
</script>

<template>
	<div class="h-full min-h-screen flex flex-col">
		<section
			class="flex items-center justify-center bg-primary pt-36 pb-10 text-center h-full"
		>
			<div class="text-center max-w-[650px] w-full">
				<div class="px-4">
					<h1 class="heading-responsive-01 text-base-100 pb-3">
						ค้นหาผู้สมัคร สว.
					</h1>

					<p class="max-w-[650px] mx-auto body-01 text-base-100">
						ทั้งหมด {{ total_candidate }} คน ในฐานข้อมูล
					</p>
				</div>

				<div class="pt-14 px-4 z-[99] relative sm:z-0 bg-primary">
					<p class="heading-02 mb-2 text-base-100">
						กรองหาผู้สมัครที่คุณมีสิทธิ์เลือก
					</p>

					<CandidateFilterList
						:province_query="province_query"
						:district_query="district_query"
						:occupation_query="occupation_query"
						:provinces="provinces"
						:districts="districts"
						:occupations="application_group"
						@filter="getCandidatesData"
					/>
				</div>
			</div>
		</section>
		<section class="flex-1 flex bg-info py-10 text-center px-3">
			<div v-if="!sortedCandidates" class="mx-auto w-full max-w-[650px]">
				<Spinner />
			</div>
			<div v-else class="mx-auto w-full max-w-[650px]">
				<p class="heading-02 mb-2 text-neutral">
					ผลลัพธ์ : {{ sortedCandidates.length }} คน
				</p>

				<div
					class="mt-5 bg-base-100 p-2 sm:p-5 rounded-[10px] space-y-3"
					v-for="{
						firstName,
						lastName,
						aliasName,
						avatarUrl,
						contacts,
						application,
						age,
						education,
						occupation,
						politicalStances,
					} in sortedCandidates.slice(0, maxDisplayCandidateIndex)"
					:key="`${firstName}${lastName}`"
				>
					<div class="flex space-x-2">
						<div class="flex-1 text-left">
							<CandidateAvatar
								:name="`${firstName} ${lastName}`"
								:alias="aliasName"
								:avatar="avatarUrl"
							/>
						</div>
						<div class="max-w-[120px] sm:max-w-[150px] w-full">
							<CandidateDepartmentAndGroupDetails :application="application" />
						</div>
					</div>

					<div class="flex flex-col text-left space-y-2">
						<div class="overflow-hidden text-ellipsis">
							<div class="body-03 bg-base-200 px-2 py-0.5 rounded-md">
								ข้อมูลทั่วไป
							</div>
							<table>
								<tr>
									<td class="body-03 mt-[2px]">อายุ</td>
									<td class="body-01 font-bold flex">{{ age }} ปี</td>
								</tr>
								<tr>
									<td
										class="body-03 mt-[2px] whitespace-nowrap flex justify-start"
									>
										การศึกษา
									</td>
									<td class="body-01 font-bold break-words whitespace-pre-wrap">
										{{ education }}
									</td>
								</tr>
								<tr>
									<td class="body-03 mt-[2px] flex justify-start">อาชีพ</td>
									<td class="body-01 font-bold break-words whitespace-pre-wrap">
										{{ occupation }}
									</td>
								</tr>
							</table>
						</div>

						<div
							v-if="
								contacts.email ||
								contacts.facebookUrl ||
								contacts.phoneNumber ||
								contacts.xUrl
							"
							class="space-y-2"
						>
							<div class="body-03 bg-base-200 px-2 rounded-md">
								ช่องทางติดต่อ
							</div>
							<CandidateSocialMediaList :contacts="contacts" />
						</div>

						<div class="space-y-1">
							<div class="body-03 bg-base-200 px-2 rounded-md">จุดยืน</div>

							<StandPointList :standpoints="politicalStances" />
						</div>
					</div>

					<div class="text-right flex space-x-1 justify-end">
						<a
							class="font-bold text-accent underline"
							:href="'/candidates/' + firstName + '-' + lastName"
							>ดูเพิ่มเติม
						</a>
						<img src="/arrow.svg" class="-rotate-90" alt="" />
					</div>
				</div>

				<div ref="loadMoreObserver" class="-translate-y-[50vh]" />

				<a
					href="https://forms.gle/AiPQPxvqFex2a7Hk8"
					class="btn w-full bg-primary text-base-100 mt-14"
				>
					แสดงตัวเป็นผู้สมัคร <img src="/link-icon.svg" class="inline pr-2" />
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
